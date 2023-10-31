import { Company, EntityTag } from './companyTypes'

export type Customer = {
  companyRelationshipTags: EntityTag[]
  companyId: string
  customerCompanyId: string
  customerCompany: Company
}

export interface CustomersData {
  getCustomers: {
    customers: Customer[]
    totalCount: number
  }
}

export type Farm = {
  farmId: number
  farmName: string
  geoLocation: GeoLocation
}

export interface GeoLocation {
  latitude: number
  longitude: number
}

export interface FarmsData {
  getFarms: {
    farms: Farm[]
    totalCount: number
  }
}
