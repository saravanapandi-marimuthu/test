import { PrismaClient } from '../../../../../prisma/client'
import getManufacturers from '../../../database/manufacturers/getManufacturers'
import { mapPrismaManufacturerToGraphqlManufacturer } from '../../mappers/manufacturerMapper'

const getManufacturersResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const { page = 0, perPage = 10, searchTerm, sort } = args

  const prismaManufacturers = await getManufacturers(
    prisma,
    page,
    perPage,
    searchTerm,
    sort,
  )

  return {
    manufacturers: prismaManufacturers.manufacturers.map(mfg =>
      mapPrismaManufacturerToGraphqlManufacturer(mfg),
    ),
    totalCount: prismaManufacturers.totalCount,
  }
}

export default getManufacturersResolver
