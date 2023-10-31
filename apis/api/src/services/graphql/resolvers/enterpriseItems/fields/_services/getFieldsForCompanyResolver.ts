import { PrismaClient } from '../../../../../../../prisma/client'
import { getEnterpriseFields } from '../../../../../database/fields/getEnterpriseFields'
import { EnterpriseField } from '../../../../generated/graphql'
import {
  mapPrismaEnterpriseItemToGraphqlEnterpriseItem,
  mapPrismaFieldToGraphqlField,
} from '../../../../mappers/fieldMappers'

const getFieldsForCompany = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<EnterpriseField[]> => {
  const prisma = context.prisma as PrismaClient

  const { companyId } = args.input

  const enterpriseFields = await getEnterpriseFields(prisma, companyId)

  return enterpriseFields.map(enterpriseField => {
    return {
      enterpriseItem: mapPrismaEnterpriseItemToGraphqlEnterpriseItem(
        enterpriseField.enterpriseItem,
      ),
      field: mapPrismaFieldToGraphqlField(enterpriseField.field),
    }
  })
}

export default getFieldsForCompany
