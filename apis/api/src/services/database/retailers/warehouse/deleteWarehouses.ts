import { PrismaClient } from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { PrismaTransactionClient } from '../../types/types'
import { executePrismaActionWithTransaction } from '../../utilities/executePrismaAction'

export interface DeleteWarehousesInput {
  ids: number[]
}

const deleteWarehouses = async (
  prisma: PrismaTransactionClient,
  input: DeleteWarehousesInput,
): Promise<any> => {
  const { ids } = input

  return executePrismaActionWithTransaction(prisma, async tx => {
    const warehouses = await tx.warehouse.findMany({
      where: {
        OR: [...ids.map(id => ({ id }))],
      },
      include: {
        addresses: {
          include: {
            address: true,
          },
        },
      },
    })

    if (!warehouses) {
      throw createServiceError({
        code: ERROR_CODES.WAREHOUSE_NOT_FOUND,
        data: {
          ids,
        },
      })
    }

    const deleteAddress = prisma.address.deleteMany({
      where: {
        OR: [
          ...warehouses.map(warehouse => ({
            id: warehouse.addresses[0].address.id,
          })),
        ],
      },
    })

    const deleteWarehouses = tx.warehouse.deleteMany({
      where: {
        OR: [...ids.map(id => ({ id }))],
      },
    })
  })
}

export default deleteWarehouses
