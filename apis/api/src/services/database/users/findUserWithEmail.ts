import { PrismaTransactionClient } from '../types/types'
import { UserWithRelations } from './types/userTypeExtensions'

const findUserWithEmail = async (
  prisma: PrismaTransactionClient,
  email: string,
): Promise<UserWithRelations | null> => {
  return await prisma.user.findUnique({
    where: { email },
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

export default findUserWithEmail
