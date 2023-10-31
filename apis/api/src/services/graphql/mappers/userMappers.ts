// userMapper.ts

import {
  Company,
  UserRole as PrismaUserRole,
  Role,
} from '../../../../prisma/client'
import { UserWithRelations } from '../../database/users/types/userTypeExtensions'
import { AddressType, PhoneNumberType, User } from '../generated/graphql'

export const mapPrismaUserToGraphqlUser = (
  prismaUser: UserWithRelations,
  roleCount: number,
): User | null => {
  if (!prismaUser) return null

  const graphqlUser: User = {
    id: prismaUser.id,
    //externalId: prismaUser.externalId,
    displayName: prismaUser.displayName,
    email: prismaUser.email,
    firstName: prismaUser.firstName,
    middleName: prismaUser.middleName,
    lastName: prismaUser.lastName,
    addresses: prismaUser.addresses.map(address => ({
      ...address,
      addressType: address.addressType as AddressType,
    })),
    phoneNumbers: prismaUser.phoneNumbers.map(phoneNumber => ({
      ...phoneNumber,
      phoneNumberType: phoneNumber.phoneNumberType as PhoneNumberType,
    })),
    userRoles: prismaUser.userRoles.map(
      (prismaUserRole: PrismaUserRole & { company: Company; role: Role }) => ({
        id: prismaUserRole.id,
        userId: prismaUserRole.userId,
        roleId: prismaUserRole.roleId,
        companyId: prismaUserRole.companyId,
        createdAt: prismaUserRole.createdAt,
        updatedAt: prismaUserRole.updatedAt,
        role: {
          id: prismaUserRole.role.id,
          roleName: prismaUserRole.role.roleName,
          description: prismaUserRole.role.description,
          permissions: [],
          userRoles: [],
          createdAt: prismaUserRole.role.createdAt,
          updatedAt: prismaUserRole.role.updatedAt,
        },
        company: {
          id: prismaUserRole.company.id,
          companyTypeId: prismaUserRole.company.companyTypeId,
          companyName: prismaUserRole.company.companyName,
          addresses: [],
          phoneNumbers: [],
          childCompanies: [],
          roles: [],
          companyServiceAccounts: [],
          createdAt: prismaUserRole.company.createdAt,
          updatedAt: prismaUserRole.company.updatedAt,
        },
      }),
    ),
    settings: prismaUser.settings
      ? {
          createdAt: prismaUser.settings.createdAt,
          updatedAt: prismaUser.settings.updatedAt,
          userId: prismaUser.settings.userId,
          avatarUrl: prismaUser.settings.avatarUrl,
          avatarFallbackImage: prismaUser.settings.avatarFallbackImage,
          additionalSettings: prismaUser.settings.additionalSettings,
          selectedUserRoleId: prismaUser.settings.selectedUserRoleId,
        }
      : null,
    roleCount,
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt,
  }

  return graphqlUser
}
