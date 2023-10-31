import { PrismaClient } from '../../../../../prisma/client'
import getAllCompanyTypes from '../../../database/companies/getAllCompanyTypes'
import { mapPrismaCompanyTypeToGraphqlCompanyType } from '../../mappers/companyMappers'

const getAllCompanyTypesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const companyTypes = await getAllCompanyTypes(prisma)

  return companyTypes.map(mapPrismaCompanyTypeToGraphqlCompanyType)
}

export default getAllCompanyTypesResolver
