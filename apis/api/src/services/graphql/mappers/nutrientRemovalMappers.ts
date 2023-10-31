import { NutrientRemovalRateWithRelations } from '../../database/nutrientRemovalRates/types/nutrientRemovalRateTypeExtensions'
import {
  NutrientRemovalRate,
  UnitOfMeasurementType,
} from '../generated/graphql'

export const mapPrismaNutrientRemovalToGraphqlNutrientRemoval = (
  nutrientRemoval: NutrientRemovalRateWithRelations,
): NutrientRemovalRate => {
  return {
    ...nutrientRemoval,
    crop: nutrientRemoval.crop,
    nutrient: nutrientRemoval.nutrient,
    removalRateUnit: {
      ...nutrientRemoval.removalRateUnit,
      unitOfMeasurementType: nutrientRemoval.removalRateUnit
        .unitOfMeasurementType as UnitOfMeasurementType,
      numeratorUnitType: nutrientRemoval.removalRateUnit
        .numeratorUnitType as UnitOfMeasurementType,
      denominatorUnitType: nutrientRemoval.removalRateUnit
        .denominatorUnitType as UnitOfMeasurementType,
    },
    year: nutrientRemoval.year,
  }
}
