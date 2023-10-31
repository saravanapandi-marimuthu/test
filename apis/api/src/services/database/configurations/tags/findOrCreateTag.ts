import { TagWithRelations } from '../types/configurationTypeExtensions'
import getTag from './getTag'
import { PrismaTransactionClient } from '../../types/types'
import { executePrismaActionWithTransaction } from '../../utilities/executePrismaAction'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'

export interface FindOrCreateTagInput {
  tagCategoryName: string
  tagName: string
  description?: string
  color?: string
  colorIndex?: number
  icon?: string
}

const findOrCreateTag = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: FindOrCreateTagInput,
  allowCategoryCreation = true,
): Promise<TagWithRelations> => {
  const {
    tagCategoryName,
    tagName,
    description = undefined,
    color = undefined,
    colorIndex = undefined,
    icon = undefined,
  } = input

  if (!tagCategoryName) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'Tag Category Name is required',
    })
  }

  return executePrismaActionWithTransaction(prisma, async tx => {
    const existingTag = await tx.tag.findFirst({
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

    if (existingTag) {
      return existingTag
    }

    const newTag = await tx.tag.create({
      data: {
        normalizedTagName: tagName.toLowerCase(),
        tagName,
        color,
        colorIndex,
        icon,
        description,
        lastUpdatedBy: updatedByUserId,
        tagCategory: {
          connect: {
            normalizedCategoryName: tagCategoryName.toLowerCase(),
          },
        },
      },
      include: {
        tagCategory: true,
      },
    })

    return newTag
  })
}

export default findOrCreateTag
