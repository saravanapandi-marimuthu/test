import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { buildPermission, Action, Resource } from '../../../../models/Action'
import getEnterpriseItemsForCompanyResolver from './_services/getAccountEnterpriseItemsResolver'
import createFieldResolver from './fields/_services/createFieldResolver'
import getFieldByIdResolver from './fields/_services/getFieldByIdResolver'
import getFieldsForCompanyResolver from './fields/_services/getFieldsForCompanyResolver'

export const enterpriseItemsQueryResolvers = {
  getAccountEnterpriseItems: checkAuthorization(
    [buildPermission(Action.Read, Resource.Field)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return getEnterpriseItemsForCompanyResolver(root, args, context, info)
  }),

  getField: checkAuthorization(
    [buildPermission(Action.Read, Resource.Field)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return getFieldByIdResolver(root, args, context, info)
  }),

  getFieldsForCompany: checkAuthorization(
    [buildPermission(Action.Read, Resource.Field)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    return getFieldsForCompanyResolver(root, args, context, info)
  }),
}

export const enterpriseItemsMutationResolvers = {
  createField: checkAuthorization(
    [buildPermission(Action.Create, Resource.Field)],
    args => args.input.companyId,
  )(async (root, args, context, info) => {
    console.log('enterpriseItemsMutationResolvers - createField')
    return createFieldResolver(root, args, context, info)
  }),
}
