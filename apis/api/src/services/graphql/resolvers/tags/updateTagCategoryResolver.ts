import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateTagCategory from '../../../database/configurations/tagCategory/updateTagCategory'
import {
  UpdateTagCategoryResult,
  UpdateTagCategoryError,
} from '../../generated/graphql'

const updateTagCategoryResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<UpdateTagCategoryResult> => {
  try {
    const prisma = context.prisma as PrismaClient
    const authenticatedUser = context.user as AuthenticatedUser

    const { tagCategoryName, updatedColor, updatedColorIndex } = args.input

    const updatedTagCategory = await updateTagCategory(
      prisma,
      authenticatedUser.userId,
      tagCategoryName,
      updatedColor,
      updatedColorIndex,
    )

    if (!updatedTagCategory) {
      return {
        tagCategory: null,
        error: UpdateTagCategoryError.TAG_CATEGORY_NOT_FOUND,
      }
    }

    return {
      tagCategory: updatedTagCategory,
      error: null,
    }
  } catch (err) {
    console.error(
      `error updating tag category with input ${args} - ${err.message}`,
    )
    return {
      tagCategory: null,
      error: UpdateTagCategoryError.UNKNOWN_ERROR,
    }
  }
}

export default updateTagCategoryResolver
