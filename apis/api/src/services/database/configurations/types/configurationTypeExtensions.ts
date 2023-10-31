import {
  Tag,
  TagCategory,
  UnitOfMeasurement,
} from '../../../../../prisma/client'

export type TagWithRelations = Tag & {
  tagCategory: TagCategory
}

export type TagCategoryWithRelations = TagCategory & {
  tags: Tag[]
}

export type UnitOfMeasurementWithRelations = UnitOfMeasurement & {
  baseUnit: UnitOfMeasurement
}
