import { NutrientRemovalRate, PrismaClient } from '../../../../../prisma/client'
import getNutrientRemovalRates from '../../../database/nutrientRemovalRates/getNutrientRemovalRates'
import { GetNutrientRemovalsRateResult } from '../../generated/graphql'
import { mapPrismaNutrientRemovalToGraphqlNutrientRemoval } from '../../mappers/nutrientRemovalMappers'

export const getNutrientRemovalRatesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetNutrientRemovalsRateResult> => {
  const prisma = context.prisma as PrismaClient

  const { page = 0, perPage = 10, searchTerm, sort } = args

  const nutrientRemovalRates = await getNutrientRemovalRates(prisma, page, perPage, searchTerm, sort)

  return {
    nutrientRemovalRates: nutrientRemovalRates.nutrientRemovalRates.map(nutrientRemovalRate =>
      mapPrismaNutrientRemovalToGraphqlNutrientRemoval(nutrientRemovalRate),
    ),
    totalCount: nutrientRemovalRates.totalCount,
  }
}
