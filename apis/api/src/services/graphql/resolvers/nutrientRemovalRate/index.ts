import { checkAuthorization } from '../../../../middleware/authorizationMiddleware'
import { Action, Resource, buildPermission } from '../../../../models/Action'
import { getNutrientRemovalRateResolver } from './getNutrientRemovalRateResolver'
import { getNutrientRemovalRatesResolver } from './getNutrientRemovalRatesResolver'

export const nutrientRemovalRateQueryResolvers = {
  getNutrientRemovalRate: checkAuthorization(
    [buildPermission(Action.Read, Resource.NutrientRemovalRate)],
    args => args.nutrientRemovalRateId,
  )(async (root, args, context, info) => {
    return getNutrientRemovalRateResolver(root, args, context, info)
  }),
  getNutrientRemovalRates: checkAuthorization(
    [buildPermission(Action.Read, Resource.NutrientRemovalRate)],
    args => args.companyId,

  )(async (root, args, context, info) => {
    return getNutrientRemovalRatesResolver(root, args, context, info)
  }),
}
