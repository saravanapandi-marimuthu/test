import { PrismaClient } from '../../../../../prisma/client'
import { UnitOfMeasurementWithRelations } from '../types/configurationTypeExtensions'

const getUnitOfMeasurement = async (
  prisma: PrismaClient,
  unitName: string,
): Promise<UnitOfMeasurementWithRelations | null> => {
  const unit = await prisma.unitOfMeasurement.findUnique({
    where: {
      unitName,
    },
    include: {
      baseUnit: true,
    },
  })

  return unit
}

export default getUnitOfMeasurement
