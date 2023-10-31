import { PrismaClient } from '../../../../../prisma/client'
import getRelatedCompany from '../../../database/companyRelationships/getRelatedCompany'
import { GetRelatedCompanyResult } from '../../generated/graphql'
import { mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship } from '../../mappers/companyRelationshipMappers'

const getRelatedCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetRelatedCompanyResult> => {
  const prisma = context.prisma as PrismaClient

  const { companyId, relatedCompanyId, companyRelationshipType } = args

  const result = await getRelatedCompany(prisma, {
    companyId,
    relatedCompanyId,
    companyRelationshipType,
  })

  return {
    relatedCompany:
      mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship(
        result,
      ),
  }
}

export default getRelatedCompanyResolver
