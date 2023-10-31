import { WarehouseWithRelations } from '../../database/retailers/warehouse/types/warehouseTypeExtensions'
import { Warehouse } from '../generated/graphql'

export const mapPrismaWarehouseToGraphqlWarehouse = (
  prismaWarehouse: WarehouseWithRelations,
): Warehouse | null => {
  if (!prismaWarehouse) return null

  return {
    id: prismaWarehouse.id,
    notes: prismaWarehouse.notes,
    warehouseName: prismaWarehouse.warehouseName,
    phoneNumber: prismaWarehouse.phoneNumber[0].phoneNumber,
    address: prismaWarehouse.addresses[0].address,
  }
}
