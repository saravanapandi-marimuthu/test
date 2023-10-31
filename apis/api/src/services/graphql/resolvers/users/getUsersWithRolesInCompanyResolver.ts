import { PrismaClient } from '../../../../../prisma/client'
import getUsersWithRolesInCompany from '../../../database/users/getUsersWithRolesInCompany'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const getUsersWithRolesInCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const { companyId, page = 0, perPage = 10, searchTerm, sort, filters } = args

  const prismaUsers = await getUsersWithRolesInCompany(
    prisma,
    companyId,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
  )

  return {
    users: prismaUsers.users.map(user =>
      mapPrismaUserToGraphqlUser(user, user.userRoles?.length),
    ),
    totalCount: prismaUsers.totalCount,
  }
}

export default getUsersWithRolesInCompanyResolver
