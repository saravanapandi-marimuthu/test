import { UpdateStorageLocationInput } from './types/inputs'
import { PrismaClient, Prisma } from '../../../../prisma/client'
import { StorageLocationWithRelations } from './types/storageLocationTypeExtensions'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'

const updateStorageLocation = async (
  prisma: PrismaClient,
  createdByUserId: string,
  storageLocationId: number,
  input: UpdateStorageLocationInput,
): Promise<StorageLocationWithRelations> => {
  const {
    name,
    description,
    parentId,
    storageTypeId,
    warehouseId,
    identifier,
    barcode,
  } = input

  const existingStorage = await prisma.storageLocation.findUnique({
    where: { id: storageLocationId },
  })

  if (!existingStorage) {
    throw createServiceError({
      code: ERROR_CODES.STORAGE_LOCATION_NOT_FOUND,
      data: {
        storageLocationId,
      },
    })
  }

  let newStorageLocationData = {
    name,
    description,
    identifier,
    barcode,
    storageTypeId,
    parentId: parentId ?? undefined,
    lastUpdatedBy: createdByUserId,
  } as Prisma.StorageLocationUpdateInput

  return prisma.storageLocation.update({
    where: { id: warehouseId },
    data: newStorageLocationData,
  })
}

export default updateStorageLocation
