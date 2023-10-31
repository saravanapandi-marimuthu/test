import { Resolvers } from './generated/graphql'

import * as path from 'path'
import { readFileSync } from 'fs'
import { checkAuthorization } from '../../middleware/authorizationMiddleware'
import { Action, Resource, buildPermission } from '../../models/Action'
import { userMutationResolvers, userQueryResolvers } from './resolvers/users'
import { tagMutationResolvers, tagQueryResolvers } from './resolvers/tags'
import {
  warehouseMutationResolvers,
  warehouseQueryResolvers,
} from './resolvers/warehouses'
import {
  manufacturerMutationResolvers,
  manufacturerQueryResolvers,
} from './resolvers/manufacturers'
import {
  productMutationResolvers,
  productQueryResolvers,
} from './resolvers/products'
import {
  companyRelationshipMutationResolvers,
  companyRelationshipQueryResolvers,
} from './resolvers/companyRelationship'
import {
  companyMutationResolvers,
  companyQueryResolvers,
} from './resolvers/companies'
import {
  configurationMutationResolvers,
  configurationQueryResolvers,
} from './resolvers/configurations'
import {
  enterpriseItemsQueryResolvers,
  enterpriseItemsMutationResolvers,
} from './resolvers/enterpriseItems'
import {
  storageLocationMutationResolvers,
  storageLocationQueryResolvers,
} from './resolvers/storageLocations'
import { nutrientRemovalRateQueryResolvers } from './resolvers/nutrientRemovalRate'
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const fileNames = [
  'configurations',
  'shared',
  'users',
  'companies',
  'companyRelationships',
  'products',
  'inputs',
  'results',
  'tagCategories',
  'tags',
  'warehouses',
  'queries',
  'mutations',
  'fields',
  'enterpriseItems',
  'storageLocations',
  'nutrientRemovalRate',
]

const typeDefsArray = fileNames.map(fileName => {
  return readFileSync(path.join(__dirname, `./types/${fileName}.graphql`), {
    encoding: 'utf-8',
  })
})

export const typeDefs = `#graphql\n  ${typeDefsArray.join('\n  ')}`

// Resolvers define how to fetch the types defined in your schema.
export const resolvers: Resolvers = {
  Query: {
    ...userQueryResolvers,

    ...companyQueryResolvers,

    ...tagQueryResolvers,

    ...warehouseQueryResolvers,

    ...manufacturerQueryResolvers,

    ...productQueryResolvers,

    ...companyRelationshipQueryResolvers,

    ...enterpriseItemsQueryResolvers,

    ...configurationQueryResolvers,
    
    ...storageLocationQueryResolvers,
    
    ...nutrientRemovalRateQueryResolvers,

    /*
    getCustomers: checkAuthorization(
      [buildPermission(Action.Read, Resource.Customer)],
      args => args.companyId,
    )(async (root, args, context, info) => {
      return getCustomersResolver(root, args, context, info)
    }),

    getCustomer: checkAuthorization(
      [buildPermission(Action.Read, Resource.Customer)],
      args => args.providerCompanyId,
    )(async (root, args, context, info) => {
      return getCustomerResolver(root, args, context, info)
    }),
    */
  },

  Mutation: {
    ...userMutationResolvers,

    ...companyMutationResolvers,

    ...tagMutationResolvers,

    ...warehouseMutationResolvers,

    ...manufacturerMutationResolvers,

    ...productMutationResolvers,

    ...companyRelationshipMutationResolvers,

    ...configurationMutationResolvers,

    ...enterpriseItemsMutationResolvers,

    ...storageLocationMutationResolvers,

    /*
    createCustomer: checkAuthorization(
      [
        buildPermission(Action.Create, Resource.Customer),
        buildPermission(Action.Create, Resource.User),
      ],
      args => args.input.providerCompanyId,
    )(async (root, args, context, info) => {
      return createCustomerResolver(root, args, context, info)
    }),
    */
  },
}
