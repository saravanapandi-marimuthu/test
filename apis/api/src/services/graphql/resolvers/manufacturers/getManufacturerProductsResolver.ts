import { PrismaClient } from '../../../../../prisma/client'
import getManufacturerProducts from '../../../database/manufacturers/getManufacturerProducts'
import { mapPrismaProductToGraphqlProduct } from '../../mappers/manufacturerMapper'

const getManufacturerProductsResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const { manufacturerId, page = 0, perPage = 10, searchTerm, sort } = args

  const prismaProducts = await getManufacturerProducts(
    prisma,
    manufacturerId,
    page,
    perPage,
    searchTerm,
    sort,
  )

  return {
    products: prismaProducts.products.map(product =>
      mapPrismaProductToGraphqlProduct(product),
    ),
    totalCount: prismaProducts.totalCount,
  }
}

export default getManufacturerProductsResolver
