import {
  Address,
  AddressType,
  PhoneNumberType,
  PrismaClient,
} from '../../../../prisma/client'

export type PrismaTransactionClient =
  | PrismaClient
  | Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >

export type PrismaAction = (
  client: PrismaTransactionClient,
  ...args: any[]
) => Promise<any>

export class ServiceError extends Error {
  additionalData: any

  constructor(message: string, additionalData: any = {}) {
    super(message)
    this.name = 'DatabaseError'
    this.additionalData = additionalData
  }
}

export interface FieldFilter {
  filterField: string
  filterValues: string[]
}

export interface TagFilter {
  tagCategoryName: string
  tagName: string
}

export type TagLinkInput = {
  tagCategoryName: string
  tagName: string
}

export type AddressInput = {
  addressType: AddressType
  address?: Partial<Address>
}

export type PhoneNumberInput = {
  phoneNumberType: PhoneNumberType
  phoneNumber?: string
}
