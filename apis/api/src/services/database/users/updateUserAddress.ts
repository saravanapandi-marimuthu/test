import { UserAddress } from '../../../../prisma/client'
import { PrismaTransactionClient } from '../types/types'
import { UserAddressWithRelations } from './types/userTypeExtensions'

const updateUserAddress = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  userId: string,
  userAddress?: UserAddressWithRelations,
): Promise<UserAddress | null> => {
  if (!userId || !userAddress) {
    throw new Error('Invalid inputs')
  }

  const address = userAddress.address

  if (
    !address.addressLine1 &&
    !address.city &&
    !address.state &&
    !address.postalCode
  ) {
    return Promise.resolve(null)
  }

  if (userAddress.addressId) {
    return prisma.userAddress.update({
      where: {
        userId_addressId_addressType: {
          userId: userId,
          addressId: userAddress.addressId,
          addressType: userAddress.addressType,
        },
      },
      data: {
        addressType: userAddress.addressType,
        lastUpdatedBy: updatedByUserId,
        address: {
          update: address,
        },
      },
    })
  }

  return prisma.userAddress.create({
    data: {
      addressType: userAddress.addressType,
      lastUpdatedBy: updatedByUserId,
      user: {
        connect: {
          id: userId,
        },
      },
      address: {
        create: {
          ...address,
          lastUpdatedBy: updatedByUserId,
        },
      },
    },
  })
}

export default updateUserAddress
