import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import createCompany from '../../../database/companies/createCompany'
import { Company, CreateCustomerResult } from '../../generated/graphql'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const createCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<Company> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const {
    companyName,
    companyTypeName,
    parentCompanyId,
    companyAddress,
    companyPhoneNumber,
    contactPerson,
    extendedProperties,
    companyTags,
    companyNotes,
  } = args.input

  const company = await createCompany(prisma, user.userId, {
    companyName,
    companyTypeName,
    parentCompanyId,
    companyAddress,
    companyPhoneNumber,
    contactPerson,
    companyExtendedProperties: extendedProperties,
    companyTags,
    companyNotes,
  })

  return mapPrismaCompanyToGraphqlCompany(company)
}

export default createCompanyResolver
