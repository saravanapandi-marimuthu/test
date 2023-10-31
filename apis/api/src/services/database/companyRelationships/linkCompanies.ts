import {
  CompanyRelationship,
  CompanyRelationshipDirection,
  CompanyRelationshipType,
  Prisma,
  UserAuditLogType,
} from '../../../../prisma/client'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import logAuditTrail from '../utilities/logAuditTrail'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { PrismaTransactionClient, TagLinkInput } from '../types/types'
import { CompanyRelationshipTypeEnum } from '../../../types'

export interface LinkCompaniesInput {
  firstCompanyId: string
  secondCompanyId: string
  relationshipType: CompanyRelationshipTypeEnum
  extendedProperties?: Prisma.JsonValue
  companyRelationshipTags?: TagLinkInput[]
}

const linkCompanies = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  input: LinkCompaniesInput,
): Promise<
  CompanyRelationship & {
    companyRelationshipType: CompanyRelationshipType
  }
> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    // Deconstruct input
    const {
      firstCompanyId,
      secondCompanyId,
      relationshipType,
      extendedProperties = undefined,
      companyRelationshipTags = undefined,
    } = input

    const existingCompanyRelationshipCount = await tx.companyRelationship.count(
      {
        where: {
          firstCompanyId: firstCompanyId,
          secondCompanyId: secondCompanyId,
          companyRelationshipType: {
            companyRelationshipTypeName: relationshipType.toLowerCase(),
          },
        },
      },
    )

    if (existingCompanyRelationshipCount > 0) {
      throw createServiceError({
        code: ERROR_CODES.COMPANY_RELATIONSHIP_ALREADY_EXISTS,
        data: {
          accountId: firstCompanyId,
          enterpriseId: secondCompanyId,
        },
      })
    }

    const createdCompanyRelationship = await tx.companyRelationship.create({
      data: {
        companyRelationshipType: {
          connect: {
            companyRelationshipTypeName: relationshipType.toLowerCase(),
          },
        },
        firstCompany: {
          connect: {
            id: firstCompanyId,
          },
        },
        secondCompany: {
          connect: {
            id: secondCompanyId,
          },
        },

        lastUpdatedBy: updatedByUserId,
        extendedProperties,
      },
    })

    // If companyRelationshipTags is available, get the tags based on the companyRelationshipTags input
    if (companyRelationshipTags) {
      const tags = await tx.tag.findMany({
        where: {
          OR: companyRelationshipTags.map(tag => ({
            tagName: tag.tagName,
            tagCategory: {
              tagCategoryName: tag.tagCategoryName,
            },
          })),
        },
      })

      // Create company tags
      await tx.companyRelationshipTag.createMany({
        data: tags.map(tag => ({
          companyRelationshipId: createdCompanyRelationship.id,
          tagId: tag.id,
          lastUpdatedBy: updatedByUserId,
        })),
      })
    }

    // Create related company from firstCompany to secondCompany
    await createRelatedCompany(
      tx,
      firstCompanyId,
      secondCompanyId,
      createdCompanyRelationship.id,
      relationshipType,
      CompanyRelationshipDirection.FIRST_TO_SECOND_COMPANY,
      updatedByUserId,
    )

    // Create related company from secondCompany to firstCompany
    await createRelatedCompany(
      tx,
      secondCompanyId,
      firstCompanyId,
      createdCompanyRelationship.id,
      relationshipType,
      CompanyRelationshipDirection.SECOND_TO_FIRST_COMPANY,
      updatedByUserId,
    )

    await logAuditTrail(
      tx,
      'CompanyRelationship',
      UserAuditLogType.CREATE,
      updatedByUserId,
      null,
      createdCompanyRelationship,
    )

    return createdCompanyRelationship
  })
}

async function createRelatedCompany(
  tx: PrismaTransactionClient,
  relatedCompanyIdOne: string,
  relatedCompanyIdTwo: string,
  companyRelationshipId: string,
  companyRelationshipType: CompanyRelationshipTypeEnum,
  companyRelationshipDirection: CompanyRelationshipDirection,
  updatedByUserId: string,
) {
  const result = await tx.relatedCompany.create({
    data: {
      companyRelationship: {
        connect: {
          id: companyRelationshipId,
        },
      },
      firstCompany: {
        connect: {
          id: relatedCompanyIdOne,
        },
      },
      secondCompany: {
        connect: {
          id: relatedCompanyIdTwo,
        },
      },
      companyRelationshipType: {
        connect: {
          companyRelationshipTypeName: companyRelationshipType.toLowerCase(),
        },
      },
      companyRelationshipDirection: companyRelationshipDirection,
      lastUpdatedBy: updatedByUserId,
    },
    include: {
      companyRelationship: true,
    },
  })
}

export default linkCompanies
