import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { buildPermission, Action, Resource } from '../../../../models/Action'
import createStorageLocationResolver from './createStorageLocationResolver'
import getStorageLocationByIdResolver from './getStorageLocationByIdResolver'
import getStorageLocationsResolver from './getStorageLocationsResolver'
import updateStorageLocationResolver from './updateStorageLocationResolver'

export const storageLocationQueryResolvers = {
  getStorageLocations: checkAuthorization(
    [buildPermission(Action.Read, Resource.StorageLocation)],
    args => args.storageLocationId,
  )(async (root, args, context, info) => {
    return getStorageLocationsResolver(root, args, context, info)
  }),

  getStorageLocationById: checkAuthorization(
    [buildPermission(Action.Read, Resource.StorageLocation)],
    args => args.id,
  )(async (root, args, context, info) => {
    return getStorageLocationByIdResolver(root, args, context, info)
  }),
}

export const storageLocationMutationResolvers = {
  createStorageLocation: checkAuthorization(
    [buildPermission(Action.Create, Resource.StorageLocation)],
    args => args.input.storageLocationId,
  )(async (root, args, context, info) => {
    return createStorageLocationResolver(root, args, context, info)
  }),

  updateStorageLocation: checkAuthorization(
    [buildPermission(Action.Update, Resource.StorageLocation)],
    args => args.input.storageLocationId,
  )(async (root, args, context, info) => {
    return updateStorageLocationResolver(root, args, context, info)
  }),
}
