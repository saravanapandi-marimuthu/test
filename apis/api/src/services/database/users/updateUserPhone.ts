import { UserPhoneNumber } from '../../../../prisma/client'
import { PrismaTransactionClient } from '../types/types'

const updateUserPhone = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  userId: string,
  userPhoneNumber: UserPhoneNumber | null | undefined,
): Promise<UserPhoneNumber | null> => {
  if (!userId) {
    throw new Error('Invalid inputs')
  }

  if (userPhoneNumber?.phoneNumber) {
    return await prisma.userPhoneNumber.upsert({
      where: {
        userId_phoneNumberType: {
          userId: userId,
          phoneNumberType: userPhoneNumber.phoneNumberType,
        },
      },
      update: {
        phoneNumber: userPhoneNumber.phoneNumber,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        phoneNumberType: userPhoneNumber.phoneNumberType,
        phoneNumber: userPhoneNumber.phoneNumber,
        lastUpdatedBy: updatedByUserId,
      },
    })
  }

  return Promise.resolve(null)
}

export default updateUserPhone
