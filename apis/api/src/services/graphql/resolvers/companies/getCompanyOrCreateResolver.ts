import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import findOrCreateCompany from '../../../database/companies/findOrCreateCompany'
import { mapPrismaCompanyToGraphqlCompany } from '../../mappers/companyMappers'

const getCompanyOrCreateResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const companyName = args.name
  const companyTypeName = args.companyTypeName
  const parentCompanyId = args.parentCompanyId

  const company = await findOrCreateCompany(prisma, user.userId, {
    companyName,
    companyTypeName,
    parentCompanyId,
  })

  return mapPrismaCompanyToGraphqlCompany(company)
}

export default getCompanyOrCreateResolver
