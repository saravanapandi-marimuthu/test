import { PrismaClient } from '../../../../../prisma/client'
import getCompany from '../../../database/companies/getCompany'
import { Company } from '../../generated/graphql'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const getCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<Company> => {
  const prisma = context.prisma as PrismaClient

  const { companyId, companyName } = args

  const company = await getCompany(prisma, companyId, companyName)

  return mapPrismaCompanyToGraphqlCompany(company)
}

export default getCompanyResolver
