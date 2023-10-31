import {
  User,
  UserPhoneNumber,
  UserSettings,
  UserAddress,
} from '../../../../prisma/client'
import dataUrlToBuffer from '../../../utilities/dataUrlToBuffer'
import { uploadFileToAzureBlob } from '../../blobs/blobService'
import {
  UserAddressWithRelations,
  UserWithRelations,
} from './types/userTypeExtensions'
import findUserWithUserId from './findUserWithUserId'
import updateUser from './updateUser'
import updateUserAddress from './updateUserAddress'
import updateUserPhone from './updateUserPhone'
import updateUserSettings from './updateUserSettings'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'

const updateUserProfile = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  {
    userId,
    user,
    userAddress,
    userPhoneNumber,
    userSettings,
    avatarData,
  }: {
    userId: string
    user: User
    userAddress: UserAddressWithRelations | null | undefined
    userPhoneNumber: UserPhoneNumber | null | undefined
    userSettings: UserSettings | null | undefined
    address: UserAddress | null | undefined
    avatarData: string | null | undefined
  },
): Promise<UserWithRelations | null> => {
  await executePrismaActionWithTransaction(prisma, async tx => {
    await updateUser(tx, userId, user)

    let avatarUrl: string | undefined = undefined

    if (avatarData) {
      avatarUrl = await uploadFileToAzureBlob(
        'avatars',
        `${userId}.png`,
        dataUrlToBuffer(avatarData),
      )
    }

    if (userId && userSettings) {
      if (avatarUrl) {
        userSettings.avatarUrl = avatarUrl
      }

      await updateUserSettings(tx, updatedByUserId, userId, userSettings)
    }

    if (userId && userAddress) {
      await updateUserAddress(tx, updatedByUserId, userId, userAddress)
    }

    if (userId && userPhoneNumber) {
      await updateUserPhone(tx, updatedByUserId, userId, userPhoneNumber)
    }
  })

  return await findUserWithUserId(prisma, userId)
}

export default updateUserProfile
