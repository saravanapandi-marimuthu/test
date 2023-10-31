import { PrismaClient } from '../../../../../../../prisma/client'
import getFieldById from '../../../../../database/fields/getField'
import { EnterpriseField } from '../../../../generated/graphql'
import {
  mapPrismaEnterpriseItemToGraphqlEnterpriseItem,
  mapPrismaFieldToGraphqlField,
} from '../../../../mappers/fieldMappers'

const getFieldByIdResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<EnterpriseField> => {
  const prisma = context.prisma as PrismaClient

  const { id } = args.input

  const enterpriseField = await getFieldById(prisma, id)

  return {
    enterpriseItem: mapPrismaEnterpriseItemToGraphqlEnterpriseItem(
      enterpriseField.enterpriseItem,
    ),
    field: mapPrismaFieldToGraphqlField(enterpriseField.field),
  }
}

export default getFieldByIdResolver
