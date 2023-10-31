import {
  TagCategoryWithRelations,
  TagWithRelations,
} from '../../database/configurations/types/configurationTypeExtensions'
import { UnitOfMeasurementWithRelations } from '../../database/configurations/uom/types/uomExtensions'
import {
  Tag,
  TagCategory,
  UnitOfMeasurement,
  UnitOfMeasurementType,
} from '../generated/graphql'

export const mapPrismaTagCategoryToGraphqlTagCategory = (
  prismaTagCategory: TagCategoryWithRelations,
): TagCategory => {
  if (!prismaTagCategory) return null

  return { ...prismaTagCategory }
}

export const mapPrismaTagToGraphqlTag = (prismaTag: TagWithRelations): Tag => {
  if (!prismaTag) return null

  return { ...prismaTag }
}

export const mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement = (
  uom: UnitOfMeasurementWithRelations,
): UnitOfMeasurement => {
  if (!uom) return null

  return {
    ...uom,
    unitOfMeasurementType: uom.unitOfMeasurementType as UnitOfMeasurementType,
    numeratorUnitType: uom.numeratorUnitType as UnitOfMeasurementType,
    denominatorUnitType: uom.denominatorUnitType as UnitOfMeasurementType,
    baseUnit: uom.baseUnit
      ? mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement(uom.baseUnit)
      : null,
    numeratorUnit: uom.numeratorUnit
      ? mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement(uom.numeratorUnit)
      : null,
    denominatorUnit: uom.denominatorUnit
      ? mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement(
          uom.denominatorUnit,
        )
      : null,
    derivedUnits: uom.derivedUnits
      ? uom.derivedUnits.map(derivedUnit =>
          mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement(derivedUnit),
        )
      : null,
  }
}
