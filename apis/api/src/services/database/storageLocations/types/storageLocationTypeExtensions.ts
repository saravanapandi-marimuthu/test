import { Warehouse, StorageLocation, Tag } from '../../../../../prisma/client'

export type StorageLocationWithRelations = StorageLocation & {
  storageType?: Tag
  warehouse?: Warehouse
  parent?: StorageLocation
}
