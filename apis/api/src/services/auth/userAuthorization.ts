import { CompanyRelationshipStatus, PrismaClient } from '../../../prisma/client'
import {
  Action,
  Permission,
  Resource,
  buildPermission,
} from '../../models/Action'
import { RoleName } from '../../models/RoleName'
import findUserRoleWithUserRoleId from '../database/users/findUserRoleWithUserRoleId'
import { UserRoleWithRelations } from '../database/users/types/userTypeExtensions'
import { ACL } from './aclList'

const isAuthorized = (acl: Permission[], permissions: Permission[]) =>
  permissions.every(permission => {
    const action = permission.split('.')[0] as Action
    const resource = permission.split('.')[1] as Resource
    return (
      acl.includes(permission) ||
      acl.includes(buildPermission(Action.All, resource)) ||
      acl.includes(buildPermission(action, Resource.All))
    )
  })

/**
 * Checks if the user is authorized to perform the action on the resource
 * @param prisma Prisma Client
 * @param selectedRoleId Selected Role ID from the user
 * @param relatedCompanyId Related Company ID. This can be the company ID of the user or the parent company ID or the company ID through CompanyRelationship entity
 * @param permissions List of permissions to check
 * @returns
 */
const isUserAuthorized = async (
  prisma: PrismaClient,
  selectedRoleId: string,
  relatedCompanyId: string,
  permissions: Permission[],
) => {
  const userRole = await findUserRoleWithUserRoleId(prisma, selectedRoleId)

  if (!userRole) {
    return false
  }

  const roleName = userRole.role.roleName

  // CASE 1: Super Admin
  if (roleName === RoleName.SuperAdmin) {
    return true
  }

  const company = await prisma.company.findUnique({
    where: {
      id: relatedCompanyId,
    },
  })

  // CASE 2: Company Admin
  if (roleName === RoleName.CompanyAdmin) {
    // Scenario 1: The related company is either the user role's company or the parent company
    if (
      userRole.company.id === relatedCompanyId ||
      userRole.company.id === company.parentCompanyId
    ) {
      return checkRelationAndAuthorize(roleName, permissions, userRole.acl)
    }

    // Scenario 2: The relation is through CompanyRelationship entity
    const relatedCompany = await getRelatedCompany(
      prisma,
      userRole.companyId,
      relatedCompanyId,
    )

    if (
      relatedCompany &&
      relatedCompany.companyRelationship.companyRelationshipStatus ===
        CompanyRelationshipStatus.ACTIVE
    ) {
      return checkRelationAndAuthorize(roleName, permissions, userRole.acl)
    }

    return false
  }

  // CASE 3: All other roles
  // Scenario 1: The related company is the user role's company
  if (userRole.company.id === relatedCompanyId) {
    return checkRelationAndAuthorize(roleName, permissions, userRole.acl)
  }

  // Scenario 2: The relation is through CompanyRelationship entity
  const relatedCompany = await getRelatedCompany(
    prisma,
    userRole.companyId,
    relatedCompanyId,
  )

  if (
    relatedCompany &&
    relatedCompany.companyRelationship.companyRelationshipStatus ===
      CompanyRelationshipStatus.ACTIVE
  ) {
    return checkRelationAndAuthorize(roleName, permissions, userRole.acl)
  }

  return false
}

const getRelatedCompany = async (
  prisma: PrismaClient,
  companyId: string,
  relatedCompanyId: string,
) => {
  return await prisma.relatedCompany.findFirst({
    where: {
      firstCompanyId: companyId,
      secondCompanyId: relatedCompanyId,
    },
    include: {
      companyRelationship: true,
    },
  })
}

const checkRelationAndAuthorize = (
  roleName: string,
  permissions: Permission[],
  aclOverrides: string | undefined | null,
): boolean => {
  const aclList = aclOverrides
    ? (aclOverrides.split(',') as Permission[])
    : ACL[roleName] || []

  return isAuthorized(aclList, permissions)
}

export default isUserAuthorized
