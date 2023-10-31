import { UserSettings } from '../../../../prisma/client'
import { PrismaTransactionClient } from '../types/types'

const updateUserSettings = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  userId: string,
  userSettings: UserSettings | null | undefined,
): Promise<UserSettings | null> => {
  if (!userId || !userSettings) {
    throw new Error('Invalid inputs')
  }

  // Destructure the userId and selectedUserRoleId fields out of userSettings object to avoid TypeScript error
  const {
    userId: _,
    selectedUserRoleId,
    ...userSettingsWithoutUserIdAndRoleId
  } = userSettings

  return prisma.userSettings.upsert({
    where: {
      userId: userId,
    },
    update: {
      ...userSettingsWithoutUserIdAndRoleId,
      lastUpdatedBy: updatedByUserId,
      selectedUserRole: {
        connect: {
          id: selectedUserRoleId,
        },
      },
    },
    create: {
      ...userSettingsWithoutUserIdAndRoleId,
      lastUpdatedBy: updatedByUserId,
      user: {
        connect: {
          id: userId,
        },
      },
      selectedUserRole: {
        connect: {
          id: selectedUserRoleId,
        },
      },
    },
  })
}

export default updateUserSettings
