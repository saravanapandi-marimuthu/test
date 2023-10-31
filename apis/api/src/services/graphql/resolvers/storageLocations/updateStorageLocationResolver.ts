import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateStorageLocation from '../../../database/storageLocations/updateStorageLocation'
import { UpdateStorageLocationResult } from '../../generated/graphql'

const updateStorageLocationResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<UpdateStorageLocationResult> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const {
    id,
    warehouseId,
    parentId,
    storageTypeId,
    name,
    description,
    identifier,
    barcode,
  } = args.input

  const location = await updateStorageLocation(prisma, user.userId, id, {
    name,
    description,
    warehouseId,
    storageTypeId,
    parentId,
    identifier,
    barcode,
  })

  let result: UpdateStorageLocationResult = {
    success: !location ? false : true,
    storageLocationId: location?.id,
  }

  return result
}

export default updateStorageLocationResolver
