import { PrismaClient } from '../../../../../prisma/client'
import getTagCategory from '../../../database/configurations/tagCategory/getTagCategory'
import { GetTagCategoryResult } from '../../generated/graphql'
import { mapPrismaTagCategoryToGraphqlTagCategory } from '../../mappers/configurationMappers'

const getTagCategoryResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetTagCategoryResult> => {
  const prisma = context.prisma as PrismaClient

  const { tagCategoryName } = args

  const tagCategory = await getTagCategory(prisma, tagCategoryName)

  return {
    tagCategory: mapPrismaTagCategoryToGraphqlTagCategory(tagCategory),
  }
}

export default getTagCategoryResolver
