import {
  checkAuthentication,
  checkAuthorization,
} from '../../../../middleware/authorizationMiddleware'
import { Resource, Action, buildPermission } from '../../../../models/Action'
import findUserWithExternalId from '../../../database/users/findUserWithExternalId'
import prisma from '../../PrismaClient'
import { QueryGetUserByExternalIdArgs, User } from '../../generated/graphql'
import { mapPrismaUserToGraphqlUser } from '../../mappers/userMappers'
import updateUserProfileResolver from './updateUserProfileResolver'
import getUserByUserIdResolver from './getUserByUserIdResolver'
import getUserOrCreateResolver from './getUserOrCreateResolver'
import getUsersResolver from './getUsersResolver'
import getUsersWithRolesInCompanyResolver from './getUsersWithRolesInCompanyResolver'
import inviteUsersResolver from './inviteUsersResolver'
import {
  addUserRoleResolver,
  deleteUserRoleResolver,
  updateUserRoleResolver,
} from './userRoleResolver'

export const userQueryResolvers = {
  getUserByExternalId: async (
    _: any,
    args: QueryGetUserByExternalIdArgs,
  ): Promise<User | null> => {
    const { externalId } = args

    const prismaUser = await findUserWithExternalId(prisma, externalId)

    if (!prismaUser) return null

    const roleCount = await prisma.userRole.count({
      where: { userId: prismaUser.userId },
    })

    return mapPrismaUserToGraphqlUser(prismaUser.user, roleCount)
  },

  getUserOrCreate: checkAuthentication()(async (root, args, context, info) => {
    return getUserOrCreateResolver(root, args, context, info)
  }),

  getUsers: checkAuthorization(
    [buildPermission(Action.All, Resource.User)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getUsersResolver(root, args, context, info)
  }),

  getUsersWithRolesInCompany: checkAuthorization(
    [buildPermission(Action.All, Resource.User)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getUsersWithRolesInCompanyResolver(root, args, context, info)
  }),

  getUserByUserId: checkAuthorization(
    [buildPermission(Action.Read, Resource.User)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getUserByUserIdResolver(root, args, context, info)
  }),
}

export const userMutationResolvers = {
  updateUserProfile: checkAuthentication()(
    async (root, args, context, info) => {
      return updateUserProfileResolver(root, args, context, info)
    },
  ),

  inviteUsers: checkAuthorization(
    [
      buildPermission(Action.Create, Resource.Company),
      buildPermission(Action.Create, Resource.User),
    ],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return inviteUsersResolver(root, args, context, info)
  }),

  addUserRole: checkAuthorization(
    [buildPermission(Action.Create, Resource.User)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return addUserRoleResolver(root, args, context, info)
  }),

  updateUserRole: checkAuthorization(
    [buildPermission(Action.Update, Resource.User)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return updateUserRoleResolver(root, args, context, info)
  }),

  deleteUserRole: checkAuthorization(
    [buildPermission(Action.Delete, Resource.User)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return deleteUserRoleResolver(root, args, context, info)
  }),
}
