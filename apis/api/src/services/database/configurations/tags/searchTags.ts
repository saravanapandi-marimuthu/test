import { PrismaClient } from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { TagWithRelations } from '../types/configurationTypeExtensions'
import { FieldFilter } from '../../types/types'

const searchTags = async (
  prisma: PrismaClient,
  tagCategoryName: string,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
  filters: FieldFilter[],
): Promise<{
  tags: TagWithRelations[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search and filter functionality
  let where: any = {}

  let tagCategoryId: number = undefined

  if (tagCategoryName) {
    const tagCategory = await prisma.tagCategory.findUnique({
      where: {
        normalizedCategoryName: tagCategoryName.toLowerCase(),
      },
    })

    if (!tagCategory) {
      throw createServiceError({
        code: ERROR_CODES.TAG_CATEGORY_NOT_FOUND,
        data: {
          tagCategoryName,
        },
      })
    }

    tagCategoryId = tagCategory?.id
  }

  // Handle search term
  if (searchTerm) {
    where.AND = [
      {
        OR: [{ tagName: { contains: searchTerm, mode: 'insensitive' } }],
      },
    ]
  }

  if (tagCategoryId) {
    const tagCategoryCondition = { tagCategoryId: { equals: tagCategoryId } }

    if (where.AND) {
      where.AND.push(tagCategoryCondition)
    } else {
      where = { AND: [tagCategoryCondition] }
    }
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

  const tags = await prisma.tag.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      tagCategory: true,
    },
  })

  const totalCount = await prisma.tag.count({
    where: where,
  })

  return {
    tags,
    totalCount,
  }
}

export default searchTags
