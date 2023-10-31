import { CompanyRelationship as PrismaCompanyRelationship } from '../../../../prisma/client'
import { RelatedCompanyWithRelations } from '../../database/companyRelationships/types/companyRelationshipTypeExtensions'
import {
  AddressType,
  CompanyRelationship,
  CompanyRelationshipDirection,
  CompanyRelationshipStatus,
  CompanyRelationshipType,
  PhoneNumberType,
  RelatedCompany,
} from '../generated/graphql'

export const mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship =
  (
    prismaCompanyRelationship: RelatedCompanyWithRelations,
  ): RelatedCompany | null => {
    if (!prismaCompanyRelationship) return null

    return {
      id: prismaCompanyRelationship.id,
      firstCompanyId: prismaCompanyRelationship.firstCompanyId,
      secondCompanyId: prismaCompanyRelationship.secondCompanyId,

      companyRelationship: {
        ...prismaCompanyRelationship.companyRelationship,
        companyRelationshipStatus: prismaCompanyRelationship.companyRelationship
          .companyRelationshipStatus as CompanyRelationshipStatus,
        companyRelationshipTags:
          prismaCompanyRelationship.companyRelationship.companyRelationshipTags?.map(
            relationshipTag => ({
              ...relationshipTag,
            }),
          ),
      },
      companyRelationshipType:
        prismaCompanyRelationship.companyRelationshipType,
      secondCompany: {
        id: prismaCompanyRelationship.secondCompany.id,
        companyName: prismaCompanyRelationship.secondCompany.companyName,
        companyTypeId: prismaCompanyRelationship.secondCompany.companyTypeId,
        companyType: prismaCompanyRelationship.secondCompany.companyType,
        createdAt: prismaCompanyRelationship.secondCompany.createdAt,
        updatedAt: prismaCompanyRelationship.secondCompany.updatedAt,
        addresses: prismaCompanyRelationship.secondCompany.addresses?.map(
          address => ({
            ...address,
            addressType: address.addressType as AddressType,
          }),
        ),
        phoneNumbers: prismaCompanyRelationship.secondCompany.phoneNumbers?.map(
          phoneNumber => ({
            ...phoneNumber,
            phoneNumberType: phoneNumber.phoneNumberType as PhoneNumberType,
          }),
        ),
        roles: prismaCompanyRelationship.secondCompany.roles,
        companyTags: prismaCompanyRelationship.secondCompany.companyTags?.map(
          companyTag => ({
            ...companyTag,
          }),
        ),
        childCompanies: [],
        companyServiceAccounts: [],
      },
    }
  }

export const mapPrismaCompanyRelationshipToGraphqlCompanyRelationship = (
  prismaCompanyRelationship: PrismaCompanyRelationship & {
    companyRelationshipType: CompanyRelationshipType
  },
): CompanyRelationship | null => {
  if (!prismaCompanyRelationship) return null

  return {
    ...prismaCompanyRelationship,
    companyRelationshipStatus:
      prismaCompanyRelationship.companyRelationshipStatus as CompanyRelationshipStatus,
  }
}
