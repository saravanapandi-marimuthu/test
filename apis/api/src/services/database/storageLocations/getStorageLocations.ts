import { Prisma, PrismaClient } from '../../../../prisma/client'
import { StorageLocationWithRelations } from './types/storageLocationTypeExtensions'
import { FieldFilter, TagFilter } from '../types/types'

export interface GetStorageLocationsInput {
  warehouseId?: number
  page: number
  perPage: number
  searchTerm: string
  sort: string
  filters: FieldFilter[]
  tagFilters: TagFilter[]
}

const getStorageLocations = async (
  prisma: PrismaClient,
  input: GetStorageLocationsInput,
): Promise<{
  storageLocations: StorageLocationWithRelations[]
  totalCount: number
} | null> => {
  const { warehouseId, page, perPage, searchTerm, sort, filters, tagFilters } =
    input

  const filterOptions: Prisma.StorageLocationWhereInput = {
    warehouseId: warehouseId,
  }

  if (searchTerm) {
    filterOptions.OR = [
      { name: { contains: searchTerm } },
      { description: { contains: searchTerm } },
    ]
  }

  filters?.forEach(filter => {
    if (filter.filterValues && filter.filterValues.length > 0) {
      filterOptions[filter.filterField] = { in: filter.filterValues }
    }
  })

  if (tagFilters?.length) {
    const tags: any = await Promise.all(
      tagFilters.map(async tagFilter => {
        const tag = await prisma.tag.findFirst({
          where: {
            tagName: tagFilter.tagName,
            tagCategory: {
              tagCategoryName: tagFilter.tagCategoryName,
            },
          },
        })
        return tag // returns undefined if no tag is found
      }),
    )

    // Filter out undefined tags
    const validTags = tags.filter(tag => tag !== undefined)

    if (validTags?.length) {
      filterOptions.AND = validTags.map(tag => ({
        storageType: {
          some: {
            id: tag?.id,
          },
        },
      }))
    }
  }

  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  const storageLocations = await prisma.storageLocation.findMany({
    where: filterOptions,
    orderBy,
    skip: page * perPage,
    take: perPage,
    include: {
      storageType: {
        include: {
          tagCategory: true,
        },
      },
      parent: true,
    },
  })

  const totalCount = await prisma.storageLocation.count({
    where: filterOptions,
  })

  return { storageLocations, totalCount }
}

export default getStorageLocations
