import { PrismaClient } from '../../../../prisma/client'
import { PrismaAction, PrismaTransactionClient } from '../types/types'

function isPrismaClient(
  client: PrismaTransactionClient,
): client is PrismaClient {
  return '$transaction' in client
}
export const executePrismaActionWithTransaction = async (
  prisma: PrismaTransactionClient,
  action: PrismaAction,
  ...args: any[]
) => {
  if (isPrismaClient(prisma)) {
    console.log('Creating a new transaction')
    return prisma.$transaction(tx => action(tx, ...args), {
      maxWait: 30000, // default: 2000
      timeout: 30000, // default: 5000
      //isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
    })
  } else {
    console.log('Executing without creating a new transaction')
    return action(prisma, ...args)
  }
}

/*

export const executePrismaActionWithTransaction = async <T extends any[]>(
  prisma: PrismaClient | PrismaTransactionClient,
  action: (tx: PrismaTransactionClient, ...args: T) => Promise<any>,
  args: T,
): Promise<any> => {
  if (isPrismaClient(prisma)) {
    return prisma.$transaction(() => action(prisma, ...args), {
      maxWait: 30000, // default: 2000
      timeout: 30000, // default: 5000
      //isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
    })
  } else {
    return action(prisma, ...args)
  }
}
*/
