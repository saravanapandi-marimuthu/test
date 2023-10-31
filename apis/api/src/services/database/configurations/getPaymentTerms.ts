import { PaymentTerm, PrismaClient } from '../../../../prisma/client'
import { FieldFilter } from '../types/types'

const getPaymentTerms = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
  filters: FieldFilter[],
): Promise<{
  paymentTerms: PaymentTerm[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search and filter functionality
  const where: any = {}

  // Handle search term
  if (searchTerm) {
    where.OR = [{ termType: { contains: searchTerm, mode: 'insensitive' } }]
  }

  // Handle filters
  filters?.forEach(filter => {
    if (filter.filterValues && filter.filterValues.length > 0) {
      where[filter.filterField] = { in: filter.filterValues }
    }
  })

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  const paymentTerms = await prisma.paymentTerm.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
  })

  const totalCount = await prisma.paymentTerm.count({
    where: where,
  })

  return {
    paymentTerms,
    totalCount: totalCount,
  }
}

export default getPaymentTerms
