import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import findOrCreateUserWithExternalId from '../../../database/users/findOrCreateUserWithExternalId'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const getUserOrCreateResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  console.log('getUserOrCreateResolver running...')

  const prisma = context.prisma as PrismaClient
  const authenticatedUser = context.user as AuthenticatedUser

  const user = await findOrCreateUserWithExternalId(prisma, {
    externalUserId: authenticatedUser.externalId,
    email: authenticatedUser.email,
    firstName: authenticatedUser.firstName,
    middleName: authenticatedUser.middleName,
    lastName: authenticatedUser.lastName,
  })

  const roleCount = user.userRoles?.length ?? 0

  return mapPrismaUserToGraphqlUser(user, roleCount)
}

export default getUserOrCreateResolver
