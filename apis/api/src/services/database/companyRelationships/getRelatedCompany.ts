import { Prisma, PrismaClient } from '../../../../prisma/client'
import { CompanyRelationshipTypeEnum } from '../../../types'
import { RelatedCompanyWithRelations } from './types/companyRelationshipTypeExtensions'

export interface GetCompanyWithRelationshipInput {
  companyId: string
  relatedCompanyId?: string
  companyRelationshipType: CompanyRelationshipTypeEnum
}

const getRelatedCompany = async (
  prisma: PrismaClient,
  input: GetCompanyWithRelationshipInput,
): Promise<RelatedCompanyWithRelations | null> => {
  const {
    companyId,
    relatedCompanyId,
    companyRelationshipType: relationshipType,
  } = input

  const where: Prisma.RelatedCompanyWhereInput = {
    secondCompanyId: companyId,
    firstCompanyId: relatedCompanyId,
    companyRelationshipType: {
      companyRelationshipTypeName: relationshipType.toLowerCase(),
    },
  }

  const relatedCompany = await prisma.relatedCompany.findFirst({
    where: where,
    include: {
      companyRelationship: {
        include: {
          companyRelationshipTags: {
            include: {
              tag: {
                include: {
                  tagCategory: true,
                },
              },
            },
          },
          // Include additional user information (like addresses)
        },
      },
      companyRelationshipType: true,
      secondCompany: {
        include: {
          companyType: true,
          addresses: {
            include: {
              address: true,
            },
          },
          companyTags: {
            include: {
              tag: {
                include: {
                  tagCategory: true,
                },
              },
            },
          },
          phoneNumbers: true,
          roles: {
            where: { role: { roleName: { equals: 'Contact' } } },
            include: {
              user: true,
              role: true,
            },
          },
        },
      },
    },
  })

  return relatedCompany
}

export default getRelatedCompany
