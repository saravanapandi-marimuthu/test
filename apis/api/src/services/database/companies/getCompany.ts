import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { CompanyWithRelations } from './types/companyTypeExtensions'
import { PrismaTransactionClient } from '../types/types'
import normalizeString from '../../../utilities/normalizeString'

const getCompany = async (
  prisma: PrismaTransactionClient,
  companyId?: string,
  companyName?: string,
): Promise<CompanyWithRelations | null> => {
  if (!companyId && !companyName) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'Company Id or Company Name is required',
    })
  }

  const whereClause: any = {}

  if (companyId) {
    whereClause.id = companyId
  } else if (companyName) {
    whereClause.normalizedCompanyName = normalizeString(companyName)
  }

  const company = await prisma.company.findUnique({
    where: whereClause,
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
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

  return company
}

export default getCompany
