import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import addUserRole from '../../../database/users/userRoles/addUserRole'
import deleteUserRole from '../../../database/users/userRoles/deleteUserRole'
import {
  AddOrUpdateUserRoleResult,
  DeleteUserRoleResult,
} from '../../generated/graphql'

export const addUserRoleResolver = async (
  _parent: any,
  args: any,
  context: any,
  _info: any,
): Promise<AddOrUpdateUserRoleResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { userId, roleId, companyId, aclOverrides } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const newUserRole = await addUserRole(
    prisma,
    userId,
    companyId,
    roleId,
    aclOverrides,
    updatedByUserId,
  )

  return {
    userRole: {
      ...newUserRole,
    },
  }
}

export const updateUserRoleResolver = async (
  _parent: any,
  args: any,
  context: any,
  _info: any,
): Promise<AddOrUpdateUserRoleResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { userId, roleId, companyId, aclOverrides } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const updatedUserRole = await addUserRole(
    prisma,
    userId,
    companyId,
    roleId,
    aclOverrides,
    updatedByUserId,
  )

  return {
    userRole: {
      ...updatedUserRole,
    },
  }
}

export const deleteUserRoleResolver = async (
  _parent: any,
  args: any,
  context: any,
  _info: any,
): Promise<DeleteUserRoleResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { userId, roleId, companyId } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const deletedUserRole = await deleteUserRole(
    prisma,
    userId,
    companyId,
    roleId,
    updatedByUserId,
  )

  return {
    userRole: {
      ...deletedUserRole,
    },
  }
}
