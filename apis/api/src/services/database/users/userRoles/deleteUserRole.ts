import {
  PrismaClient,
  UserAuditLogType,
  UserRole,
} from '../../../../../prisma/client'
import { PrismaTransactionClient } from '../../types/types'
import { executePrismaActionWithTransaction } from '../../utilities/executePrismaAction'
import logAuditTrail from '../../utilities/logAuditTrail'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { createServiceError } from '../../../errors/errorFactory'

const executor = async (
  tx: PrismaTransactionClient,
  userId: string,
  companyId: string,
  roleId: number,
  updatedByUserId: string,
) => {
  const existingUserRole = await tx.userRole.findFirst({
    where: {
      userId: userId,
      companyId: companyId,
      roleId: roleId,
    },
  })

  if (!existingUserRole) {
    throw createServiceError({
      code: ERROR_CODES.USER_ROLE_DOES_NOT_EXIST,
      data: {
        userId,
        roleId,
        companyId,
      },
    })
  }

  const userSettings = await tx.userSettings.findUnique({
    where: {
      userId: userId,
    },
  })

  if (userSettings?.selectedUserRoleId === existingUserRole.id) {
    await tx.userSettings.update({
      where: {
        userId: userId,
      },
      data: {
        selectedUserRole: {
          disconnect: true,
        },
      },
    })
  }

  const deletedRole = await tx.userRole.delete({
    where: {
      userId_roleId_companyId: {
        userId: userId,
        roleId: roleId,
        companyId: companyId,
      },
    },
  })

  if (deletedRole) {
    await logAuditTrail(
      tx,
      'UserRole',
      UserAuditLogType.CREATE,
      updatedByUserId,
      deletedRole as any,
      {},
    )
  }

  return deletedRole
}

const deleteUserRole = async (
  prisma: PrismaClient,
  userId: string,
  companyId: string,
  roleId: number,
  updatedByUserId: string,
): Promise<UserRole | undefined> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    return await executor(tx, userId, companyId, roleId, updatedByUserId)
  })
}

export default deleteUserRole
