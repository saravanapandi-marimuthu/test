import { PrismaClient } from '../../../../../prisma/client'
import getRetailerProducts from '../../../database/products/getRetailerProducts'
import { GetRetailerProductsResult } from '../../generated/graphql'
import { mapPrismaRetailerProductToGraphqlRetailerProduct } from '../../mappers/productsMapper'

const getRetailerProductsResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetRetailerProductsResult> => {
  const prisma = context.prisma as PrismaClient

  const {
    companyId,
    page = 0,
    perPage = 10,
    searchTerm,
    sort,
    filters,
    tagFilters,
  } = args

  const products = await getRetailerProducts(prisma, {
    companyId,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
    tagFilters,
  })

  return {
    products: products.retailerProducts.map(product =>
      mapPrismaRetailerProductToGraphqlRetailerProduct(product),
    ),
    totalCount: products.totalCount,
  }
}

export default getRetailerProductsResolver
