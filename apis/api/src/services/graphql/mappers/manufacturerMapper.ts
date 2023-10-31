import { ManufacturerWithProductCount } from '../../database/manufacturers/types/manufactureTypeExtensions'
import { Company, Product as PrismaProduct } from '../../../../prisma/client'
import { Manufacturer, Product } from '../generated/graphql'

export const mapPrismaManufacturerToGraphqlManufacturer = async (
  manufacturer: ManufacturerWithProductCount,
): Promise<Manufacturer> => {
  return manufacturer
}

export const mapPrismaProductToGraphqlProduct = async (
  prismaProduct: PrismaProduct,
): Promise<Product> => {
  return prismaProduct
}
