import { Prisma, PrismaClient } from '../../../../prisma/client'
import { RetailerProductWithRelations } from './types/productTypeExtensions'
import { FieldFilter, TagFilter } from '../types/types'

export interface GetRetailProductsInput {
  companyId: string
  page: number
  perPage: number
  searchTerm: string
  sort: string
  filters: FieldFilter[]
  tagFilters: TagFilter[]
}

const getRetailerProducts = async (
  prisma: PrismaClient,
  input: GetRetailProductsInput,
): Promise<{
  retailerProducts: RetailerProductWithRelations[]
  totalCount: number
} | null> => {
  const { companyId, page, perPage, searchTerm, sort, filters, tagFilters } =
    input

  const filterOptions: Prisma.RetailerProductWhereInput = {
    companyId: companyId,
  }

  if (searchTerm) {
    filterOptions.OR = [
      { productName: { contains: searchTerm } },
      { productSku: { contains: searchTerm } },
    ]
  }

  filters?.forEach(filter => {
    if (filter.filterValues && filter.filterValues.length > 0) {
      filterOptions[filter.filterField] = { in: filter.filterValues }
    }
  })

  if (tagFilters?.length) {
    const tags = await Promise.all(
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
        retailerProductTags: {
          some: {
            tagId: tag.id,
            tagCategoryId: tag.tagCategoryId,
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

  const retailerProducts = await prisma.retailerProduct.findMany({
    where: filterOptions,
    orderBy,
    skip: page * perPage,
    take: perPage,
    include: {
      retailerProductTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
      retailerProductComponents: {
        include: {
          unitOfMeasurement: {
            include: {
              baseUnit: true,
            },
          },
          product: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
  })

  const totalCount = await prisma.retailerProduct.count({
    where: filterOptions,
  })

  return { retailerProducts, totalCount }
}

export default getRetailerProducts
