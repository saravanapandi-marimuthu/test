import { PrismaClient } from '../../../../../prisma/client'
import { AuthenticatedUser } from '../../../../models/AuthenticatedUser'
import createRelatedCompany from '../../../database/companyRelationships/createRelatedCompany'
import { CreateRelatedCompanyInput } from '../../../database/companyRelationships/types/companyRelationshipTypeExtensions'
import { CreateRelatedCompanyResult } from '../../generated/graphql'
import { mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship } from '../../mappers/companyRelationshipMappers'

const createdRelatedCompanyResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<CreateRelatedCompanyResult> => {
  const prisma = context.prisma as PrismaClient

  const authenticatedUser = context.user as AuthenticatedUser

  const {
    providerCompanyId,
    companyName,
    companyTypeName,
    companyRelationshipType,
    companyAddress,
    companyPhoneNumber,
    contactPerson,
    companyExtendedProperties,
    companyTags,
    companyNotes,
    companyRelationshipTags,
    companyRelationshipExtendedProperties,
  } = args.input

  const { userId: updatedByUserId } = authenticatedUser

  const input: CreateRelatedCompanyInput = {
    providerCompanyId,
    companyName,
    companyTypeName,
    companyAddress,
    companyPhoneNumber,
    contactPerson,
    companyExtendedProperties,
    companyTags,
    companyNotes,
    companyRelationshipExtendedProperties,
    companyRelationshipTags,
    companyRelationshipType,
  }

  const createdRelationship = await createRelatedCompany(
    prisma,
    updatedByUserId,
    input,
  )

  return {
    relatedCompany:
      mapPrismaCompanyRelationshipWithRelationsToGraphqlCompanyRelationship(
        createdRelationship,
      ),
  }
}

export default createdRelatedCompanyResolver
