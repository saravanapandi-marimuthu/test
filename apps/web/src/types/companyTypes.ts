import { CompanyServiceTypes } from '../graphql/generated/graphql'
import { CategorizedAddress, CategorizedPhoneNumber } from './sharedTypes'

export type Role = {
  user: {
    displayName: string
    email: string
    firstName: string
    middleName: string
    lastName: string
    addresses: CategorizedAddress[]
    phoneNumbers: CategorizedPhoneNumber[]
    settings: {
      avatarUrl: string
    }
  }
  role: {
    roleName: string
  }
}

export type CompanyType = {
  companyTypeName: string
  displayName: string
}

export type Company = {
  id: string
  companyName: string
  companyType: CompanyType
  roles: Role[]
  addresses: CategorizedAddress[]
  phoneNumbers: CategorizedPhoneNumber[]
  parentCompany?: Company
  childCompanies?: Company[]
}

export interface CompanyData {
  getCompanies: {
    companies: Company[]
    totalCount: number
  }
}

export interface SubsidiaryCompanyData {
  getSubsidiaryCompanies: {
    companies: Company[]
    totalCount: number
  }
}

export interface SubsidiaryCompanyTreeData {
  getSubsidiaryCompaniesTree: {
    companies: Company[]
    totalCount: number
  }
}

export interface EntityTag {
  tag: {
    color: string
    icon: string
    tagName: string
    tagCategory: null
  }
  tagCategory: {
    icon: string
    color: string
    tagCategoryName: string
  }
}

export enum CompanyTypeEnum {
  SYSTEM = 'SYSTEM',
  AG_RETAILER = 'AG_RETAILER',
  ACCOUNT = 'ACCOUNT',
  MANUFACTURER = 'MANUFACTURER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  ENTERPRISE = 'ENTERPRISE',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
}

export enum CompanyRelationshipTypeEnum {
  CUSTOMER_ACCOUNT = 'CUSTOMER_ACCOUNT',
  ENTERPRISE_OWNER = 'ENTERPRISE_OWNER',
  ENTERPRISE_SERVICE_PROVIDER = 'ENTERPRISE_SERVICE_RETAILER',
  RETAILER_VENDOR = 'RETAILER_VENDOR',
}

export enum CompanyRelationshipDirectionEnum {
  FIRST_TO_SECOND_COMPANY = 'FIRST_TO_SECOND_COMPANY',
  SECOND_TO_FIRST_COMPANY = 'SECOND_TO_FIRST_COMPANY',
}

export interface BasicCompanyInfo {
  companyId: string
  companyName: string
  companyType: CompanyServiceTypes
}
