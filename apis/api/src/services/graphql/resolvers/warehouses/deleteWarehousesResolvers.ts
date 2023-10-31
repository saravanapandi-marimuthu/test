import { PrismaClient } from '../../../../../prisma/client'
import deleteWarehouses from '../../../database/retailers/warehouse/deleteWarehouses'
import { DeleteWarehousesResult } from '../../generated/graphql'

const deleteWarehousesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<DeleteWarehousesResult> => {
  const prisma = context.prisma as PrismaClient

  const { warehouseIds } = args.input

  await deleteWarehouses(prisma, {
    ids: warehouseIds,
  })

  return {
    success: true,
  }
}

export default deleteWarehousesResolver
