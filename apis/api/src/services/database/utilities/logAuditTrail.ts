import { UserAudit, UserAuditLogType } from '../../../../prisma/client'
import { PrismaTransactionClient } from '../types/types'

const logAuditTrail = async (
  prisma: PrismaTransactionClient,
  tableName: string,
  action: UserAuditLogType,
  changedBy: string,
  oldValue: any,
  newValue: any,
): Promise<UserAudit> => {
  const oldVal = oldValue ? oldValue : {}
  const newVal = newValue ? newValue : {}

  return prisma.userAudit.create({
    data: {
      tableName,
      action,
      changedBy,
      oldValue: oldVal,
      newValue: newVal,
    },
  })
}

export default logAuditTrail
