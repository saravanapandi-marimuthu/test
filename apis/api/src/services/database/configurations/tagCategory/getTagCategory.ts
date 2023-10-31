import { PrismaClient, TagCategory } from '../../../../../prisma/client'
import { TagCategoryWithRelations } from '../types/configurationTypeExtensions'
import { FieldFilter } from '../../types/types'

const getTagCategory = async (
  prisma: PrismaClient,
  tagCategoryName: string,
): Promise<TagCategoryWithRelations | null> => {
  const tagCategory = await prisma.tagCategory.findUnique({
    where: {
      normalizedCategoryName: tagCategoryName.toLowerCase(),
    },
    include: {
      tags: true,
    },
  })

  return tagCategory
}

export default getTagCategory
