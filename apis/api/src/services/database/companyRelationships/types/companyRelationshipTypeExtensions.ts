import {
  Company,
  CompanyAddress,
  CompanyPhoneNumber,
  CompanyRelationship,
  CompanyRelationshipTag,
  CompanyRelationshipType,
  CompanyTag,
  CompanyType,
  Prisma,
  RelatedCompany,
  Tag,
  TagCategory,
  User,
  UserRole,
} from '../../../../../prisma/client'
import { CompanyRelationshipTypeEnum } from '../../../../types'
import { AddressInput, PhoneNumberInput, TagLinkInput } from '../../types/types'

// Types
export type CompanyTagWithRelations = CompanyTag & {
  tag: Tag & {
    tagCategory: TagCategory
  }
}

export type CompanyRelationshipWithRelations = CompanyRelationship & {
  companyRelationshipTags: CompanyRelationshipTag[]
}

// Inputs
export interface CreateRelatedCompanyInput {
  providerCompanyId: string
  companyName: string
  companyTypeName: string
  companyRelationshipType: CompanyRelationshipTypeEnum
  parentCompanyId?: string
  companyAddress: AddressInput
  companyPhoneNumber: PhoneNumberInput
  contactPerson: Partial<User>
  companyExtendedProperties?: Prisma.JsonValue
  companyNotes?: string
  companyTags?: TagLinkInput[]
  companyRelationshipExtendedProperties?: Prisma.JsonValue
  companyRelationshipTags?: TagLinkInput[]
}

export type RelatedCompanyWithRelations = RelatedCompany & {
  companyRelationship: CompanyRelationshipWithRelations
  companyRelationshipType: CompanyRelationshipType
  secondCompany: Company & {
    companyType: CompanyType
    roles: UserRole[]
    addresses: CompanyAddress[]
    phoneNumbers: CompanyPhoneNumber[]
    companyTags: CompanyTagWithRelations[]
  }
}
