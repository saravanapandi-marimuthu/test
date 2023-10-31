import { User } from '../../../../prisma/client'
import { PrismaTransactionClient } from '../types/types'

const updateUser = async (
  prisma: PrismaTransactionClient,
  userId: string,
  user: User | null | undefined,
): Promise<User | null> => {
  if (!userId || !user) {
    throw new Error('Invalid inputs')
  }

  // Find the current user data
  const currentUser = await prisma.user.findUnique({ where: { id: userId } })

  if (!currentUser) {
    throw new Error('User not found')
  }

  // Prepare data for update
  const dataToUpdate: Partial<User> = {}

  if (user.displayName && user.displayName !== currentUser.displayName) {
    dataToUpdate.displayName = user.displayName
  }

  if (user.firstName && user.firstName !== currentUser.firstName) {
    dataToUpdate.firstName = user.firstName
  }

  if (user.middleName && user.middleName !== currentUser.middleName) {
    dataToUpdate.middleName = user.middleName
  }

  if (user.lastName && user.lastName !== currentUser.lastName) {
    dataToUpdate.lastName = user.lastName
  }

  // Update the user with the prepared data
  return prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
  })
}

export default updateUser
