import { PrismaClient, UnitOfMeasurement } from '../../../../prisma/client'
import { UnitOfMeasurementWithRelations } from './types/configurationTypeExtensions'

const getAvailableUnitsOfMeasurement = async (
  prisma: PrismaClient,
  includeDerivedUnits = false,
): Promise<UnitOfMeasurementWithRelations[] | null> => {
  return prisma.unitOfMeasurement.findMany({
    include: {
      baseUnit: true,
      numeratorUnit: true,
      denominatorUnit: true,
      derivedUnits: includeDerivedUnits,
    },
  })
}

export default getAvailableUnitsOfMeasurement
