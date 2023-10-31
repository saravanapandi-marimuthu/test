import { Tag } from '../../../../../prisma/client'
import { PrismaTransactionClient, TagLinkInput } from '../../types/types'
import { TagWithRelations } from '../types/configurationTypeExtensions'

async function getTags(
  prisma: PrismaTransactionClient,
  inputs: TagLinkInput[],
  includeTagCategory?: boolean,
): Promise<TagWithRelations[] | Tag[]> {
  // If no inputs, return an empty array
  if (inputs.length === 0) {
    return []
  }

  // Map inputs to Prisma `where` clauses
  const whereClauses = inputs.map(input => ({
    normalizedTagName: input.tagName.toLowerCase(),
    tagCategory: {
      normalizedCategoryName: input.tagCategoryName.toLowerCase(),
    },
  }))

  // Fetch tags that match any of the where clauses
  const tags = await prisma.tag.findMany({
    where: {
      OR: whereClauses,
    },
    include: {
      tagCategory: includeTagCategory,
    },
  })

  return tags
}

export default getTags
