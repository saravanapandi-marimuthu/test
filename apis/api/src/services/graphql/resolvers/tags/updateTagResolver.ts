import { PrismaClient, Tag } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateTag from '../../../database/configurations/tags/updateTag'
import { UpdateTagError, UpdateTagResult } from '../../generated/graphql'

const updateTagResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<UpdateTagResult> => {
  try {
    const prisma = context.prisma as PrismaClient
    const authenticatedUser = context.user as AuthenticatedUser

    const {
      tagId,
      updatedTagName,
      updatedColor,
      updatedColorIndex,
      updatedDescription,
    } = args.input

    //build the updated tag, ignoring keys that weren't sent in the request so we don't put null in the database
    //for reference on what is happening here, see: https://stackoverflow.com/questions/65734182/can-i-add-property-to-object-only-if-true-in-typescript
    const newTag: Partial<Tag> = {
      ...(updatedTagName ? { tagName: updatedTagName } : undefined),
      ...(updatedColor ? { color: updatedColor } : undefined),
      ...(updatedDescription ? { description: updatedDescription } : undefined),
      ...(updatedColorIndex ? { colorIndex: updatedColorIndex } : undefined),
    }

    const updatedTag = await updateTag(
      prisma,
      authenticatedUser.userId,
      tagId,
      newTag,
    )

    if (!updatedTag) {
      return {
        tag: null,
        error: UpdateTagError.INVALID_TAG_ID,
      }
    }

    return {
      tag: updatedTag,
      error: null,
    }
  } catch (err) {
    console.error(`error updating tag with input ${args} - ${err.message}`)
    return {
      tag: null,
      error: UpdateTagError.UNKNOWN_ERROR,
    }
  }
}

export default updateTagResolver
