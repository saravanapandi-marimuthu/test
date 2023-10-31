export interface WarehouseAddress {
  addressLine1: string
  addressLine2: string
  city: string
  country: string
  postalCode: string
  state: string
}

export interface Warehouse {
  id: number
  companyId: string
  warehouseName: string
  notes: string
  address: Partial<WarehouseAddress>
  phoneNumber: string
}

export enum GetWarehousesForCompanyError {
  INVALID_COMPANY_ID = 'INVALID_COMPANY_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface GetWarehousesForCompanyData {
  getWarehousesForCompany: {
    warehouses: Partial<Warehouse>[] | null
    totalCount: number | null
    error: GetWarehousesForCompanyError
  }
}

export enum CreateWarehouseError {
  INVALID_COMPANY_ID = 'INVALID_COMPANY_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface CreateWarehouseData {
  createWarehouse: {
    warehouse: Partial<Warehouse>
    error: CreateWarehouseError | null
  }
}

export enum DeleteWarehouseError {
  INVALID_COMPANY_ID = 'INVALID_COMPANY_ID',
  INVALID_WAREHOUSE_ID = 'INVALID_WAREHOUSE_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface DeleteWarehouseData {
  deleteWarehouses: {
    error: DeleteWarehouseError | null
    success: boolean | null
  }
}

export enum GetWarehouseInfoError {
  INVALID_WAREHOUSE_ID = 'INVALID_WAREHOUSE_ID',
  WAREHOUSE_NOT_FOUND = 'WAREHOUSE_NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface GetWarehouseInfoData {
  getWarehouseInfo: {
    warehouse: Partial<Warehouse> | null
    error: GetWarehouseInfoError | null
  }
}
