import {
  Company,
  Product,
  RetailerProduct,
  RetailerProductComponent,
  RetailerProductTag,
} from '../../../../../prisma/client'
import { UnitOfMeasurementWithRelations } from '../../configurations/types/configurationTypeExtensions'

export type ProductWithRelations = Product & {
  manufacturer: Company
}
export type RetailerProductComponentWithRelations = RetailerProductComponent & {
  product: ProductWithRelations
  unitOfMeasurement: UnitOfMeasurementWithRelations
}

export type RetailerProductWithRelations = RetailerProduct & {
  retailerProductTags: RetailerProductTag[]
  retailerProductComponents: RetailerProductComponentWithRelations[]
}
