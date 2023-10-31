import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { buildPermission, Action, Resource } from '../../../../models/Action'
import {
  linkAccountToEnterpriseResolver,
  removeAccountLinkFromEnterpriseResolver,
} from './accountEnterpriseLinkResolver'
import createRelatedCompanyResolver from './createRelatedCompanyResolver'
import getRelatedCompaniesResolver from './getRelatedCompaniesResolver'
import getRelatedCompanyResolver from './getRelatedCompanyResolver'
import {
  linkCompaniesResolver,
  unlinkCompaniesResolver,
} from './linkCompaniesResolvers'

export const companyRelationshipQueryResolvers = {
  getRelatedCompanies: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getRelatedCompaniesResolver(root, args, context, info)
  }),

  getRelatedCompany: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getRelatedCompanyResolver(root, args, context, info)
  }),
}

export const companyRelationshipMutationResolvers = {
  linkCompanies: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return linkCompaniesResolver(root, args, context, info)
  }),

  unlinkCompanies: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return unlinkCompaniesResolver(root, args, context, info)
  }),

  linkAccountToEnterprise: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return linkAccountToEnterpriseResolver(root, args, context, info)
  }),

  removeAccountLinkFromEnterprise: checkAuthorization(
    [buildPermission(Action.Read, Resource.Customer)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return removeAccountLinkFromEnterpriseResolver(root, args, context, info)
  }),

  createRelatedCompany: checkAuthorization(
    [buildPermission(Action.Create, Resource.Customer)],
    args => args.input.providerCompanyId,
  )(async (root, args, context, info) => {
    return createRelatedCompanyResolver(root, args, context, info)
  }),
}
