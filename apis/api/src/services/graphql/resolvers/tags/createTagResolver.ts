import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import findOrCreateTag from '../../../database/configurations/tags/findOrCreateTag'
import { CreateTagError, CreateTagResult } from '../../generated/graphql'
import { mapPrismaTagToGraphqlTag } from '../../mappers/configurationMappers'

const createTagResolver = async (
  _parent: any,
  args: any,
  context: any,
  _info: any,
): Promise<CreateTagResult> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const { tagCategoryName, tagName, description, color, colorIndex, icon } =
    args.input

  const tag = await findOrCreateTag(
    prisma,
    user.userId,
    {
      tagCategoryName,
      tagName,
      description,
      color,
      colorIndex,
      icon,
    },
    false,
  )

  let tagResult: CreateTagResult = {
    tag: mapPrismaTagToGraphqlTag(tag),
    error: null,
  }

  return tagResult
}

export default createTagResolver
