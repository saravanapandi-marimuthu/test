import {
  Address,
  Company,
  Warehouse,
  WarehouseAddress,
  WarehousePhoneNumber,
} from '../../../../../../prisma/client'

export interface WarehouseAddressWithRelations extends WarehouseAddress {
  address: Address
}

export interface WarehouseWithRelations extends Warehouse {
  addresses?: WarehouseAddressWithRelations[]
  phoneNumber?: WarehousePhoneNumber[]
  company?: Company
}
