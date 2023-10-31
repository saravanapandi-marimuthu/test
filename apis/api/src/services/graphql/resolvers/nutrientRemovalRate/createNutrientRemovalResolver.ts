import { NutrientRemovalRate, PrismaClient } from "../../../../../prisma/client"

export const createNutrientRemovalResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<NutrientRemovalRate> => {
  const prisma = context.prisma as PrismaClient

  const { input } = args

  const nutrientRemoval = await prisma.nutrientRemovalRate.create({
    data: {
      ...input,
    },
  })

  return nutrientRemoval
}
