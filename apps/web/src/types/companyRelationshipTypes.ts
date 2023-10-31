import { Company, CompanyRelationshipTypeEnum, EntityTag } from './companyTypes'

// export enum CompanyRelationshipStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
// }

export interface CompanyRelationshipTag {
  id: string
  name: string
  category: string
  tag: {
    color: string
    icon: string
    tagName: string
    tagCategory: {
      icon: string
      color: string
      tagCategoryName: string
    }
  }
  tagCategory: {
    icon: string
    color: string
    tagCategoryName: string
  }
}

// export interface CompanyRelationship {
//   id: string
//   firstCompanyId: string
//   secondCompanyId: string
//   companyRelationshipType: CompanyRelationshipTypeEnum
//   companyRelationshipStatus: CompanyRelationshipStatus
//   createdAt: Date
//   updatedAt: Date
//   companyRelationshipTags: CompanyRelationshipTag[]
//   extendedProperties: any
// }

// export interface RelatedCompany {
//   firstCompanyId: string
//   secondCompanyId: string
//   companyRelationship: CompanyRelationship
//   createdAt: Date
//   updatedAt: Date
//   companyRelationshipTags: CompanyRelationshipTag[]
//   extendedProperties: any
//   secondCompany: Company
// }

// export interface RelatedCompaniesData {
//   getRelatedCompanies: {
//     relatedCompanies: RelatedCompany[]
//     totalCount: number
//   }
// }
