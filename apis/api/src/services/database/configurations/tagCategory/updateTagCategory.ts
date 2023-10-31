import { PrismaClient, TagCategory } from '../../../../../prisma/client'

const updateTagCategory = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  tagCategoryName: string,
  updatedColor: string,
  updatedColorIndex: number,
): Promise<TagCategory | null> => {
  return prisma.tagCategory.update({
    where: {
      normalizedCategoryName: tagCategoryName.toLowerCase(),
    },
    data: {
      color: updatedColor,
      colorIndex: updatedColorIndex,
      lastUpdatedBy: updatedByUserId,
    },
  })
}

export default updateTagCategory
