export interface RetailerProductTagInput {
  tagCategoryName: string
  tagName: string
}

export interface RetailerProductComponentInput {
  productId: number
  unitOfMeasurementId: number
  measurementValue: number
  unitPrice: number
}

export interface FindOrCreateRetailerProductInput {
  retailerCompanyId: string
  productName: string
  productSku: string
  label: string
  notes: string
  components: RetailerProductComponentInput[]
  tags: RetailerProductTagInput[]
}

export interface UpdateRetailerProductInput {
  retailerCompanyId: string
  productName: string
  productSku: string
  label: string
  notes: string
  componentsAdded: RetailerProductComponentInput[]
  componentsRemoved: RetailerProductComponentInput[]
  componentsUpdated: RetailerProductComponentInput[]
  tagsAdded: RetailerProductTagInput[]
  tagsRemoved: RetailerProductTagInput[]
}
