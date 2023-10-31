import { PrismaClient, UserAuditLogType } from '../../../../prisma/client'
import { RoleName } from '../../../models/RoleName'
import findUserWithEmail from './findUserWithEmail'

export interface FindOrCreateUserWithEmailInput {
  email: string
  firstName: string
  middleName: string
  lastName: string
  companyId: string
  roleName: RoleName
}

const findOrCreateUserWithEmail = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  input: FindOrCreateUserWithEmailInput,
) => {
  const {
    email,
    firstName = undefined,
    middleName = undefined,
    lastName = undefined,
    companyId = undefined,
    roleName = RoleName.BasicUser,
  } = input

  const existingUser = await findUserWithEmail(prisma, email)

  const role = await prisma.role.findUnique({
    where: {
      roleName: roleName,
    },
  })

  if (existingUser) {
    if (companyId) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId_companyId: {
            userId: existingUser.id,
            roleId: role.id,
            companyId: companyId,
          },
        },
        create: {
          user: { connect: { id: existingUser.id } },
          role: { connect: { id: role.id } },
          company: { connect: { id: companyId } },
        },
        update: {},
      })

      if (
        firstName &&
        lastName &&
        !existingUser.firstName &&
        !existingUser.lastName
      ) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            firstName,
            middleName,
            lastName,
          },
        })
      }
    }

    const updatedUser = await findUserWithEmail(prisma, email)

    await prisma.userAudit.create({
      data: {
        changedBy: updatedByUserId,
        tableName: 'User',
        action: UserAuditLogType.UPDATE,
        oldValue: existingUser as any,
        newValue: updatedUser as any,
      },
    })

    return updatedUser
  }

  const newUser = await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      userRoles: companyId && {
        create: [
          {
            companyId,
            roleId: role.id,
          },
        ],
      },
    },
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumbers: true,
      settings: true,
      userRoles: {
        include: {
          company: true,
          role: true,
        },
      },
    },
  })

  await prisma.userAudit.create({
    data: {
      changedBy: updatedByUserId,
      tableName: 'User',
      action: UserAuditLogType.CREATE,
      oldValue: undefined,
      newValue: newUser as any,
    },
  })

  return newUser
}

export default findOrCreateUserWithEmail
