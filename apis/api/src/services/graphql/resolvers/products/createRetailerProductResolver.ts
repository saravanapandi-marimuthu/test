import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import findOrCreateRetailerProduct from '../../../database/products/findOrCreateRetailerProduct'
import { CreateRetailerProductResult } from '../../generated/graphql'

const createRetailerProductResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<CreateRetailerProductResult> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

  const {
    retailerCompanyId,
    productName,
    productSku,
    label,
    notes,
    components,
    tags,
  } = args.input

  const retailerProduct = await findOrCreateRetailerProduct(
    prisma,
    user.userId,
    {
      retailerCompanyId,
      productName,
      productSku,
      label,
      notes,
      components,
      tags,
    },
  )

  let result: CreateRetailerProductResult = {
    success: !retailerProduct ? false : true,
    retailerProductId: retailerProduct?.id,
  }

  return result
}

export default createRetailerProductResolver
