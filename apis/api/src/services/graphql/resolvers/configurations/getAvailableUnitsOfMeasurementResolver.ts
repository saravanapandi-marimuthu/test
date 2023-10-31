import { PrismaClient } from '../../../../../prisma/client'
import getAvailableUnitsOfMeasurement from '../../../database/configurations/getAvailableUnitsOfMeasurement'
import { mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement } from '../../mappers/configurationMappers'

const getAvailableUnitsOfMeasurementResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
) => {
  const prisma = context.prisma as PrismaClient

  const availableUoms = await getAvailableUnitsOfMeasurement(prisma)

  return availableUoms.map(uom =>
    mapPrismaUnitOfMeasurementToGraphqlUnitOfMeasurement(uom),
  )
}

export default getAvailableUnitsOfMeasurementResolver
