import { PrismaClient } from '../../../../../prisma/client'
import getTag from '../../../database/configurations/tags/getTag'
import { GetTagResult } from '../../generated/graphql'
import { mapPrismaTagToGraphqlTag } from '../../mappers/configurationMappers'

const getTagResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetTagResult> => {
  const prisma = context.prisma as PrismaClient

  const { tagCategoryId, tagName } = args

  const tag = await getTag(prisma, tagCategoryId, tagName)

  return {
    tag: mapPrismaTagToGraphqlTag(tag),
  }
}

export default getTagResolver
