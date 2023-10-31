import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import { CompanyRelationshipTypeEnum } from '../../../../types'
import linkCompanies from '../../../database/companyRelationships/linkCompanies'
import unlinkCompanies from '../../../database/companyRelationships/unlinkCompanies'
import {
  LinkAccountToEnterpriseResult,
  RemoveAccountLinkFromEnterpriseResult,
} from '../../generated/graphql'
import { mapPrismaCompanyRelationshipToGraphqlCompanyRelationship } from '../../mappers/companyRelationshipMappers'

export const linkCompaniesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<LinkAccountToEnterpriseResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const {
    firstCompanyId,
    secondCompanyId,
    companyRelationshipType,
    companyRelationshipExtendedProperties,
    companyRelationshipTags,
  } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const linkedRelationship = await linkCompanies(prisma, updatedByUserId, {
    firstCompanyId,
    secondCompanyId,
    relationshipType: companyRelationshipType,
    extendedProperties: companyRelationshipExtendedProperties,
    companyRelationshipTags: companyRelationshipTags,
  })

  return {
    linkedRelationship:
      mapPrismaCompanyRelationshipToGraphqlCompanyRelationship(
        linkedRelationship,
      ),
  }
}

export const unlinkCompaniesResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<RemoveAccountLinkFromEnterpriseResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { firstCompanyId, secondCompanyId, companyRelationshipType } =
    args.input

  const { userId: updatedByUserId } = authenticatedUser

  const removedRelationship = await unlinkCompanies(
    prisma,
    updatedByUserId,
    firstCompanyId,
    secondCompanyId,
    companyRelationshipType,
  )

  return {
    removedRelationship:
      mapPrismaCompanyRelationshipToGraphqlCompanyRelationship(
        removedRelationship as any,
      ),
  }
}
