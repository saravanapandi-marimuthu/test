import { PrismaClient } from '../../../../../prisma/client'
import { createServiceError } from '../../../errors/errorFactory'
import { ERROR_CODES } from '../../../errors/errorsRegistry'
import { CreateTagCategoryError } from '../../../graphql/generated/graphql'
import { TagCategoryWithRelations } from '../types/configurationTypeExtensions'
import getTagCategory from './getTagCategory'

export interface CreateTagCategoryInput {
  tagCategoryName: string
  description?: string
  color?: string
  icon?: string
  colorIndex?: number
}

const createTagCategory = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  input: CreateTagCategoryInput,
): Promise<TagCategoryWithRelations> => {
  const {
    tagCategoryName,
    description = undefined,
    color = undefined,
    icon = undefined,
    colorIndex = undefined,
  } = input

  const existingTagCategory = await getTagCategory(prisma, tagCategoryName)

  if (existingTagCategory) {
    throw createServiceError({
      code: ERROR_CODES.TAG_CATEGORY_ALREADY_EXISTS,
      data: {
        tagCategoryName,
      },
    })
  }

  return prisma.tagCategory.create({
    data: {
      tagCategoryName,
      normalizedCategoryName: tagCategoryName.toLowerCase(),
      color,
      colorIndex,
      icon,
      description,
      lastUpdatedBy: updatedByUserId,
    },
    include: {
      tags: true,
    },
  })
}

export default createTagCategory
