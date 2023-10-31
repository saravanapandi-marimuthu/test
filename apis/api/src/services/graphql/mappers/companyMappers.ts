import { CompanyType as PrismaCompanyType } from '../../../../prisma/client'
import { CompanyWithRelations } from '../../database/companies/types/companyTypeExtensions'
import {
  AddressType,
  Company,
  CompanyType,
  PhoneNumberType,
} from '../generated/graphql'

export const mapPrismaCompanyToGraphqlCompany = (
  prismaCompany: CompanyWithRelations,
): Company | null => {
  if (!prismaCompany) return null

  return {
    ...prismaCompany,
    addresses:
      prismaCompany.addresses?.map(address => ({
        ...address,
        addressType: address.addressType as AddressType,
      })) ?? [],
    phoneNumbers:
      prismaCompany.phoneNumbers?.map(phoneNumber => ({
        ...phoneNumber,
        phoneNumberType: phoneNumber.phoneNumberType as PhoneNumberType,
      })) ?? [],
    childCompanies:
      prismaCompany.childCompanies?.map(childCompany =>
        mapPrismaCompanyToGraphqlCompany(childCompany),
      ) ?? [],
    parentCompany:
      prismaCompany.parentCompany &&
      mapPrismaCompanyToGraphqlCompany(prismaCompany.parentCompany),
    roles: prismaCompany.roles ?? [],
    companyServiceAccounts: [],
    companyTags:
      prismaCompany.companyTags?.map(tag => ({
        ...tag,
      })) ?? [],
  }
}

export const mapPrismaCompanyTypeToGraphqlCompanyType = (
  prismaCompanyType: PrismaCompanyType,
): CompanyType | null => {
  if (!prismaCompanyType) return null

  return {
    ...prismaCompanyType,
  }
}
