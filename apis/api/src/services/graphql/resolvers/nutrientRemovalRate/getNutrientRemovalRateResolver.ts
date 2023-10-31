import { mapPrismaNutrientRemovalToGraphqlNutrientRemoval } from '../../mappers/nutrientRemovalMappers'
import { getNutrientRemovalRate } from '../../../database/nutrientRemovalRates/getNutrientRemovalRate'
import { PrismaClient } from '../../../../../prisma/client'
import { NutrientRemovalRate } from '../../generated/graphql'

export const getNutrientRemovalRateResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<NutrientRemovalRate> => {
  const prisma = context.prisma as PrismaClient

  const { nutrientRemovalRateId } = args

  const nutrientRemoval = await getNutrientRemovalRate(
    prisma,
    nutrientRemovalRateId,
  )

  return mapPrismaNutrientRemovalToGraphqlNutrientRemoval(nutrientRemoval)
}
