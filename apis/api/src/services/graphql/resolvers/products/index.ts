import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { buildPermission, Action, Resource } from '../../../../models/Action'
import createRetailerProductResolver from './createRetailerProductResolver'
import getRetailerProductsResolver from './getRetailerProductsResolver'
import updateRetailerProductResolver from './updateRetailerProductResolver'

export const productQueryResolvers = {
  getRetailerProducts: checkAuthorization(
    [buildPermission(Action.Read, Resource.Product)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getRetailerProductsResolver(root, args, context, info)
  }),
}

export const productMutationResolvers = {
  createRetailerProduct: checkAuthorization(
    [buildPermission(Action.Create, Resource.Product)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return createRetailerProductResolver(root, args, context, info)
  }),

  updateRetailerProduct: checkAuthorization(
    [buildPermission(Action.Update, Resource.Product)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return updateRetailerProductResolver(root, args, context, info)
  }),
}
