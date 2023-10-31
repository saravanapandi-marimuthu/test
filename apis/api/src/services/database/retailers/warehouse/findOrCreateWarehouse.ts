import {
  AddressType,
  PhoneNumberType,
  Prisma,
} from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { AddressInput, PrismaTransactionClient } from '../../types/types'
import { executePrismaActionWithTransaction } from '../../utilities/executePrismaAction'
import { WarehouseWithRelations } from './types/warehouseTypeExtensions'

export interface FindOrCreateWarehouseInput {
  companyId: string
  warehouseName: string
  notes?: string
  phoneNumber: string
  address: AddressInput
}

const findOrCreateWarehouse = async (
  prisma: PrismaTransactionClient,
  createdByUserId: string,
  input: FindOrCreateWarehouseInput,
): Promise<WarehouseWithRelations> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    const { warehouseName, companyId, notes, phoneNumber, address } = input
    const wareHouseAddress = address.address
    const company = await tx.company.findUnique({
      where: {
        id: companyId,
      },
    })

    if (!company) {
      throw createServiceError({
        code: ERROR_CODES.COMPANY_NOT_FOUND,
        data: {
          companyId,
        },
      })
    }

    let newWarehouseData = {
      warehouseName,
      notes,
      lastUpdatedBy: createdByUserId,
      company: {
        connect: {
          id: company.id,
        },
      },
      addresses: {
        create: address && [
          {
            addressType: address.addressType ?? AddressType.PHYSICAL,
            address: {
              create: {
                addressLine1: wareHouseAddress.addressLine1,
                addressLine2: wareHouseAddress.addressLine2,
                city: wareHouseAddress.city,
                state: wareHouseAddress.state,
                postalCode: wareHouseAddress.postalCode,
                country: wareHouseAddress.country,
                lastUpdatedBy: createdByUserId,
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
    } as Prisma.WarehouseCreateInput

    return tx.warehouse.create({
      data: newWarehouseData,
      include: {
        addresses: {
          include: {
            address: true,
          },
        },
        phoneNumber: true,
        company: true,
      },
    })
  })
}

export default findOrCreateWarehouse
