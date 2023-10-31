import { checkAuthentication } from '../../../../middleware/authorizationMiddleware'
import getAvailableUnitsOfMeasurementResolver from './getAvailableUnitsOfMeasurementResolver'
import getPaymentTermsResolver from './getPaymentTermsResolver'

export const configurationQueryResolvers = {
  getPaymentTerms: checkAuthentication()(async (root, args, context, info) => {
    return getPaymentTermsResolver(root, args, context, info)
  }),

  getAvailableUnitsOfMeasurement: checkAuthentication()(
    async (root, args, context, info) => {
      return getAvailableUnitsOfMeasurementResolver(root, args, context, info)
    },
  ),
}

export const configurationMutationResolvers = {}
