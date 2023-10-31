import { PrismaClient } from '../../../../prisma/client'
import { FieldFilter } from '../types/types'
import { UserWithRelations } from './types/userTypeExtensions'

const getUsers = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
  filters: FieldFilter[],
): Promise<{ users: UserWithRelations[]; totalCount: number } | null> => {
  // Build the 'where' filter for search functionality
  const where: any = {}

  if (searchTerm) {
    where.OR = [
      { firstName: { contains: searchTerm, mode: 'insensitive' } },
      { middleName: { contains: searchTerm, mode: 'insensitive' } },
      { lastName: { contains: searchTerm, mode: 'insensitive' } },
      { email: { contains: searchTerm, mode: 'insensitive' } },
    ]
  }

  // Handle filters
  filters?.forEach(filter => {
    if (filter.filterValues && filter.filterValues.length > 0) {
      where[filter.filterField] = { in: filter.filterValues }
    }
  })

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  const users = await prisma.user.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      addresses: true,
      phoneNumbers: true,
      settings: true,
      userRoles: {
        include: {
          role: true,
          company: true,
        },
      },
    },
  })

  const totalCount = await prisma.user.count({ where })

  return {
    users: users,
    totalCount: totalCount,
  }
}

export default getUsers
