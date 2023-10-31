import { create } from 'domain'
import {
  Address,
  AddressType,
  PhoneNumberType,
  Prisma,
} from '../../../../../prisma/client'
import { PrismaClient } from '../../../../../prisma/client'
import { WarehouseWithRelations } from './types/warehouseTypeExtensions'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'

export interface UpdateWarehouseInput {
  warehouseName: number
  notes?: string
  phoneNumber: string
  address: Address
}

const updateWarehouse = async (
  prisma: PrismaClient,
  createdByUserId: string,
  warehouseId: number,
  input: UpdateWarehouseInput,
): Promise<WarehouseWithRelations> => {
  const { warehouseName, notes, phoneNumber, address } = input

  const existingWarehouse = await prisma.warehouse.findUnique({
    where: { id: warehouseId },
  })

  if (!existingWarehouse) {
    throw createServiceError({
      code: ERROR_CODES.WAREHOUSE_NOT_FOUND,
      data: {
        warehouseId,
      },
    })
  }

  let newWarehouseData = {
    warehouseName,
    notes,
    lastUpdatedBy: createdByUserId,
    addresses: {
      create: [
        {
          addressType: AddressType.BUSINESS,
          address: {
            create: {
              ...address,
            },
          },
        },
      ],
    },
    phoneNumber: {
      create: {
        phoneNumberType: PhoneNumberType.OTHER,
        phoneNumber: phoneNumber,
      },
    },
  } as Prisma.WarehouseUpdateInput

  return prisma.warehouse.update({
    where: { id: warehouseId },
    data: newWarehouseData,
    include: {
      company: true,
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumber: true,
    },
  })
}

export default updateWarehouse
