import { PrismaClient } from '../../../../prisma/client'
import { CompanyTypes } from '../../../../prisma/seeds/defaultCompanyTypes'
import normalizeString from '../../../utilities/normalizeString'
import { ManufacturerWithProductCount } from './types/manufactureTypeExtensions'

const getManufacturers = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
): Promise<{
  manufacturers: ManufacturerWithProductCount[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search functionality

  const where: any = {
    companyType: {
      companyTypeName: normalizeString(CompanyTypes.MANUFACTURER),
    },
  }

  if (searchTerm) {
    where.OR = [{ companyName: { contains: searchTerm, mode: 'insensitive' } }]
  }

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  const manufacturers = await prisma.company.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      companyType: true,
    },
  })

  const manufacturersWithProductCount = await Promise.all(
    manufacturers.map(async manufacturer => {
      const productsCount = await prisma.product.count({
        where: { manufacturerId: manufacturer.id },
      })
      return { ...manufacturer, productsCount }
    }),
  )

  const totalCount = await prisma.company.count({ where })

  return {
    manufacturers: manufacturersWithProductCount,
    totalCount,
  }
}

export default getManufacturers
