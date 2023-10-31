import { PrismaClient } from '../../../../../prisma/client'
import getSubsidiaryCompanies from '../../../database/companies/getSubsidiaryCompanies'
import { GetCompaniesResult } from '../../generated/graphql'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const getSubsidiaryCompaniesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetCompaniesResult> => {
  const prisma = context.prisma as PrismaClient

  const { parentCompanyId, page = 0, perPage = 10, searchTerm, sort } = args

  const companies = await getSubsidiaryCompanies(
    prisma,
    parentCompanyId,
    page,
    perPage,
    searchTerm,
    sort,
  )

  return {
    companies: companies.companies.map(company =>
      mapPrismaCompanyToGraphqlCompany(company),
    ),
    totalCount: companies.totalCount,
  }
}

export default getSubsidiaryCompaniesResolver
