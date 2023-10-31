import {
  PrismaClient,
  UserAuditLogType,
  UserRole,
} from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { PrismaTransactionClient } from '../../types/types'
import { executePrismaActionWithTransaction } from '../../utilities/executePrismaAction'
import logAuditTrail from '../../utilities/logAuditTrail'

const executeAddUserRole = async (
  tx: PrismaTransactionClient,
  userId: string,
  companyId: string,
  roleId: number,
  aclOverrides: string[],
  updatedByUserId: string,
) => {
  const existingUserRoleCount = await tx.userRole.count({
    where: {
      userId: userId,
      companyId: companyId,
      roleId: roleId,
    },
  })

  if (existingUserRoleCount > 0) {
    throw createServiceError({
      code: ERROR_CODES.USER_ROLE_ALREADY_EXISTS,
      data: {
        userId,
        roleId,
        companyId,
      },
    })
  }

  const createdUserRole = await tx.userRole.create({
    data: {
      role: {
        connect: {
          id: roleId,
        },
      },
      company: {
        connect: {
          id: companyId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      acl: aclOverrides.join(','),
      lastUpdatedBy: updatedByUserId,
    },
  })

  const userSettings = await tx.userSettings.findUnique({
    where: {
      userId: userId,
    },
  })

  if (!userSettings) {
    await tx.userSettings.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        selectedUserRole: {
          connect: {
            id: createdUserRole.id,
          },
        },
        lastUpdatedBy: updatedByUserId,
        darkMode: false,
      },
    })
  } else if (!userSettings.selectedUserRoleId) {
    await tx.userSettings.update({
      where: {
        userId: userId,
      },
      data: {
        selectedUserRole: {
          connect: {
            id: createdUserRole.id,
          },
        },
        lastUpdatedBy: updatedByUserId,
      },
    })
  }

  await logAuditTrail(
    tx,
    'UserRole',
    UserAuditLogType.CREATE,
    updatedByUserId,
    null,
    createdUserRole as any,
  )

  return createdUserRole
}

const addUserRole = async (
  prisma: PrismaClient,
  userId: string,
  companyId: string,
  roleId: number,
  aclOverrides: string[] = [],
  updatedByUserId: string,
): Promise<UserRole | undefined> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    return await executeAddUserRole(
      tx,
      userId,
      companyId,
      roleId,
      aclOverrides,
      updatedByUserId,
    )
  })
}

export default addUserRole
