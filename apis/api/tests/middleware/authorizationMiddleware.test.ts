import { GraphQLError } from 'graphql'
import { PrismaClient } from '../../prisma/client'
import { checkAuthorization } from '../../src/middleware/authorizationMiddleware'
import isUserAuthorized from '../../src/services/auth/userAuthorization'

const mockPrisma = {} as PrismaClient
let nextMock: jest.Mock<any, any, any>
let isUserAuthorizedMock: jest.MockedFunction<typeof isUserAuthorized>

jest.mock('../../src/services/auth/userAuthorization')

beforeEach(() => {
  // reset the mocks before each test
  nextMock = jest.fn()

  isUserAuthorizedMock = isUserAuthorized as jest.MockedFunction<
    typeof isUserAuthorized
  >
})

afterEach(() => {
  // clear all mock instances and calls to constructor and all methods
  isUserAuthorizedMock.mockClear()
})

it('throws unauthenticated error when user is not authenticated', async () => {
  const context = {
    user: { authenticated: false },
    prisma: mockPrisma,
  }

  isUserAuthorizedMock.mockResolvedValue(true)

  const checkAuth = checkAuthorization([], () => null)
  await expect(checkAuth(nextMock)(null, {}, context, null)).rejects.toThrow(
    new GraphQLError('Please login to continue'),
  )
})

it('throws forbidden error when user has no role', async () => {
  const context = {
    user: { authenticated: true },
    prisma: mockPrisma,
  }

  isUserAuthorizedMock.mockResolvedValue(true)

  const checkAuth = checkAuthorization([], () => null)
  await expect(checkAuth(nextMock)(null, {}, context, null)).rejects.toThrow(
    new GraphQLError(
      "Looks like you don't have any roles assigned. Contact your company administrator",
    ),
  )
})

it('throws forbidden error when user is not authorized', async () => {
  const context = {
    user: { authenticated: true, selectedRole: 'USER_ROLE_ID' },
    prisma: mockPrisma,
  }

  isUserAuthorizedMock.mockResolvedValue(false)

  const checkAuth = checkAuthorization([], () => 'COMPANY_ID')
  await expect(checkAuth(nextMock)(null, {}, context, null)).rejects.toThrow(
    new GraphQLError('Not authorized'),
  )
})

it('calls next function when user is authenticated and authorized', async () => {
  const context = {
    user: { authenticated: true, selectedRole: 'USER_ROLE_ID' },
    prisma: mockPrisma,
  }

  isUserAuthorizedMock.mockResolvedValue(true)

  const checkAuth = checkAuthorization([], () => 'COMPANY_ID')
  await checkAuth(nextMock)(null, {}, context, null)

  expect(nextMock).toHaveBeenCalled()
})
