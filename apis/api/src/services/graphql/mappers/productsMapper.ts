import { RetailerProductWithRelations } from '../../database/products/types/productTypeExtensions'
import { RetailerProduct, UnitOfMeasurementType } from '../generated/graphql'

export const mapPrismaRetailerProductToGraphqlRetailerProduct = (
  prismaRetailerProduct: RetailerProductWithRelations,
): RetailerProduct | null => {
  if (!prismaRetailerProduct) return null

  const result = {
    id: prismaRetailerProduct.id,
    companyId: prismaRetailerProduct.companyId,
    productName: prismaRetailerProduct.productName,
    productSku: prismaRetailerProduct.productSku,
    createdAt: prismaRetailerProduct.createdAt,
    updatedAt: prismaRetailerProduct.updatedAt,
    retailerProductTags: prismaRetailerProduct.retailerProductTags.map(
      productTag => ({
        ...productTag,
      }),
    ),

    retailerProductComponents:
      prismaRetailerProduct.retailerProductComponents.map(component => ({
        ...component,
        unitOfMeasurement: {
          ...component.unitOfMeasurement,
          unitOfMeasurementType: component.unitOfMeasurement
            .unitOfMeasurementType as UnitOfMeasurementType,
          numeratorUnitType:
            component.unitOfMeasurement.numeratorUnitType &&
            (component.unitOfMeasurement
              .numeratorUnitType as UnitOfMeasurementType),
          denominatorUnitType:
            component.unitOfMeasurement.denominatorUnitType &&
            (component.unitOfMeasurement
              .denominatorUnitType as UnitOfMeasurementType),
          baseUnit: component.unitOfMeasurement.baseUnit && {
            ...component.unitOfMeasurement.baseUnit,
            unitOfMeasurementType: component.unitOfMeasurement.baseUnit
              .unitOfMeasurementType as UnitOfMeasurementType,
            numeratorUnitType: component.unitOfMeasurement.baseUnit
              .numeratorUnitType as UnitOfMeasurementType,
            denominatorUnitType: component.unitOfMeasurement.baseUnit
              .denominatorUnitType as UnitOfMeasurementType,
          },
        },
      })),
  }

  return result
}
