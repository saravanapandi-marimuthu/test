import { GraphQLError } from 'graphql'
import { PrismaClient } from '../../../../../prisma/client'
import { RoleName } from '../../../../models/RoleName'
import findUserRoleWithUserRoleId from '../../../database/users/findUserRoleWithUserRoleId'
import findUserWithRolesInCompany from '../../../database/users/findUserWithRolesInCompany'
import findUserWithUserId from '../../../database/users/findUserWithUserId'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const getUserByUserIdResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const { userId } = args

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

  let user = undefined

  if (roleName === RoleName.SuperAdmin) {
    user = await findUserWithUserId(prisma, userId)
  } else {
    user = await findUserWithRolesInCompany(prisma, userId, userRole.companyId)
  }

  const roleCount = user.userRoles?.length ?? 0

  return mapPrismaUserToGraphqlUser(user, roleCount)
}

export default getUserByUserIdResolver
