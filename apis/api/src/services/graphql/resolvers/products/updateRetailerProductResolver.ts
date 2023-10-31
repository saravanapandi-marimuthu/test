import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import updateRetailerProduct from '../../../database/products/updateRetailerProduct'
import { UpdateRetailerProductResult } from '../../generated/graphql'

const updateRetailerProductResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<UpdateRetailerProductResult> => {
  const prisma = context.prisma as PrismaClient
  const user = context.user as AuthenticatedUser

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
  } = args.input

  const retailerProduct = await updateRetailerProduct(prisma, user.userId, {
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
  })

  let result: UpdateRetailerProductResult = {
    success: !retailerProduct ? false : true,
    retailerProductId: retailerProduct?.id,
  }

  return result
}

export default updateRetailerProductResolver
