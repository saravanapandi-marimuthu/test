import {
  Address,
  Company,
  ExternalUser,
  Role,
  User,
  UserAddress,
  UserPhoneNumber,
  UserRole,
  UserSettings,
} from '../../../../../prisma/client'

export type UserRoleWithRelations = UserRole & {
  role: Role
  company: Company
}

export type UserWithRelations = User & {
  addresses: UserAddress[]
  phoneNumbers: UserPhoneNumber[]
  settings: UserSettings
  userRoles: UserRoleWithRelations[]
}

export type ExternalUserWithRelations = ExternalUser & {
  user: UserWithRelations
}

export type UserAddressWithRelations = UserAddress & {
  address: Address
}
