import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { TagWithRelations } from '../types/configurationTypeExtensions'
import { PrismaTransactionClient } from '../../types/types'

const getTag = async (
  prisma: PrismaTransactionClient,
  tagCategoryName?: string,
  tagName?: string,
): Promise<TagWithRelations | null> => {
  if (!tagCategoryName || !tagName) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'Tag Category Name and Tag Name are required',
    })
  }
  const tag = await prisma.tag.findFirst({
    where: {
      normalizedTagName: tagName.toLowerCase(),
      tagCategory: {
        normalizedCategoryName: tagCategoryName.toLowerCase(),
      },
    },
    include: {
      tagCategory: true,
    },
  })

  if (!tag) {
    throw createServiceError({
      code: ERROR_CODES.TAG_NOT_FOUND,
      message: `Tag with name ${tagName} and category ${tagCategoryName} not found`,
    })
  }

  return tag
}

export default getTag
