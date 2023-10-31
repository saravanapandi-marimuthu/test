import { NutrientRemovalRate, Tag, UnitOfMeasurement } from "../../../../../prisma/client";

export type NutrientRemovalRateWithRelations = NutrientRemovalRate & {
  crop: Tag
  nutrient: Tag
  removalRateUnit: UnitOfMeasurement
  year: Tag
}
