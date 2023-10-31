import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import findOrCreateWarehouse from '../../../database/retailers/warehouse/findOrCreateWarehouse'
import { CreateWarehouseResult } from '../../generated/graphql'
import { mapPrismaWarehouseToGraphqlWarehouse } from '../../mappers/warehouseMappers'

const createWarehouseResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<CreateWarehouseResult> => {
  const prisma = context.prisma as PrismaClient
  const authenticatedUser = context.user as AuthenticatedUser

  const { companyId, warehouseName, notes, phoneNumber, address } = args.input

  const warehouse = await findOrCreateWarehouse(
    prisma,
    authenticatedUser.userId,
    {
      companyId,
      warehouseName,
      notes,
      phoneNumber,
      address,
    },
  )

  return {
    warehouse: mapPrismaWarehouseToGraphqlWarehouse(warehouse),
  }
}

export default createWarehouseResolver
