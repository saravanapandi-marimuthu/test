import { GraphQLError } from 'graphql'
import { PrismaClient } from '../../../../../prisma/client'
import { RoleName } from '../../../../models/RoleName'
import findUserRoleWithUserRoleId from '../../../database/users/findUserRoleWithUserRoleId'
import getUsers from '../../../database/users/getUsers'
import getUsersWithRolesInCompany from '../../../database/users/getUsersWithRolesInCompany'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const getUsersResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const { page = 0, perPage = 10, searchTerm, sort, filters } = args

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

  let prismaUsers = undefined

  if (roleName === RoleName.SuperAdmin) {
    prismaUsers = await getUsers(
      prisma,
      page,
      perPage,
      searchTerm,
      sort,
      filters,
    )
  } else {
    prismaUsers = await getUsersWithRolesInCompany(
      prisma,
      userRole.companyId,
      page,
      perPage,
      searchTerm,
      sort,
      filters,
    )
  }

  return {
    users: prismaUsers.users.map(user =>
      mapPrismaUserToGraphqlUser(user, user.userRoles?.length),
    ),
    totalCount: prismaUsers.totalCount,
  }
}

export default getUsersResolver
