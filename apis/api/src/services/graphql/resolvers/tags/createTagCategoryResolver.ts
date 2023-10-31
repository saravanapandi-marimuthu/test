import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import createTagCategory from '../../../database/configurations/tagCategory/createTagCategory'
import {
  CreateTagCategoryError,
  CreateTagCategoryResult,
} from '../../generated/graphql'
import { mapPrismaTagCategoryToGraphqlTagCategory } from '../../mappers/configurationMappers'

const createTagCategoryResolver = async (
  _parent: any,
  args: any,
  context: any,
  _info: any,
): Promise<CreateTagCategoryResult> => {
  try {
    const prisma = context.prisma as PrismaClient
    const user = context.user as AuthenticatedUser

    const { tagCategoryName, description, color, colorIndex, icon } = args.input

    const tagCategory = await createTagCategory(prisma, user.userId, {
      tagCategoryName,
      description,
      color,
      colorIndex,
      icon,
    })

    let tagCategoryResult: CreateTagCategoryResult = {
      error: null,
      tagCategory: mapPrismaTagCategoryToGraphqlTagCategory(tagCategory),
    }

    return tagCategoryResult
  } catch (err) {
    console.error(`Error in createTagCategoryResolver - ${err.message}`)
    switch (err.message) {
      case CreateTagCategoryError.TAG_CATEGORY_ALREADY_EXISTS:
        return {
          tagCategory: null,
          error: CreateTagCategoryError.TAG_CATEGORY_ALREADY_EXISTS,
        }

      default:
        return {
          tagCategory: null,
          error: CreateTagCategoryError.UNKNOWN_ERROR,
        }
    }
  }
}

export default createTagCategoryResolver
