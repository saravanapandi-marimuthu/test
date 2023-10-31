import findOrCreateTag from '../configurations/tags/findOrCreateTag'
import { TagWithRelations } from '../configurations/types/configurationTypeExtensions'
import { RetailerProductWithRelations } from './types/productTypeExtensions'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import {
  getRetailerProductWithProductName,
  getRetailerProductWithProductSku,
} from './getRetailerProduct'
import { FindOrCreateRetailerProductInput } from './types/inputs'

const findOrCreateRetailerProduct = async (
  prisma: PrismaTransactionClient,
  userId: string,
  input: FindOrCreateRetailerProductInput,
): Promise<RetailerProductWithRelations | null> => {
  const {
    retailerCompanyId,
    productName,
    productSku,
    label,
    notes,
    components,
    tags,
  } = input
  const productWithProductSku = await getRetailerProductWithProductSku(
    prisma,
    retailerCompanyId,
    productSku,
  )

  if (productWithProductSku) {
    // If the product already exists, return it. Updates are handled by updateRetailerProduct function.
    return productWithProductSku
  }

  const productWithProductName = await getRetailerProductWithProductName(
    prisma,
    retailerCompanyId,
    productName,
  )

  if (productWithProductName) {
    // If the product already exists, return it. Updates are handled by updateRetailerProduct function.
    return productWithProductName
  }

  return executePrismaActionWithTransaction(prisma, async tx => {
    const retailerProduct = await tx.retailerProduct.create({
      data: {
        company: {
          connect: {
            id: retailerCompanyId,
          },
        },
        productName: productName,
        productSku: productSku,
        label: label,
        notes: notes,
        lastUpdatedBy: userId,
      },
    })

    const componentsToCreate = components.map(component => ({
      retailerProductId: retailerProduct.id,
      productId: component.productId,
      unitOfMeasurementId: component.unitOfMeasurementId,
      measurementValue: component.measurementValue,
      unitPrice: component.unitPrice,
      lastUpdatedBy: userId,
    }))

    await tx.retailerProductComponent.createMany({
      data: componentsToCreate,
    })

    let tagInfos: TagWithRelations[] = []

    if (tags) {
      for (const tag of tags) {
        const tagInfo = await findOrCreateTag(tx, userId, {
          tagCategoryName: tag.tagCategoryName,
          tagName: tag.tagName,
          description: undefined,
          color: undefined,
          icon: undefined,
        })

        tagInfos.push(tagInfo)
      }
    }

    const tagsToCreate = tagInfos.map(tag => ({
      retailerProductId: retailerProduct.id,
      // tagCategoryId: tag.tagCategoryId,
      tagId: tag.id,
      lastUpdatedBy: userId,
    }))

    await tx.retailerProductTag.createMany({
      data: tagsToCreate,
    })

    return getRetailerProductWithProductName(tx, retailerCompanyId, productName)
  })
}

export default findOrCreateRetailerProduct
