import { PrismaClient } from '../../../../../prisma/client'
import getPaymentTerms from '../../../database/configurations/getPaymentTerms'
import getUsers from '../../../database/users/getUsers'
import { mapPrismaPaymentTermToGraphqlPaymentTerm } from '../../mappers/paymentTermMappers'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'

const getPaymentTermsResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const { page = 0, perPage = 10, searchTerm, sort, filters } = args

  const paymentTerms = await getPaymentTerms(
    prisma,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
  )

  return {
    paymentTerms: paymentTerms.paymentTerms.map(paymentTerm =>
      mapPrismaPaymentTermToGraphqlPaymentTerm(paymentTerm),
    ),
    totalCount: paymentTerms.totalCount,
  }
}

export default getPaymentTermsResolver
