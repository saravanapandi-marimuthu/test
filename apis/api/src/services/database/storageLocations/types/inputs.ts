export interface StorageLocationTagInput {
  tagCategoryName: string
  tagName: string
}

export interface CreateStorageLocationInput {
  id?: number
  warehouseId?: number
  parentId?: number
  name: string
  description?: string
  storageTypeId: number
  identifier?: string
  barcode?: string
}

export interface UpdateStorageLocationInput {
  id?: number
  warehouseId?: number
  parentId?: number
  name: string
  description?: string
  storageTypeId: number
  identifier?: string
  barcode?: string
}
