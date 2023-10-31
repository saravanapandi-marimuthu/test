import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { Action, Resource, buildPermission } from '../../../../models/Action'
import getManufacturerProductsResolver from './getManufacturerProductsResolver'
import getManufacturersResolver from './getManufacturersResolver'

export const manufacturerQueryResolvers = {
  getManufacturers: checkAuthorization(
    [buildPermission(Action.Read, Resource.Manufacturer)],
    args => args.providerCompanyId,
  )(async (root, args, context, info) => {
    return getManufacturersResolver(root, args, context, info)
  }),

  getManufacturerProducts: checkAuthorization(
    [buildPermission(Action.Read, Resource.Product)],
    args => args.providerCompanyId,
  )(async (root, args, context, info) => {
    return getManufacturerProductsResolver(root, args, context, info)
  }),
}

export const manufacturerMutationResolvers = {}
