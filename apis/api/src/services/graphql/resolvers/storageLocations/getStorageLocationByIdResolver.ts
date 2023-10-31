import { PrismaClient } from '../../../../../prisma/client'
import getStorageLocationById from '../../../database/storageLocations/getStorageLocationById'
// import { GetStorageLocationResult } from '../../generated/graphql'
import { mapPrismaStorageLocationToGraphqlStorageLocation } from '../../mappers/storageLocationsMapper'

const getStorageLocationByIdResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const { id } = args

  const result = await getStorageLocationById(prisma, {
    id,
  })

  return mapPrismaStorageLocationToGraphqlStorageLocation(result)
}

export default getStorageLocationByIdResolver
