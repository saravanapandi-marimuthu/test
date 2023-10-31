import { Company } from '../../../../../prisma/client'

export type ManufacturerWithProductCount = Company & {
  productsCount: number
}
