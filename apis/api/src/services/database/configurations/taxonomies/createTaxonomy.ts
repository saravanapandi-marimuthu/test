import { SYSTEM_COMPANY_ID } from '../../../../constants'
import { PrismaTransactionClient } from '../../types/types'

export interface TaxonomyInput {
  taxonomyName: string
  description?: string
  taxonomyLevel: number
  colorIndex?: number
  companyId?: string
  children?: TaxonomyInput[]
}

const createTaxonomy = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: TaxonomyInput,
  parentTaxonomyId?: number,
): Promise<void> => {
  // Destructure the input
  const {
    taxonomyName,
    description,
    taxonomyLevel,
    colorIndex,
    companyId = SYSTEM_COMPANY_ID,
    children,
  } = input

  // Create the taxonomy
  const createdTaxonomy = await prisma.taxonomy.create({
    data: {
      taxonomyName,
      normalizedTaxonomyName: taxonomyName.toLowerCase(),
      description,
      taxonomyLevel,
      colorIndex,
      companyId,
      parentTaxonomyId: parentTaxonomyId || null, // if parentTaxonomyId is undefined, it will be null
      lastUpdatedBy: updatedByUserId,
    },
  })

  console.log(`Created taxonomy: ${createdTaxonomy.taxonomyName}`)

  // If there are children, recursively create them
  if (children && children.length > 0) {
    for (const child of children) {
      await createTaxonomy(
        prisma,
        updatedByUserId,
        { ...child, companyId },
        createdTaxonomy.id,
      )
    }
  }
}

export default createTaxonomy
