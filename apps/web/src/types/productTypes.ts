import { Tag } from '../graphql/generated/graphql'
import { EntityTag } from './companyTypes'

export type Manufacturer = {
  companyName: string
  productsCount: number
  externalId: string
  id: string
  homepage: string
}

export interface ManufacturersData {
  getManufacturers: {
    manufacturers: Manufacturer[]
    totalCount: number
  }
}

export type ManufacturerProduct = {
  id: number
  EPA: string
  commonName: string
  externalId: string
  gaPageParam: string
  hasIcon: string
  iconUrl: string
  isCanada: boolean
  isCoPack: boolean
  isUs: boolean
  labelDAT: string
  manId: string
  manufacturerId: number
  manufacturerName: string
  productName: string
}

export interface ManufacturerProductsData {
  getManufacturerProducts: {
    products: ManufacturerProduct[]
    totalCount: number
  }
}

export type UnitOfMeasurement = {
  unitName: string
}

export type RetailerProductComponent = {
  unitPrice: number
  unitOfMeasurement: UnitOfMeasurement
  product: ManufacturerProduct
  measurementValue: number
}

export type RetailerProductTag = {
  tag: Tag
}
export type RetailerProduct = {
  retailerProductTags: RetailerProductTag[]
  companyId: string
  productName: string
  productSku: string
  retailerProductComponents: RetailerProductComponent[]
}

export interface RetailerProductsData {
  getRetailerProducts: {
    products: RetailerProduct[]
    totalCount: number
  }
}

export interface ManufactureInputState {
  value: string
  inputValue: string
  options: any[]
  totalCount: number
  isSelectOption: boolean
}
