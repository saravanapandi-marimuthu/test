import { RetailerProductWithRelations } from './types/productTypeExtensions'
import { PrismaTransactionClient } from '../types/types'

export const getRetailerProductWithProductSku = async (
  prisma: PrismaTransactionClient,
  companyId: string,
  productSku: string,
): Promise<RetailerProductWithRelations | null> => {
  return prisma.retailerProduct.findUnique({
    where: {
      companyId_productSku: {
        companyId,
        productSku,
      },
    },
    include: {
      retailerProductTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
      retailerProductComponents: {
        include: {
          unitOfMeasurement: {
            include: {
              baseUnit: true,
            },
          },
          product: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
  })
}

export const getRetailerProductWithProductName = async (
  prisma: PrismaTransactionClient,
  companyId: string,
  productName: string,
): Promise<RetailerProductWithRelations | null> => {
  return prisma.retailerProduct.findUnique({
    where: {
      companyId_productName: {
        companyId,
        productName,
      },
    },
    include: {
      retailerProductTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
      retailerProductComponents: {
        include: {
          unitOfMeasurement: {
            include: {
              baseUnit: true,
            },
          },
          product: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
  })
}
