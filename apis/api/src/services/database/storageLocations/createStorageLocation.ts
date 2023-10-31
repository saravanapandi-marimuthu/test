import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'

import { CreateStorageLocationInput } from './types/inputs'
import { StorageLocationWithRelations } from './types/storageLocationTypeExtensions'

const createStorageLocation = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: CreateStorageLocationInput,
): Promise<StorageLocationWithRelations> => {
  return executePrismaActionWithTransaction(prisma, tx => {
    // Destructure input
    const {
      name,
      description,
      parentId,
      storageTypeId,
      warehouseId,
      identifier,
      barcode,
    } = input

    return tx.storageLocation.create({
      data: {
        warehouseId,
        name,
        description,
        identifier,
        barcode,
        storageTypeId,
        parentId: parentId ?? undefined,
      },
    })
  })
}

export default createStorageLocation
