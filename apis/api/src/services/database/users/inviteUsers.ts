import { randomUUID } from 'crypto'
import { PrismaClient, UserInvite } from '../../../../prisma/client'
import { addMessageToQueue } from '../../queues/queueService'

const generateInviteToken = () => {
  return randomUUID()
}

const upsertUserInvite = async (
  prisma: PrismaClient,
  email: string,
  companyId: string,
  roleId: number,
  inviteToken: string,
  invitedByUserId: string,
): Promise<UserInvite | null> => {
  const userInvite = await prisma.userInvite.upsert({
    where: {
      email_companyId_roleId: {
        email,
        companyId,
        roleId,
      },
    },
    update: {
      inviteToken,
      updatedAt: new Date(),
    },
    create: {
      email,
      companyId,
      roleId,
      inviteToken,
      invitedByUserId,
    },
  })

  return userInvite
}

export const inviteUsers = async (
  prisma: PrismaClient,
  {
    invitedByUserId,
    invitedByEmail,
    invitedByUsername,
    companyId,
    roleId,
    emails,
  }: {
    invitedByUserId: string
    invitedByEmail: string
    invitedByUsername: string | null | undefined
    companyId: string
    roleId: number
    emails: string[]
  },
) => {
  let failedEmails: string[] = []

  await Promise.all(
    emails.map(async email => {
      if (!email) {
        return
      }

      try {
        const inviteToken = generateInviteToken()
        const invite = await upsertUserInvite(
          prisma,
          email,
          companyId,
          roleId,
          inviteToken,
          invitedByUserId,
        )

        if (invite) {
          let message = {
            ...invite,
            invitedByEmail,
            invitedByUsername,
          }

          console.log('Adding to message')

          await addMessageToQueue(
            'invite-users-queue',
            'InviteUserMessage',
            message,
          )
        }
      } catch (error) {
        console.error(error)
        failedEmails.push(email)
      }
    }),
  )

  return {
    success: true,
    failedEmails: failedEmails,
  }
}
