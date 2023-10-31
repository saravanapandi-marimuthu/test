import { PrismaClient, Tag } from '../../../../../prisma/client'

const updateTag = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  tagId: number,
  updatedTag: Partial<Tag>,
): Promise<Tag | null> => {
  return prisma.tag.update({
    where: {
      id: tagId,
    },
    data: {
      ...updatedTag,
      lastUpdatedBy: updatedByUserId,
    },
  })
}

export default updateTag
