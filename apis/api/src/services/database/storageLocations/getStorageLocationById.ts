import { PrismaClient } from '../../../../prisma/client'
import { StorageLocationWithRelations } from './types/storageLocationTypeExtensions'

export interface GetStorageLocationIdInput {
  id: number
}

const getStorageLocationById = async (
  prisma: PrismaClient,
  input: GetStorageLocationIdInput,
): Promise<StorageLocationWithRelations> => {
  const { id } = input

  const whereClause: any = {}

  if (id) {
    whereClause.id = id
  }

  const location = await prisma.storageLocation.findFirst({
    where: whereClause,
  })

  return location
}

export default getStorageLocationById
