import { RoleName } from '../../../models/RoleName'
import normalizeString from '../../../utilities/normalizeString'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import findUserWithExternalId from './findUserWithExternalId'

export interface FindOrCreateUserData {
  externalUserId: string
  email: string
  firstName?: string
  middleName?: string
  lastName?: string
  companyId?: string
  roleName?: RoleName
}

const findOrCreateUserWithExternalId = async (
  prisma: PrismaTransactionClient,
  findOrCreateUserData: FindOrCreateUserData,
) => {
  const {
    externalUserId,
    email,
    firstName,
    middleName,
    lastName,
    companyId,
    roleName = RoleName.BasicUser,
  } = findOrCreateUserData

  const existingUser = await findUserWithExternalId(prisma, externalUserId)

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
            userId: existingUser.userId,
            roleId: role.id,
            companyId: companyId,
          },
        },
        create: {
          user: { connect: { id: existingUser.userId } },
          role: { connect: { id: role.id } },
          company: { connect: { id: companyId } },
        },
        update: {},
      })
    }

    if (
      firstName &&
      lastName &&
      !existingUser.user.firstName &&
      !existingUser.user.lastName
    ) {
      await prisma.user.update({
        where: { id: existingUser.userId },
        data: {
          firstName,
          middleName,
          lastName,
        },
      })
    }

    const updatedUser = await findUserWithExternalId(prisma, externalUserId)
    return updatedUser.user
  }

  await executePrismaActionWithTransaction(prisma, async tx => {
    const userInvite = await tx.userInvite.findFirst({
      where: {
        email: normalizeString(email),
      },
    })

    let newRole: any | undefined = undefined

    if (userInvite) {
      newRole = {
        roleId: userInvite.roleId,
        companyId: userInvite.companyId,
      }
    } else if (companyId) {
      newRole = {
        roleId: role.id,
        companyId: companyId,
      }
    }

    let user = await tx.user.findUnique({
      where: {
        email: normalizeString(email),
      },
    })

    if (!user) {
      user = await tx.user.create({
        data: {
          email: normalizeString(email),
          firstName,
          middleName,
          lastName,
          userRoles: newRole && {
            create: [
              {
                companyId: newRole.companyId,
                roleId: newRole.roleId,
              },
            ],
          },
        },
      })
    }

    const newExternalUser = await tx.externalUser.create({
      data: {
        externalUserId,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: {
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
        },
      },
    })

    if (newExternalUser.user.userRoles.length > 0) {
      await tx.userSettings.upsert({
        where: { userId: newExternalUser.user.id },
        update: {
          selectedUserRole: {
            connect: {
              id: newExternalUser.user.userRoles[0].id,
            },
          },
        },
        create: {
          lastUpdatedBy: newExternalUser.user.id,
          darkMode: false,
          user: {
            connect: {
              id: newExternalUser.user.id,
            },
          },
          selectedUserRole: {
            connect: {
              id: newExternalUser.user.userRoles[0].id,
            },
          },
        },
      })
    }
  })

  const updatedUser = await findUserWithExternalId(prisma, externalUserId)
  return updatedUser.user
}

export default findOrCreateUserWithExternalId
