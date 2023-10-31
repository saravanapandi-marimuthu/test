import { Tag } from '../graphql/generated/graphql'

export interface StorageLocation {
  id: number
  warehouseId: number
  name: string
  description: string
  storageTypeId: number
  parentId: number
  identifier: string
  barcode: string
  storageType: Tag
}

export enum GetStorageLocationsError {
  INVALID_STORAGE_LOCATION_ID = 'INVALID_STORAGE_LOCATION_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface GetStorageLocationsData {
  getStorageLocations: {
    storageLocations: StorageLocation[]
    totalCount: number
    error: GetStorageLocationsError
  }
}
