// export enum AddressType {
//   HOME = 'HOME',
//   BUSINESS = 'BUSINESS',
//   BILLING = 'BILLING',
//   SHIPPING = 'SHIPPING',
//   PHYSICAL = 'PHYSICAL',
//   MAILING = 'MAILING',
//   SERVICE = 'SERVICE',
//   RECIPIENT = 'RECIPIENT',
//   LEGAL = 'LEGAL',
//   OTHER = 'OTHER',
// }

import { AddressType, PhoneNumberType } from "../graphql/generated/graphql"

// export enum PhoneNumberType {
//   MOBILE = 'MOBILE',
//   WORK = 'WORK',
//   HOME = 'HOME',
//   OTHER = 'OTHER',
// }

export type Address = {
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type PhoneNumber = {
  MainNumber: string
  Extension?: string
}
/**
 * Address with a type
 */
export type CategorizedAddress = {
  addressId?: number
  addressType: AddressType
  address: Address
}

/**
 * Phone number with a type
 */
export type CategorizedPhoneNumber = {
  phoneNumberId?: number
  phoneNumberType: PhoneNumberType
  phoneNumber: PhoneNumber
}
