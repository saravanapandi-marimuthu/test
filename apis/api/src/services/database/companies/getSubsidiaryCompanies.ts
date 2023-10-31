import { PrismaClient } from '../../../../prisma/client'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { CompanyWithRelations } from './types/companyTypeExtensions'

const baseInclude = {
  addresses: {
    include: {
      address: true,
    },
  },
  phoneNumbers: true,
  companyType: true,
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
}

const createInclude = () => {
  return {
    ...baseInclude,
    parentCompany: {
      include: {
        ...baseInclude,
      },
    },
  }
}

const getSubsidiaryCompanies = async (
  prisma: PrismaClient,
  parentCompanyId: string,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
): Promise<{
  companies: CompanyWithRelations[]
  totalCount: number
} | null> => {
  if (!parentCompanyId) {
    throw createServiceError({
      message: 'Parent company ID is required',
      code: ERROR_CODES.INVALID_REQUEST,
    })
  }

  // Build the 'where' filter
  const baseCondition = {
    OR: [{ id: parentCompanyId }, { parentCompanyId: parentCompanyId }],
  }

  let where: any

  if (searchTerm) {
    where = {
      AND: [
        baseCondition,
        {
          OR: [{ companyName: { contains: searchTerm, mode: 'insensitive' } }],
        },
      ],
    }
  } else {
    where = baseCondition
  }

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  console.log(
    `getSubsidiaryCompanies called with where: ${JSON.stringify(
      where,
    )} and orderBy ${JSON.stringify(orderBy)}`,
  )

  const companies = await prisma.company.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: createInclude(),
  })

  const totalCount = await prisma.company.count({
    where: where,
  })

  return {
    companies,
    totalCount: totalCount,
  }
}

export default getSubsidiaryCompanies
