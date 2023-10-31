import { PrismaClient } from '../../../../prisma/client'
import { CompanyWithRelations } from './types/companyTypeExtensions'

const getCompanies = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
): Promise<{
  companies: CompanyWithRelations[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search functionality
  const where: any = searchTerm
    ? {
        OR: [{ companyName: { contains: searchTerm, mode: 'insensitive' } }],
      }
    : {}

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  console.log(
    `getCompanies called with where: ${JSON.stringify(
      where,
    )} and orderBy ${JSON.stringify(orderBy)}`,
  )

  const companies = await prisma.company.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
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

  const totalCount = await prisma.company.count({
    where: where,
  })

  return {
    companies,
    totalCount: totalCount,
  }
}

export default getCompanies
