import {
  checkAuthentication,
  checkAuthorization,
} from '../../../../middleware/authorizationMiddleware'
import { buildPermission, Action, Resource } from '../../../../models/Action'
import createCompanyResolver from './createCompanyResolver'
import getAllCompanyTypesResolver from './getAllCompanyTypesResolver'
import getAvailableRolesResolver from './getAvailableRolesResolver'
import getCompaniesResolver from './getCompaniesResolver'
import getCompanyOrCreateResolver from './getCompanyOrCreateResolver'
import getCompanyResolver from './getCompanyResolver'
import getSubsidiaryCompaniesResolver from './getSubsidiaryCompaniesResolver'
import getSubsidiaryCompaniesTreeResolver from './getSubsidiaryCompaniesTreeResolver'

export const companyQueryResolvers = {
  getAvailableRoles: checkAuthentication()(
    async (root, args, context, info) => {
      return getAvailableRolesResolver(root, args, context, info)
    },
  ),

  getCompanyOrCreate: checkAuthorization(
    [buildPermission(Action.Create, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getCompanyOrCreateResolver(root, args, context, info)
  }),

  getCompanies: checkAuthorization(
    [buildPermission(Action.Read, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getCompaniesResolver(root, args, context, info)
  }),

  getSubsidiaryCompanies: checkAuthorization(
    [buildPermission(Action.Read, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getSubsidiaryCompaniesResolver(root, args, context, info)
  }),

  getSubsidiaryCompaniesTree: checkAuthorization(
    [buildPermission(Action.Read, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getSubsidiaryCompaniesTreeResolver(root, args, context, info)
  }),

  getCompany: checkAuthorization(
    [buildPermission(Action.Read, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return getCompanyResolver(root, args, context, info)
  }),

  getAllCompanyTypes: checkAuthentication()(
    async (root, args, context, info) => {
      return getAllCompanyTypesResolver(root, args, context, info)
    },
  ),
}

export const companyMutationResolvers = {
  createCompany: checkAuthorization(
    [buildPermission(Action.Create, Resource.Company)],
    args => args.companyId,
  )(async (root, args, context, info) => {
    return createCompanyResolver(root, args, context, info)
  }),
}
