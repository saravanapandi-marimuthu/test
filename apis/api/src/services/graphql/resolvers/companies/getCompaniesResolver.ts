import { PrismaClient } from '../../../../../prisma/client'
import getCompanies from '../../../database/companies/getCompanies'
import { GetCompaniesResult } from '../../generated/graphql'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const getCompaniesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetCompaniesResult> => {
  const prisma = context.prisma as PrismaClient

  const { page = 0, perPage = 10, searchTerm, sort } = args

  const companies = await getCompanies(prisma, page, perPage, searchTerm, sort)

  return {
    companies: companies.companies.map(company =>
      mapPrismaCompanyToGraphqlCompany(company),
    ),
    totalCount: companies.totalCount,
  }
}

export default getCompaniesResolver
