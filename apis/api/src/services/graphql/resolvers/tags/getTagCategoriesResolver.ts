import { PrismaClient } from '../../../../../prisma/client'
import getTagCategories from '../../../database/configurations/tagCategory/getTagCategories'
import { GetTagCategoriesResult } from '../../generated/graphql'
import { mapPrismaTagCategoryToGraphqlTagCategory } from '../../mappers/configurationMappers'

const getTagCategoriesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetTagCategoriesResult> => {
  const prisma = context.prisma as PrismaClient

  const { page = 1, perPage = 10, searchTerm, sort, filters } = args

  const tagCategories = await getTagCategories(
    prisma,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
  )

  return {
    tagCategories: tagCategories.tagCategories.map(tagCategory =>
      mapPrismaTagCategoryToGraphqlTagCategory(tagCategory),
    ),
    totalCount: tagCategories.totalCount,
  }
}

export default getTagCategoriesResolver
