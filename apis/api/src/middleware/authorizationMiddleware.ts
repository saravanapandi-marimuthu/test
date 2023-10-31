import { GraphQLError } from 'graphql'
import { PrismaClient } from '../../prisma/client'
import { Permission } from '../models/Action'
import { AuthenticatedUser } from '../models/AuthenticatedUser'
import isUserAuthorized from '../services/auth/userAuthorization'

function throwException(code: string, message: string) {
  throw new GraphQLError(message, {
    extensions: {
      code: code,
    },
  })
}

const checkUserAuthentication = (user: AuthenticatedUser) => {
  if (!user?.authenticated) {
    console.log('User not authenticated')

    throwException('UNAUTHENTICATED', 'Please login to continue')
  }
}

const checkUserRoleAvailability = (userRoleId: string) => {
  if (!userRoleId) {
    console.log('Missing user role')

    throwException(
      'FORBIDDEN',
      "Looks like you don't have any roles assigned. Contact your company administrator",
    )
  }
}

export const checkAuthorization = (
  permissions: Permission[],
  getCompanyId: (args: any) => string | null,
) => {
  return next => async (parent, args, context, info) => {
    console.log(`Authorization check for ${info?.fieldName ?? 'Unknown'}`)

    const companyId = getCompanyId(args)
    const user = context.user as AuthenticatedUser

    checkUserAuthentication(user)

    checkUserRoleAvailability(user.selectedRole)

    const prisma = context.prisma as PrismaClient

    const userAuthorized = await isUserAuthorized(
      prisma,
      user.selectedRole,
      companyId ?? user.selectedUserRoleCompanyId,
      permissions,
    )

    if (!userAuthorized) {
      throwException('FORBIDDEN', 'Not authorized')
    }

    return next(parent, args, context, info)
  }
}

export const checkAuthentication = () => {
  return next => async (parent, args, context, info) => {
    console.log(`Authentication check for ${info?.fieldName ?? 'Unknown'}`)

    const user = context.user as AuthenticatedUser

    checkUserAuthentication(user)

    return next(parent, args, context, info)
  }
}
