import {
  AddressType,
  PhoneNumberType,
  UserAuditLogType,
} from '../../../../prisma/client'
import { RoleName } from '../../../models/RoleName'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import {
  CompanyWithRelations,
  CreateCompanyInput,
} from './types/companyTypeExtensions'
import { PrismaTransactionClient } from '../types/types'
import createUserWithEmail from '../users/createUserWithEmail'
import findUserWithEmail from '../users/findUserWithEmail'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import logAuditTrail from '../utilities/logAuditTrail'
import getCompany from './getCompany'
import normalizeString from '../../../utilities/normalizeString'

const createCompany = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: CreateCompanyInput,
): Promise<CompanyWithRelations> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    // Destructure input
    const {
      companyName,
      companyTypeName,
      companyId = undefined,
      parentCompanyId,
      companyAddress: addressInput,
      companyPhoneNumber: phoneNumberInput,
      contactPerson,
      companyExtendedProperties,
      companyTags,
      companyNotes,
    } = input

    const { addressType, address } = addressInput ?? {}
    const { phoneNumberType, phoneNumber } = phoneNumberInput ?? {}

    const normalizedCompanyName = normalizeString(companyName)

    // If company with companyName already exists, throw error
    const existingCompany = await tx.company.findUnique({
      where: { normalizedCompanyName },
    })

    if (existingCompany) {
      throw createServiceError({
        code: ERROR_CODES.COMPANY_ALREADY_EXISTS,
        data: {
          companyName,
        },
      })
    }

    // Create company
    const createdCompany = await tx.company.create({
      data: {
        id: companyId,
        normalizedCompanyName,
        companyName,
        notes: companyNotes,
        companyType: {
          connect: {
            companyTypeName: normalizeString(companyTypeName),
          },
        },
        parentCompany: parentCompanyId && {
          connect: {
            id: parentCompanyId,
          },
        },
        extendedProperties: companyExtendedProperties,
        addresses: {
          create: address && [
            {
              addressType: addressType ?? AddressType.BILLING,
              lastUpdatedBy: updatedByUserId,
              address: {
                create: {
                  addressLine1: address.addressLine1,
                  addressLine2: address.addressLine2,
                  city: address.city,
                  state: address.state,
                  postalCode: address.postalCode,
                  country: address.country,
                  lastUpdatedBy: updatedByUserId,
                },
              },
            },
          ],
        },
        phoneNumbers: phoneNumber && {
          create: [
            {
              phoneNumberType: phoneNumberType ?? PhoneNumberType.WORK,
              phoneNumber: phoneNumber,
              lastUpdatedBy: updatedByUserId,
            },
          ],
        },
      },
      include: {
        addresses: true,
        phoneNumbers: true,
        companyType: true,
        companySaaSFeatures: true,
        secondCompanyRelationships: {
          include: {
            secondCompany: {
              include: {
                companyType: true,
              },
            },
          },
        },
      },
    })

    // Audit company creation
    await logAuditTrail(
      tx,
      updatedByUserId,
      UserAuditLogType.CREATE,
      'Company',
      null,
      createdCompany,
    )

    // If companyTags is available, get the tags based on the companyTags input
    if (companyTags) {
      const tags = await tx.tag.findMany({
        where: {
          OR: companyTags.map(tag => ({
            tagName: tag.tagName,
            tagCategory: {
              tagCategoryName: tag.tagCategoryName,
            },
          })),
        },
      })

      // Create company tags
      await tx.companyTag.createMany({
        data: tags.map(tag => ({
          companyId: createdCompany.id,
          tagId: tag.id,
          lastUpdatedBy: updatedByUserId,
        })),
      })
    }

    // If contact user is provided, check if the user already exists
    if (!contactPerson) {
      return createdCompany
    }

    const existingContact = await findUserWithEmail(tx, contactPerson.email)

    if (existingContact) {
      return createdCompany
    }

    // Create user (contact)
    await createUserWithEmail(tx, updatedByUserId, {
      email: contactPerson.email,
      firstName: contactPerson.firstName,
      middleName: contactPerson.middleName,
      lastName: contactPerson.lastName,
      companyId: createdCompany.id,
      roleName: RoleName.Contact,
    })

    //
    return getCompany(tx, createdCompany.id)
  })
}

export default createCompany
