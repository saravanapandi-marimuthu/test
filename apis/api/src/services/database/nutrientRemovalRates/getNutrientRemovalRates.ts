import { PrismaClient, NutrientRemovalRate } from '../../../../prisma/client'
import { NutrientRemovalRateWithRelations } from './types/nutrientRemovalRateTypeExtensions'

const getNutrientRemovalRates = async (
  prisma: PrismaClient,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
): Promise<{
  nutrientRemovalRates: NutrientRemovalRateWithRelations[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search functionality
  const where: any = searchTerm
    ? {
        OR: [{ companyName: { contains: searchTerm, mode: 'insensitive' } }],
      }
    : {}

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  console.log(
    `getNutrientRemovalRates called with where: ${JSON.stringify(
      where,
    )} and orderBy ${JSON.stringify(orderBy)}`,
  )

  const nutrientRemovalRates = await prisma.nutrientRemovalRate.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      crop: {
        include: {
          tagCategory: true,
        }
      },
      nutrient: {
        include: {
          tagCategory: true,
        }
      },
      removalRateUnit: true,
      year: true,
    },
  })

  const totalCount = await prisma.nutrientRemovalRate.count({
    where: where,
  })

  return {
    nutrientRemovalRates,
    totalCount: totalCount,
  }
}

export default getNutrientRemovalRates
