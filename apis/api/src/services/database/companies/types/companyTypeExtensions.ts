import {
  Company,
  CompanyAddress,
  CompanyPhoneNumber,
  CompanyRelationship,
  CompanySaaSFeature,
  CompanyTag,
  CompanyType,
  Prisma,
  Tag,
  TagCategory,
  User,
  UserRole,
} from '../../../../../prisma/client'
import { AddressInput, PhoneNumberInput, TagLinkInput } from '../../types/types'

// Types
export type CustomerCompanyWithRelations = CompanyRelationship & {
  secondCompany: Company & {
    companyType: CompanyType
  }
}

export type CompanyTagWithRelation = CompanyTag & {
  tag: Tag & {
    tagCategory: TagCategory
  }
}

export type CompanyWithRelations = Company & {
  addresses: CompanyAddress[]
  phoneNumbers: CompanyPhoneNumber[]
  companyType: CompanyType
  secondCompanyRelationships?: CustomerCompanyWithRelations[]
  companySaaSFeatures?: CompanySaaSFeature[]
  companyTags: CompanyTagWithRelation[]
  roles: UserRole[]
  childCompanies?: CompanyWithRelations[]
  parentCompany?: CompanyWithRelations
}

// Inputs
export interface CreateCompanyInput {
  companyName: string
  companyTypeName?: string
  companyId?: string
  parentCompanyId?: string
  companyAddress?: AddressInput
  companyPhoneNumber?: PhoneNumberInput
  contactPerson?: Partial<User>
  companyExtendedProperties?: Prisma.JsonValue
  companyNotes?: string
  companyTags?: TagLinkInput[]
}
