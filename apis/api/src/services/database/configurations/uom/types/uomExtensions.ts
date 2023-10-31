import { UnitOfMeasurement } from '../../../../../../prisma/client'

export type UnitOfMeasurementWithRelations = UnitOfMeasurement & {
  baseUnit?: UnitOfMeasurement
  numeratorUnit?: UnitOfMeasurement
  denominatorUnit?: UnitOfMeasurement
  derivedUnits?: UnitOfMeasurement[]
}
