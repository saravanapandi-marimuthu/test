import { PrismaClient } from '../../../../../prisma/client'
import searchTags from '../../../database/configurations/tags/searchTags'
import { GetTagsResult } from '../../generated/graphql'
import { mapPrismaTagToGraphqlTag } from '../../mappers/configurationMappers'

const getTagsResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetTagsResult> => {
  const prisma = context.prisma as PrismaClient

  const {
    tagCategoryName,
    page = 1,
    perPage = 10,
    searchTerm,
    sort,
    filters,
  } = args

  const tags = await searchTags(
    prisma,
    tagCategoryName,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
  )

  return {
    tags: tags.tags.map(tag => mapPrismaTagToGraphqlTag(tag)),
    totalCount: tags.totalCount,
  }
}

export default getTagsResolver
