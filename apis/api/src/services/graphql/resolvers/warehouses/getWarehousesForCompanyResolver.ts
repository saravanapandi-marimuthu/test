import { PrismaClient } from '../../../../../prisma/client'
import getAllWarehousesForCompany from '../../../database/retailers/warehouse/getAllWarehousesForCompany'
import { GetWarehousesForCompanyResult } from '../../generated/graphql'
import { mapPrismaWarehouseToGraphqlWarehouse } from '../../mappers/warehouseMappers'

const getWarehousesForCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetWarehousesForCompanyResult> => {
  const prisma = context.prisma as PrismaClient

  const { page, perPage, searchTerm, sort, filters, companyId } = args.input

  const warehouses = await getAllWarehousesForCompany(
    prisma,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
    companyId,
  )

  return {
    warehouses: warehouses.warehouses.map(item => {
      return mapPrismaWarehouseToGraphqlWarehouse(item)
    }),
    totalCount: warehouses.totalCount,
  }
}

export default getWarehousesForCompanyResolver
