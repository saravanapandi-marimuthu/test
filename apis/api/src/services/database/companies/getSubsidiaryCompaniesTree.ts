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

const createIncludeTree = (depth: number) => {
  if (depth === 0)
    return {
      ...baseInclude,
      parentCompany: {
        include: {
          ...baseInclude,
        },
      },
      childCompanies: true,
    }

  return {
    ...baseInclude,
    parentCompany: {
      include: {
        ...baseInclude,
      },
    },
    childCompanies: {
      include: createIncludeTree(depth - 1),
    },
  }
}

const getSubsidiaryCompaniesTree = async (
  prisma: PrismaClient,
  parentCompanyId: string,
  treeDepth: number,
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
    OR: [{ id: parentCompanyId }],
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
    `getSubsidiaryCompaniesTree called with where: ${JSON.stringify(
      where,
    )} and orderBy ${JSON.stringify(orderBy)}`,
  )

  const companies = await prisma.company.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: createIncludeTree(treeDepth),
  })

  const totalCount = await prisma.company.count({
    where: where,
  })

  return {
    companies: companies as any as CompanyWithRelations[],
    totalCount: totalCount,
  }
}

export default getSubsidiaryCompaniesTree
