import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { PrismaClient } from '../../prisma/client'
import findOrCreateUserWithExternalId from '../../src/services/database/users/findOrCreateUserWithExternalId'
import authenticateUser from '../../src/middleware/authenticationMiddleware'
import { getSigningKey } from '../../src/middleware/getSigningKey'
import {
  setCacheValue,
  getCacheValue,
} from '../../src/services/cache/cacheClient'

jest.mock('jsonwebtoken')
jest.mock('jwks-rsa')
jest.mock('../../src/services/database/users/findOrCreateUserWithExternalId')
jest.mock('../../src/middleware/getSigningKey')
// Mock the cacheClient functions
jest.mock('../../src/services/cache/cacheClient', () => ({
  setCacheValue: jest.fn(),
  getCacheValue: jest.fn(),
}))

let jwtMock: jest.Mocked<typeof jwt>
let jwksClientMock: jest.MockedFunction<typeof jwksClient>

let findOrCreateUserWithExternalIdMock: jest.MockedFunction<
  typeof findOrCreateUserWithExternalId
>
let getSigningKeyMock: jest.MockedFunction<typeof getSigningKey>

let context: any
let req: any
let prismaMock: DeepMockProxy<PrismaClient>
let getCacheValueMock: jest.MockedFunction<typeof getCacheValue>
let setCacheValueMock: jest.MockedFunction<typeof setCacheValue>

beforeEach(() => {
  // Reset the mocks
  jest.resetAllMocks()

  jwtMock = jwt as jest.Mocked<typeof jwt>
  jwksClientMock = jwksClient as jest.MockedFunction<typeof jwksClient>
  findOrCreateUserWithExternalIdMock =
    findOrCreateUserWithExternalId as jest.MockedFunction<
      typeof findOrCreateUserWithExternalId
    >

  getSigningKeyMock = getSigningKey as jest.MockedFunction<typeof getSigningKey>

  context = {}
  req = { headers: {} }
  prismaMock = mockDeep<PrismaClient>()

  getCacheValueMock = getCacheValue as jest.MockedFunction<typeof getCacheValue>
  setCacheValueMock = setCacheValue as jest.MockedFunction<typeof setCacheValue>
})

test('returns 401 status when no authorization header', async () => {
  // Arrange & Act
  await authenticateUser(context, req, prismaMock)

  // Assert
  expect(context.res).toEqual({ status: 401, body: 'Unauthorized' })
})

test('returns 401 status when the token cannot be decoded', async () => {
  // Arrange
  req.headers['x-horizen-authorization'] = 'Bearer invalid-token'

  jwtMock.decode.mockReturnValue(null)

  // Act
  await authenticateUser(context, req, prismaMock)

  // Assert
  expect(context.res).toEqual({ status: 401, body: 'Unauthorized' })
})

test('returns 401 status when jwt.verify throws an error', async () => {
  // Arrange
  req.headers['x-horizen-authorization'] = 'Bearer valid-token'

  jwtMock.decode.mockReturnValue({ header: { kid: 'kid' } })
  jwtMock.verify.mockImplementation(() => {
    throw new Error('Invalid signature')
  })

  // Act
  await authenticateUser(context, req, prismaMock)

  // Assert
  expect(context.res).toEqual({ status: 401, body: 'Unauthorized' })
})

test('returns 401 status when decodedToken is null', async () => {
  req.headers['x-horizen-authorization'] = 'Bearer valid-token'

  jwtMock.decode.mockReturnValue(null)

  const result = await authenticateUser(context, req, prismaMock)

  expect(context.res).toEqual({ status: 401, body: 'Unauthorized' })
})

test('returns 401 status when decodedToken header is null', async () => {
  req.headers['x-horizen-authorization'] = 'Bearer valid-token'

  jwtMock.decode.mockReturnValue({ header: null })

  const result = await authenticateUser(context, req, prismaMock)

  expect(context.res).toEqual({ status: 401, body: 'Unauthorized' })
})

test('returns AuthenticatedUser object when all goes well', async () => {
  req.headers['x-horizen-authorization'] = 'Bearer valid-token'
  const mockToken = {
    sub: 'sub',
    name: 'name',
    emails: ['test@email.com'],
  }

  getSigningKeyMock.mockResolvedValue('Public Key' as any)

  jwtMock.decode.mockReturnValue({ header: { kid: 'kid' } })
  ;(jwtMock.verify as jest.Mock).mockReturnValue(mockToken)

  const mockUser = {
    id: 'id',
    displayName: 'username',
    email: 'test@test.com',
    firstName: 'firstName',
    middleName: '',
    lastName: 'lastName',
    lastUpdatedBy: 'id',
    createdAt: undefined,
    updatedAt: undefined,
    userRoles: [],
    addresses: [],
    phoneNumbers: [],
    settings: undefined,
    notes: undefined,
  }

  findOrCreateUserWithExternalIdMock.mockResolvedValue(mockUser)

  const result = await authenticateUser(context, req, prismaMock)

  expect(result).toBeDefined()
  expect(result).toHaveProperty('authenticated', true)
  expect(result).toHaveProperty('userId', 'id')
})
