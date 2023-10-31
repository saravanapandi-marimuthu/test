import { PrismaClient } from '../../../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../../../models/AuthenticatedUser'
import createField from '../../../../../database/fields/createField'
import { EnterpriseField } from '../../../../generated/graphql'
import {
  mapPrismaEnterpriseItemToGraphqlEnterpriseItem,
  mapPrismaFieldToGraphqlField,
} from '../../../../mappers/fieldMappers'

const createFieldResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<EnterpriseField> => {
  const prisma = context.prisma as PrismaClient
  const authenticatedUser = context.user as AuthenticatedUser

  console.log('createFieldResolver', JSON.stringify(args.input))

  const enterpriseField = await createField(
    prisma,
    authenticatedUser.userId,
    args.input,
  )

  console.log(
    'createFieldResolver - created field',
    JSON.stringify(enterpriseField),
  )

  return {
    enterpriseItem: mapPrismaEnterpriseItemToGraphqlEnterpriseItem(
      enterpriseField.enterpriseItem,
    ),
    field: mapPrismaFieldToGraphqlField(enterpriseField.field),
  }
}

export default createFieldResolver
