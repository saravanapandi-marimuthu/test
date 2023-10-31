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

export const linkAccountToEnterpriseResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<LinkAccountToEnterpriseResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { accountCompanyId, enterpriseCompanyId, extendedProperties } =
    args.input

  const { userId: updatedByUserId } = authenticatedUser

  const linkedRelationship = await linkCompanies(prisma, updatedByUserId, {
    firstCompanyId: accountCompanyId,
    secondCompanyId: enterpriseCompanyId,
    relationshipType: CompanyRelationshipTypeEnum.ENTERPRISE_OWNER,
    extendedProperties,
  })

  return {
    linkedRelationship:
      mapPrismaCompanyRelationshipToGraphqlCompanyRelationship(
        linkedRelationship,
      ),
  }
}

export const removeAccountLinkFromEnterpriseResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<RemoveAccountLinkFromEnterpriseResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const { accountCompanyId, enterpriseCompanyId } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const removedRelationship = await unlinkCompanies(
    prisma,
    updatedByUserId,
    accountCompanyId,
    enterpriseCompanyId,
    CompanyRelationshipTypeEnum.ENTERPRISE_OWNER,
  )

  return {
    removedRelationship:
      mapPrismaCompanyRelationshipToGraphqlCompanyRelationship(
        removedRelationship as any,
      ),
  }
}
