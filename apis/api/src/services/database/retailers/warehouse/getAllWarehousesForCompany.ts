import { PrismaClient } from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { FieldFilter } from '../../types/types'
import { WarehouseWithRelations } from './types/warehouseTypeExtensions'

const getAllWarehousesForCompany = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
  filters: FieldFilter[],
  companyId: string,
): Promise<{
  warehouses: WarehouseWithRelations[]
  totalCount: number
} | null> => {
  if (!companyId) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'Company ID is required',
    })
  }

  // Build the 'where' filter for search and filter functionality
  const where: any = { companyId }

  // Handle search term
  if (searchTerm) {
    where.OR = [
      { tagCategoryName: { contains: searchTerm, mode: 'insensitive' } },
    ]
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

  const companyWarehouses = await prisma.warehouse.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumber: true,
      company: true,
    },
  })

  const totalCount = await prisma.warehouse.count({
    where: where,
  })

  return {
    warehouses: companyWarehouses,
    totalCount,
  }
}

export default getAllWarehousesForCompany
