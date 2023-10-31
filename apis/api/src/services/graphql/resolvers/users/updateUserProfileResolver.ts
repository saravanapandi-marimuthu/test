import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateUserProfile from '../../../database/users/updateUserProfile'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const updateUserProfileResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient
  const authenticatedUser = context.user as AuthenticatedUser

  const {
    user,
    address,
    userAddress,
    userPhoneNumber,
    userSettings,
    avatarData,
  } = args

  const updatedUser = await updateUserProfile(
    prisma,
    authenticatedUser.userId,
    {
      userId: authenticatedUser.userId,
      user: user,
      userAddress,
      userPhoneNumber,
      userSettings,
      address,
      avatarData: avatarData?.avatarData,
    },
  )

  const roleCount = updatedUser.userRoles?.length ?? 0

  console.log('getUserOrCreateResolver attempting mapPrismaUserToGraphqlUser')

  return mapPrismaUserToGraphqlUser(updatedUser, roleCount)
}

export default updateUserProfileResolver
