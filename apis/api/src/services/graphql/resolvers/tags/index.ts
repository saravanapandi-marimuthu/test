import {
  checkAuthentication,
  checkAuthorization,
} from '../../../../middleware/authorizationMiddleware'
import { Action, Resource, buildPermission } from '../../../../models/Action'
import createTagCategoryResolver from './createTagCategoryResolver'
import createTagResolver from './createTagResolver'
import getTagCategoriesResolver from './getTagCategoriesResolver'
import getTagCategoryResolver from './getTagCategoryResolver'
import getTagResolver from './getTagResolver'
import getTagsResolver from './getTagsResolver'
import updateTagCategoryResolver from './updateTagCategoryResolver'
import updateTagResolver from './updateTagResolver'

export const tagQueryResolvers = {
  getTagCategories: checkAuthentication()(async (root, args, context, info) => {
    return getTagCategoriesResolver(root, args, context, info)
  }),

  getTagCategory: checkAuthentication()(async (root, args, context, info) => {
    return getTagCategoryResolver(root, args, context, info)
  }),

  getTags: checkAuthentication()(async (root, args, context, info) => {
    return getTagsResolver(root, args, context, info)
  }),

  getTag: checkAuthentication()(async (root, args, context, info) => {
    return getTagResolver(root, args, context, info)
  }),
}

export const tagMutationResolvers = {
  createTagCategory: checkAuthorization(
    [buildPermission(Action.Create, Resource.Configuration)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return createTagCategoryResolver(root, args, context, info)
  }),

  createTag: checkAuthorization(
    [buildPermission(Action.Create, Resource.Configuration)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return createTagResolver(root, args, context, info)
  }),

  updateTagCategory: checkAuthentication()(
    async (root, args, context, info) => {
      return updateTagCategoryResolver(root, args, context, info)
    },
  ),

  updateTag: checkAuthentication()(async (root, args, context, info) => {
    return updateTagResolver(root, args, context, info)
  }),
}
