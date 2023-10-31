import { normalize } from 'path'
import {
  Address,
  AddressType,
  PhoneNumberType,
  Prisma,
  PrismaClient,
} from '../../../../prisma/client'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { CompanyWithRelations } from './types/companyTypeExtensions'
import normalizeString from '../../../utilities/normalizeString'

export interface CompanyData {
  companyName: string
  companyTypeName?: string
  parentCompanyId?: string
  addressType?: AddressType
  address?: Address
  phoneNumberType?: PhoneNumberType
  phoneNumber?: string
}

const findOrCreateCompany = async (
  prisma: PrismaClient,
  userId: string,
  companyData: CompanyData,
): Promise<CompanyWithRelations | null> => {
  if (!companyData.companyName) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
    })
  }

  const normalizedCompanyName = normalizeString(companyData.companyName)

  const existingCompany = await prisma.company.findUnique({
    where: { normalizedCompanyName },
    include: {
      addresses: true,
      phoneNumbers: true,
      companyType: true,
      companySaaSFeatures: true,
      roles: {
        where: { role: { roleName: { equals: 'Contact' } } },
        include: {
          user: true,
          role: true,
        },
      },
      companyTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
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

  if (existingCompany) {
    return existingCompany
  }

  const companyType = await prisma.companyType.findUnique({
    where: {
      companyTypeName: companyData.companyTypeName,
    },
  })

  if (!companyType) {
    throw Error('companyType is required')
  }

  let newCompanyData = {
    companyName: companyData.companyName,
    parentCompanyId: companyData.parentCompanyId,
  } as any as Prisma.CompanyCreateInput

  newCompanyData.companyType = {
    connect: {
      id: companyType.id,
    },
  }

  if (companyData.address && companyData.addressType) {
    newCompanyData.addresses = {
      create: [
        {
          addressType: companyData.addressType,
          lastUpdatedBy: userId,
          address: {
            create: {
              addressLine1: companyData.address.addressLine1,
              addressLine2: companyData.address.addressLine2,
              city: companyData.address.city,
              state: companyData.address.state,
              postalCode: companyData.address.postalCode,
              country: companyData.address.country,
              lastUpdatedBy: userId,
            },
          },
        },
      ],
    }
  }

  if (companyData.phoneNumber && companyData.phoneNumberType) {
    newCompanyData.phoneNumbers = {
      create: [
        {
          phoneNumberType: companyData.phoneNumberType,
          phoneNumber: companyData.phoneNumber,
          lastUpdatedBy: userId,
        },
      ],
    }
  }

  return prisma.company.create({
    data: newCompanyData,
    include: {
      addresses: true,
      phoneNumbers: true,
      companyType: true,
      companySaaSFeatures: true,
      roles: {
        where: { role: { roleName: { equals: 'Contact' } } },
        include: {
          user: true,
          role: true,
        },
      },
      companyTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
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
}

export default findOrCreateCompany
