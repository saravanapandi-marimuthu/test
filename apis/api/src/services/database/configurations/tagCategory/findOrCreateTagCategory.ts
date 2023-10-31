import { PrismaClient } from '../../../../../prisma/client'
import { TagCategoryWithRelations } from '../types/configurationTypeExtensions'
import getTagCategory from './getTagCategory'

export interface FindOrCreateTagCategoryInput {
  tagCategoryName: string
  description?: string
  color?: string
  icon?: string
  colorIndex?: number
}

const findOrCreateTagCategory = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  input: FindOrCreateTagCategoryInput,
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
    return existingTagCategory
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

export default findOrCreateTagCategory
