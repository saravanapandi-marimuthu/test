import { PrismaClient, NutrientRemovalRate } from "../../../../prisma/client"
import { NutrientRemovalRateWithRelations } from "./types/nutrientRemovalRateTypeExtensions"

export const getNutrientRemovalRate = async (
  prisma: PrismaClient,
  nutrientRemovalRateId: string,
): Promise<NutrientRemovalRateWithRelations> => {
  return await prisma.nutrientRemovalRate.findUnique({
    where: {
      id: +nutrientRemovalRateId,
    },
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
}
