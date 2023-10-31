import { PrismaClient } from '../../../../../prisma/client'
import getRelatedCompanies from '../../../database/companyRelationships/getRelatedCompanies'
import { GetRelatedCompaniesResult } from '../../generated/graphql'
import { mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship } from '../../mappers/companyRelationshipMappers'

const getRelatedCompaniesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<GetRelatedCompaniesResult> => {
  const prisma = context.prisma as PrismaClient

  const {
    companyId,
    page = 0,
    perPage = 10,
    searchTerm,
    sort,
    relationshipType,
    filters,
    tagFilters,
  } = args

  const result = await getRelatedCompanies(prisma, {
    companyId,
    relationshipType,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
    tagFilters,
  })

  return {
    relatedCompanies: result.relatedCompanies.map(customer =>
      mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship(
        customer,
      ),
    ),
    totalCount: result.totalCount,
  }
}

export default getRelatedCompaniesResolver
