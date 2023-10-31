import { PrismaClient } from '../../../../../prisma/client'
import getStorageLocations from '../../../database/storageLocations/getStorageLocations'
import { GetStorageLocationsResult } from '../../generated/graphql'
import { mapPrismaStorageLocationToGraphqlStorageLocation } from '../../mappers/storageLocationsMapper'

const getStorageLocationsResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetStorageLocationsResult> => {
  const prisma = context.prisma as PrismaClient

  const {
    warehouseId,
    page = 0,
    perPage = 10,
    searchTerm,
    sort,
    filters,
    tagFilters,
  } = args

  const locations = await getStorageLocations(prisma, {
    warehouseId,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
    tagFilters,
  })

  return {
    storageLocations: locations.storageLocations.map(sl =>
      mapPrismaStorageLocationToGraphqlStorageLocation(sl),
    ),
    totalCount: locations.totalCount,
  }
}

export default getStorageLocationsResolver
