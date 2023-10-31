import { PrismaClient, TagCategory } from '../../../../../prisma/client'
import { TagCategoryWithRelations } from '../types/configurationTypeExtensions'
import { FieldFilter } from '../../types/types'

const getTagCategories = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
  filters: FieldFilter[],
): Promise<{
  tagCategories: TagCategoryWithRelations[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search and filter functionality
  const where: any = {}

  // Handle search term
  if (searchTerm) {
    where.OR = [
      { tagCategoryName: { contains: searchTerm, mode: 'insensitive' } },
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

  const tagCategories = await prisma.tagCategory.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      tags: true,
    },
  })

  const totalCount = await prisma.tagCategory.count({
    where: where,
  })

  return {
    tagCategories,
    totalCount,
  }
}

export default getTagCategories
