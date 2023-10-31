import { GraphQLError } from 'graphql'
import { PrismaClient } from '../../../../../prisma/client'
import getAvailableRoles from '../../../database/companies/getAvailableRoles'
import findUserRoleWithUserRoleId from '../../../database/users/findUserRoleWithUserRoleId'
import { mapPrismaRolesToGraphqlRoles } from '../../mappers/roleMapper'
import { RoleName } from '../../../../models/RoleName'

const getAvailableRolesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user

  const userRole = await findUserRoleWithUserRoleId(
    prisma,
    authenticatedUser.selectedRole,
  )

  if (!userRole) {
    throw new GraphQLError('User does not have access to this resource')
  }

  const roleName = userRole.role.roleName

  const availableRoles = await getAvailableRoles(
    prisma,
    roleName === RoleName.SuperAdmin,
  )

  return mapPrismaRolesToGraphqlRoles(availableRoles)
}

export default getAvailableRolesResolver
