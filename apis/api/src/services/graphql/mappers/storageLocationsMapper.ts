import { StorageLocationWithRelations } from '../../database/storageLocations/types/storageLocationTypeExtensions'
import { StorageLocation } from '../generated/graphql'

export const mapPrismaStorageLocationToGraphqlStorageLocation = (
  prismaStorageLocation: StorageLocationWithRelations,
): StorageLocation | null => {
  if (!prismaStorageLocation) return null

  return {
    id: prismaStorageLocation.id,
    warehouseId: prismaStorageLocation.warehouseId,
    name: prismaStorageLocation.name,
    description: prismaStorageLocation.description,
    identifier: prismaStorageLocation.identifier,
    barcode: prismaStorageLocation.barcode,
    createdAt: prismaStorageLocation.createdAt,
    updatedAt: prismaStorageLocation.updatedAt,
    storageTypeId: prismaStorageLocation.storageTypeId,
    storageType: prismaStorageLocation.storageType,
    parentId: prismaStorageLocation.parentId,
    // parent: prismaStorageLocation.parent,
  }
}
