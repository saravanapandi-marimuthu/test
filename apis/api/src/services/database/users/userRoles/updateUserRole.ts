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

const executeUpdateUserRole = async (
  tx: PrismaTransactionClient,
  userId: string,
  companyId: string,
  roleId: number,
  aclOverrides: string[],
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

  const updatedUserRole = await tx.userRole.update({
    where: {
      userId_roleId_companyId: {
        userId: userId,
        roleId: roleId,
        companyId: companyId,
      },
    },
    data: {
      acl: aclOverrides.join(','),
      lastUpdatedBy: updatedByUserId,
    },
  })

  await logAuditTrail(
    tx,
    'UserRole',
    UserAuditLogType.CREATE,
    updatedByUserId,
    existingUserRole as any,
    updatedUserRole as any,
  )

  return updatedUserRole
}

const updateUserRole = async (
  prisma: PrismaClient,
  userId: string,
  companyId: string,
  roleId: number,
  aclOverrides: string[] = [],
  updatedByUserId: string,
): Promise<UserRole | undefined> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    return await executeUpdateUserRole(
      tx,
      userId,
      companyId,
      roleId,
      aclOverrides,
      updatedByUserId,
    )
  })
}

export default updateUserRole
