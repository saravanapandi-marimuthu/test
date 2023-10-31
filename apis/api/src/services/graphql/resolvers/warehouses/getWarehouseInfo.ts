import { PrismaClient } from '../../../../../prisma/client'
import getWarehouseInfo from '../../../database/retailers/warehouse/getWarehouseInfo'
import { GetWarehouseInfoResult } from '../../generated/graphql'
import { mapPrismaWarehouseToGraphqlWarehouse } from '../../mappers/warehouseMappers'

const getWarehouseInfoResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetWarehouseInfoResult> => {
  const prisma = context.prisma as PrismaClient

  const { id } = args.input

  const warehouseInfo = await getWarehouseInfo(prisma, id)

  return {
    warehouse: mapPrismaWarehouseToGraphqlWarehouse(warehouseInfo),
  }
}

export default getWarehouseInfoResolver
