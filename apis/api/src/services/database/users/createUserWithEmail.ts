import { UserAuditLogType } from '../../../../prisma/client'
import { RoleName } from '../../../models/RoleName'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import logAuditTrail from '../utilities/logAuditTrail'
import findUserWithEmail from './findUserWithEmail'
import normalizeString from '../../../utilities/normalizeString'

export interface CreateUserWithEmailInput {
  email: string
  firstName: string
  middleName: string
  lastName: string
  companyId: string
  roleName: RoleName
}

const createUserWithEmail = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: CreateUserWithEmailInput,
) => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    // Destructure input
    const {
      email,
      firstName = undefined,
      middleName = undefined,
      lastName = undefined,
      companyId = undefined,
      roleName = RoleName.BasicUser,
    } = input

    if (!email) {
      throw createServiceError({
        code: ERROR_CODES.INVALID_REQUEST,
      })
    }

    const normalizedEmail = normalizeString(email)

    const existingUser = await findUserWithEmail(tx, email)

    if (existingUser) {
      throw createServiceError({
        code: ERROR_CODES.USER_ALREADY_EXISTS,
        data: {
          normalizedEmail,
        },
      })
    }

    console.log('createUserWithEmail', email, firstName, lastName, companyId)

    const role = await tx.role.findUnique({
      where: {
        roleName: roleName,
      },
    })

    const newUser = await tx.user.create({
      data: {
        email: normalizedEmail,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        lastUpdatedBy: updatedByUserId,
        userRoles: companyId && {
          create: [
            {
              companyId,
              roleId: role.id,
              lastUpdatedBy: updatedByUserId,
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

    // Audit log
    await logAuditTrail(
      tx,
      'User',
      UserAuditLogType.CREATE,
      updatedByUserId,
      undefined,
      newUser as any,
    )

    return newUser
  })
}

export default createUserWithEmail
