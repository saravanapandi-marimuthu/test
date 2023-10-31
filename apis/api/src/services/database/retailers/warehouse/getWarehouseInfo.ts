import { PrismaClient } from '../../../../../prisma/client'
import { WarehouseWithRelations } from './types/warehouseTypeExtensions'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { createServiceError } from '../../../errors/errorFactory'

const getWarehouseInfo = async (
  prisma: PrismaClient,
  warehouseId: number,
): Promise<WarehouseWithRelations> => {
  if (!warehouseId || warehouseId < 0 || typeof warehouseId !== 'number') {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'Invalid Warehouse ID',
    })
  }

  const warehouse = await prisma.warehouse.findUnique({
    where: {
      id: warehouseId,
    },
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumber: true,
    },
  })

  if (!warehouse) {
    throw createServiceError({
      code: ERROR_CODES.WAREHOUSE_NOT_FOUND,
      data: {
        warehouseId,
      },
    })
  }

  return warehouse
}

export default getWarehouseInfo
