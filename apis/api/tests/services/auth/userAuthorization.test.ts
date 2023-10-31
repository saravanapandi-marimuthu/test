import { PrismaClient } from '../../../prisma/client'
import { UserRoleWithRelations } from '../../../src/services/database/users/types/userTypeExtensions'
import { RoleName } from '../../../src/models/RoleName'
import { Action, Resource, buildPermission } from '../../../src/models/Action'
import isUserAuthorized from '../../../src/services/auth/userAuthorization'
import findUserRoleWithUserRoleId from '../../../src/services/database/users/findUserRoleWithUserRoleId'

jest.mock('../../../src/services/database/users/findUserRoleWithUserRoleId')

let prisma: jest.Mocked<PrismaClient>

let findUserRoleWithUserRoleIdMock: jest.MockedFunction<
  typeof findUserRoleWithUserRoleId
>

const getUserRole = (roleName: RoleName): UserRoleWithRelations => {
  return {
    id: 'user_role_id',
    userId: 'user_id',
    roleId: 1,
    companyId: 'company_id',
    lastUpdatedBy: 'updated_by_user_id',
    createdAt: undefined,
    updatedAt: undefined,
    notes: undefined,
    acl: undefined,
    extendedProperties: undefined,
    role: {
      id: 1,
      description: 'role_description',
      lastUpdatedBy: 'updated_by_user_id',
      createdAt: undefined,
      updatedAt: undefined,
      roleName: roleName,
    },
    company: {
      id: 'company_id',
      normalizedCompanyName: 'company',
      companyName: 'company',
      companyTypeId: 1,
      lastUpdatedBy: 'updated_by_user_id',
      logoUrl: undefined,
      companyShortName: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      parentCompanyId: undefined,
      notes: undefined,
      homepage: undefined,
      extendedProperties: undefined,
    },
  }
}

beforeEach(() => {
  findUserRoleWithUserRoleIdMock =
    findUserRoleWithUserRoleId as jest.MockedFunction<
      typeof findUserRoleWithUserRoleId
    >
  prisma = {
    company: {
      findUnique: jest.fn(),
      // Add additional mocked methods if needed
    },
    relatedCompany: {
      findFirst: jest.fn(),
    },
    // Add additional entities if needed
  } as unknown as jest.Mocked<PrismaClient>
})

it('allows SuperAdmin to perform all actions', async () => {
  // Arrange
  const userRole = getUserRole(RoleName.SuperAdmin)
  findUserRoleWithUserRoleIdMock.mockResolvedValue(userRole)

  // Act
  const authorized = await isUserAuthorized(
    prisma,
    userRole.id,
    'any_company_id',
    [buildPermission(Action.Read, Resource.Configuration)],
  )

  // Assert
  expect(authorized).toBe(true)
})

it('denies CompanyAdmin from a different company to delete user', async () => {
  // Arrange
  ;(
    prisma.company.findUnique as jest.MockedFunction<
      typeof prisma.company.findUnique
    >
  ).mockResolvedValue({
    id: 'other_company_id',
    normalizedCompanyName: 'other Company',
    companyName: 'Other Company',
    companyTypeId: 2,
    parentCompanyId: undefined,
    logoUrl: undefined,
    companyShortName: undefined,
    lastUpdatedBy: 'updated_by_user_id',
    createdAt: undefined,
    updatedAt: undefined,
    notes: undefined,
    homepage: undefined,
    extendedProperties: undefined,
  })
  ;(
    prisma.relatedCompany.findFirst as jest.MockedFunction<
      typeof prisma.relatedCompany.findFirst
    >
  ).mockResolvedValue(undefined)

  const userRole = getUserRole(RoleName.CompanyAdmin)
  findUserRoleWithUserRoleIdMock.mockResolvedValue(userRole)

  // Act
  const authorized = await isUserAuthorized(
    prisma,
    userRole.id,
    'other_company_id',
    [buildPermission(Action.Delete, Resource.User)],
  )

  // Assert
  expect(authorized).toBe(false)
})

it('allows CompanyAdmin from the same company to delete user', async () => {
  // Arrange
  ;(
    prisma.company.findUnique as jest.MockedFunction<
      typeof prisma.company.findUnique
    >
  ).mockResolvedValue({
    id: 'company_id',
    normalizedCompanyName: 'other Company',
    companyName: 'Other Company',
    companyTypeId: 1,
    parentCompanyId: undefined,
    logoUrl: undefined,
    companyShortName: undefined,
    lastUpdatedBy: 'updated_by_user_id',
    createdAt: undefined,
    updatedAt: undefined,
    notes: undefined,
    homepage: undefined,
    extendedProperties: undefined,
  })

  const userRole = getUserRole(RoleName.CompanyAdmin)
  findUserRoleWithUserRoleIdMock.mockResolvedValue(userRole)

  // Act
  const authorized = await isUserAuthorized(prisma, userRole.id, 'company_id', [
    buildPermission(Action.Delete, Resource.User),
  ])

  // Assert
  expect(authorized).toBe(true)
})

it('allows user from the same company to delete user for a user with ACL overrides', async () => {
  // Arrange
  ;(
    prisma.company.findUnique as jest.MockedFunction<
      typeof prisma.company.findUnique
    >
  ).mockResolvedValue({
    id: 'company_id',
    normalizedCompanyName: 'other Company',
    companyName: 'Other Company',
    companyTypeId: 1,
    parentCompanyId: undefined,
    logoUrl: undefined,
    companyShortName: undefined,
    lastUpdatedBy: 'updated_by_user_id',
    createdAt: undefined,
    updatedAt: undefined,
    notes: undefined,
    homepage: undefined,
    extendedProperties: undefined,
  })

  let userRole = getUserRole(RoleName.Applicator)
  userRole.acl = buildPermission(Action.Delete, Resource.User)
  findUserRoleWithUserRoleIdMock.mockResolvedValue(userRole)

  // Act
  const authorized = await isUserAuthorized(prisma, userRole.id, 'company_id', [
    buildPermission(Action.Delete, Resource.User),
  ])

  // Assert
  expect(authorized).toBe(true)
})
