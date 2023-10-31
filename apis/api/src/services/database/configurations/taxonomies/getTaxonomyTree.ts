import { Prisma, Taxonomy } from '../../../../../prisma/client'
import { SYSTEM_COMPANY_ID } from '../../../../constants'
import { PrismaTransactionClient } from '../../types/types'

const getTaxonomyTree = async (
  prisma: PrismaTransactionClient,
  rootTaxonomyName: string,
  companyId?: string,
): Promise<Taxonomy[]> => {
  // Gets the taxonomy subtree for a given company based on root taxonomy name using raw SQL

  // This is a workaround for the fact that Prisma doesn't support recursive queries yet

  let companyIds: string[] = [SYSTEM_COMPANY_ID]

  if (companyId) {
    companyIds.push(companyId)
  }

  const taxonomyTree = await prisma.$queryRaw<Taxonomy[]>`
        WITH RECURSIVE taxonomy_tree AS (
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
                company_id IN (${Prisma.join(companyIds)})
                AND normalized_taxonomy_name = ${rootTaxonomyName.toLowerCase()}
                AND parent_taxonomy_id = 0
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
            INNER JOIN taxonomy_tree tt ON tt.id = t.parent_taxonomy_id
        )
        SELECT * FROM taxonomy_tree
    `

  return taxonomyTree
}

export default getTaxonomyTree
