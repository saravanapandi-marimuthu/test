import { Prisma, Taxonomy } from '../../../../../prisma/client'
import { SYSTEM_COMPANY_ID } from '../../../../constants'
import { PrismaTransactionClient } from '../../types/types'

const getParentTaxonomyTree = async (
  prisma: PrismaTransactionClient,
  childTaxonomyId: string,
  companyId?: string,
): Promise<Taxonomy[]> => {
  const parentTaxonomyTree = await prisma.$queryRaw<Taxonomy[]>`
      WITH RECURSIVE parent_taxonomy_tree AS (
          SELECT
              id,
              taxonomy_name,
              normalized_taxonomy_name,
              description,
              taxonomy_level,
              color_index,
              company_id,
              parent_taxonomy_id
          FROM
              "Taxonomy"
          WHERE
              normalized_taxonomy_name = ${childTaxonomyId.toLowerCase()}
              AND company_id IN (${Prisma.join([
                SYSTEM_COMPANY_ID,
                companyId || '',
              ])})
          UNION ALL
          SELECT
              t.id,
              t.taxonomy_name,
              t.normalized_taxonomy_name,
              t.description,
              t.taxonomy_level,
              t.color_index,
              t.company_id,
              t.parent_taxonomy_id
          FROM
              "Taxonomy" t
          INNER JOIN parent_taxonomy_tree tt ON tt.parent_taxonomy_id = t.id
      )
      SELECT * FROM parent_taxonomy_tree
    `
  return parentTaxonomyTree
}

export default getParentTaxonomyTree
