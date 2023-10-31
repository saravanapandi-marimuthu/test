import { RetailerProductWithRelations } from './types/productTypeExtensions'
import {
  RetailerProductComponentInput,
  RetailerProductTagInput,
  UpdateRetailerProductInput,
} from './types/inputs'
import { getRetailerProductWithProductSku } from './getRetailerProduct'
import { PrismaClient } from '../../../../prisma/client'
import findOrCreateTag from '../configurations/tags/findOrCreateTag'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'

const updateRetailerProduct = async (
  prisma: PrismaClient,
  userId: string,
  input: UpdateRetailerProductInput,
): Promise<RetailerProductWithRelations | null> => {
  const {
    retailerCompanyId,
    productName,
    productSku,
    label,
    notes,
    componentsAdded,
    componentsRemoved,
    componentsUpdated,
    tagsAdded,
    tagsRemoved,
  } = input

  const productWithProductSku = await getRetailerProductWithProductSku(
    prisma,
    retailerCompanyId,
    productSku,
  )

  if (!productWithProductSku) {
    throw new Error('Product not found')
  }

  return executePrismaActionWithTransaction(prisma, async tx => {
    await tx.retailerProduct.update({
      where: {
        id: productWithProductSku.id,
      },
      data: {
        productName: productName,
        label: label,
        notes: notes,
        lastUpdatedBy: userId,
      },
    })

    await handleComponentsChange(
      tx,
      productWithProductSku.id,
      componentsAdded,
      componentsRemoved,
      componentsUpdated,
      userId,
    )

    await handleTagsChange(
      tx,
      productWithProductSku.id,
      tagsAdded,
      tagsRemoved,
      userId,
    )

    return getRetailerProductWithProductSku(tx, retailerCompanyId, productSku)
  })
}

async function handleComponentsChange(
  prisma: PrismaTransactionClient,
  retailerProductId: number,
  addedComponents: RetailerProductComponentInput[],
  removedComponents: RetailerProductComponentInput[],
  updatedComponents: RetailerProductComponentInput[],
  userId: string,
) {
  // use prisma to either create or update or delete components
  if (addedComponents && addedComponents.length > 0) {
    const componentsToCreate = addedComponents.map(component => ({
      retailerProductId: retailerProductId,
      productId: component.productId,
      unitOfMeasurementId: component.unitOfMeasurementId,
      measurementValue: component.measurementValue,
      unitPrice: component.unitPrice,
      lastUpdatedBy: userId,
    }))

    await prisma.retailerProductComponent.createMany({
      data: componentsToCreate,
    })
  }

  if (removedComponents && removedComponents.length > 0) {
    for (const removedComponent of removedComponents) {
      await prisma.retailerProductComponent.delete({
        where: {
          retailerProductId_productId: {
            retailerProductId: retailerProductId,
            productId: removedComponent.productId,
          },
        },
      })
    }
  }

  if (updatedComponents && updatedComponents.length > 0) {
    for (const updatedComponent of updatedComponents) {
      await prisma.retailerProductComponent.update({
        where: {
          retailerProductId_productId: {
            retailerProductId: retailerProductId,
            productId: updatedComponent.productId,
          },
        },
        data: {
          unitOfMeasurementId: updatedComponent.unitOfMeasurementId,
          measurementValue: updatedComponent.measurementValue,
          unitPrice: updatedComponent.unitPrice,
          lastUpdatedBy: userId,
        },
      })
    }
  }
}

async function handleTagsChange(
  prisma: PrismaTransactionClient,
  retailerProductId: number,
  addedTags: RetailerProductTagInput[],
  removedTags: RetailerProductTagInput[],
  userId: string,
) {
  if (addedTags && addedTags.length > 0) {
    for (const newTag of addedTags) {
      const tagInfo = await findOrCreateTag(prisma, userId, {
        tagCategoryName: newTag.tagCategoryName,
        tagName: newTag.tagName,
        description: undefined,
        color: undefined,
        icon: undefined,
      })

      await prisma.retailerProductTag.create({
        data: {
          retailerProductId: retailerProductId,
          tagId: tagInfo.id,
          lastUpdatedBy: userId,
        },
      })
    }
  }

  if (removedTags && removedTags.length > 0) {
    for (const removedTag of removedTags) {
      const tagInfo = await findOrCreateTag(prisma, userId, {
        tagCategoryName: removedTag.tagCategoryName,
        tagName: removedTag.tagName,
        description: undefined,
        color: undefined,
        icon: undefined,
      })

      await prisma.retailerProductTag.delete({
        where: {
          retailerProductId_tagId: {
            retailerProductId: retailerProductId,
            tagId: tagInfo.id,
          },
        },
      })
    }
  }
}

export default updateRetailerProduct
