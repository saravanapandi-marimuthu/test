import {
  PrismaClient,
  UnitOfMeasurement,
  UnitOfMeasurementType,
} from '../../../../../prisma/client'
import { UnitOfMeasurementWithRelations } from '../types/configurationTypeExtensions'
import getUnitOfMeasurement from './getUnitOfMeasurement'

export interface FindOrCreateUnitOfMeasurementInput {
  unitName: string
  singularName: string
  pluralName: string
  baseUnitName: string
  colorIndex?: number
  unitOfMeasurementType?: UnitOfMeasurementType
  conversionFactor?: number
  numeratorUnitName?: string
  denominatorUnitName?: string
  numeratorMultiplier?: number
  denominatorMultiplier?: number
  numeratorUnitType?: UnitOfMeasurementType
  denominatorUnitType?: UnitOfMeasurementType
}

const findOrCreateUnitOfMeasurement = async (
  prisma: PrismaClient,
  updatedByUserId: string,
  input: FindOrCreateUnitOfMeasurementInput,
): Promise<UnitOfMeasurementWithRelations> => {
  // destructuring input
  const {
    unitName,
    singularName,
    pluralName,
    baseUnitName,
    colorIndex,
    unitOfMeasurementType,
    conversionFactor,
    numeratorUnitName,
    denominatorUnitName,
    numeratorMultiplier,
    denominatorMultiplier,
    numeratorUnitType,
    denominatorUnitType,
  } = input

  const existingUnit = await getUnitOfMeasurement(prisma, unitName)

  if (existingUnit) {
    return existingUnit
  }

  return prisma.unitOfMeasurement.create({
    data: {
      unitName: unitName.toLowerCase(),
      singularName,
      unitOfMeasurementType,
      pluralName,
      colorIndex,
      conversionFactor,
      numeratorUnit: numeratorUnitName && {
        connect: {
          unitName: numeratorUnitName.toLowerCase(),
        },
      },
      denominatorUnit: denominatorUnitName && {
        connect: {
          unitName: denominatorUnitName.toLowerCase(),
        },
      },
      numeratorMultiplier,
      denominatorMultiplier,
      numeratorUnitType,
      denominatorUnitType,
      lastUpdatedBy: updatedByUserId,
      baseUnit: baseUnitName && {
        connect: {
          unitName: baseUnitName.toLowerCase(),
        },
      },
    },
    include: {
      baseUnit: true,
    },
  })
}

export default findOrCreateUnitOfMeasurement
