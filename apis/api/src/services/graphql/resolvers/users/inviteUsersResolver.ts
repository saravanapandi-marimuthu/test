import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import { inviteUsers } from '../../../database/users/inviteUsers'
import { SendInvitesResult } from '../../generated/graphql'

const inviteUsersResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<SendInvitesResult | null> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser
  const invitedByUserId = authenticatedUser.userId
  const invitedByEmail = authenticatedUser.email
  const invitedByUsername = authenticatedUser.displayName

  const companyId = args.input.companyId
  const roleId = args.input.roleId

  const emails = args.input.emails

  const result = await inviteUsers(prisma, {
    invitedByUserId,
    invitedByEmail,
    invitedByUsername,
    companyId,
    roleId,
    emails,
  })

  return result
}

export default inviteUsersResolver
