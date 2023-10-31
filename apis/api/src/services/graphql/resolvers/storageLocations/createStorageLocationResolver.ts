import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import createStorageLocation from '../../../database/storageLocations/createStorageLocation'
import { CreateStorageLocationResult } from '../../generated/graphql'

const createStorageLocationResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<CreateStorageLocationResult> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const {
    warehouseId,
    parentId,
    storageTypeId,
    name,
    description,
    identifier,
    barcode,
  } = args.input

  const location = await createStorageLocation(prisma, user.userId, {
    name,
    description,
    warehouseId,
    storageTypeId,
    parentId,
    identifier,
    barcode,
  })

  let result: CreateStorageLocationResult = {
    success: !location ? false : true,
    storageLocationId: location?.id,
  }

  return result
}

export default createStorageLocationResolver
