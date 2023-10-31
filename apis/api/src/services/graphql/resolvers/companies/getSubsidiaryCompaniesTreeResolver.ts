import { PrismaClient } from '../../../../../prisma/client'
import getSubsidiaryCompanies from '../../../database/companies/getSubsidiaryCompanies'
import getSubsidiaryCompaniesTree from '../../../database/companies/getSubsidiaryCompaniesTree'
import { GetCompaniesResult } from '../../generated/graphql'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const getSubsidiaryCompaniesTreeResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetCompaniesResult> => {
  const prisma = context.prisma as PrismaClient

  const {
    parentCompanyId,
    treeDepth = 0,
    page = 0,
    perPage = 10,
    searchTerm,
    sort,
  } = args.input

  const companies = await getSubsidiaryCompaniesTree(
    prisma,
    parentCompanyId,
    treeDepth,
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

export default getSubsidiaryCompaniesTreeResolver
