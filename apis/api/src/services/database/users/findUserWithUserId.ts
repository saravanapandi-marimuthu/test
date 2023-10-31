import { PrismaTransactionClient } from '../types/types'
import { UserWithRelations } from './types/userTypeExtensions'

const findUserWithUserId = async (
  prisma: PrismaTransactionClient,
  userId: string,
): Promise<UserWithRelations | null> => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumbers: true,
      settings: true,
      userRoles: {
        include: {
          company: true,
          role: true,
        },
      },
    },
  })
}

export default findUserWithUserId
