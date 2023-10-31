import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { Action, Resource, buildPermission } from '../../../../models/Action'
import createWarehouseResolver from './createWarehouseResolver'
import deleteWarehousesResolver from './deleteWarehousesResolvers'
import getWarehouseInfoResolver from './getWarehouseInfo'
import getWarehousesForCompanyResolver from './getWarehousesForCompanyResolver'
import updateWarehouseResolver from './updateWarehouseResolver'

export const warehouseQueryResolvers = {
  getWarehousesForCompany: checkAuthorization(
    [buildPermission(Action.Read, Resource.Warehouse)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return getWarehousesForCompanyResolver(root, args, context, info)
  }),

  getWarehouseInfo: checkAuthorization(
    [buildPermission(Action.Read, Resource.Warehouse)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return getWarehouseInfoResolver(root, args, context, info)
  }),
}

export const warehouseMutationResolvers = {
  updateWarehouse: checkAuthorization(
    [buildPermission(Action.Update, Resource.Warehouse)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return updateWarehouseResolver(root, args, context, info)
  }),

  createWarehouse: checkAuthorization(
    [buildPermission(Action.Create, Resource.Warehouse)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return createWarehouseResolver(root, args, context, info)
  }),

  deleteWarehouses: checkAuthorization(
    [buildPermission(Action.Delete, Resource.Warehouse)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return deleteWarehousesResolver(root, args, context, info)
  }),
}
