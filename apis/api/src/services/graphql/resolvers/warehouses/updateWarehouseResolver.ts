import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateWarehouse from '../../../database/retailers/warehouse/updateWarehouse'
import {
  UpdateWarehouseError,
  UpdateWarehouseResult,
} from '../../generated/graphql'
import { mapPrismaWarehouseToGraphqlWarehouse } from '../../mappers/warehouseMappers'

const updateWarehouseResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<UpdateWarehouseResult> => {
  const prisma = context.prisma as PrismaClient
  const authenticatedUser = context.user as AuthenticatedUser

  const { id, updatedName, updatedNotes, updatedAddress, updatedPhoneNumber } =
    args.input

  const warehouse = await updateWarehouse(
    prisma,
    authenticatedUser.userId,
    id,
    {
      warehouseName: updatedName,
      notes: updatedNotes,
      phoneNumber: updatedPhoneNumber,
      address: updatedAddress,
    },
  )

  return {
    warehouse: mapPrismaWarehouseToGraphqlWarehouse(warehouse),
  }
}

export default updateWarehouseResolver
