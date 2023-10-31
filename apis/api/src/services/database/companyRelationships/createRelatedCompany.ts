import { CompanyRelationshipDirection } from '../../../../prisma/client'
import createCompany from '../companies/createCompany'
import {
  CreateRelatedCompanyInput,
  RelatedCompanyWithRelations,
} from './types/companyRelationshipTypeExtensions'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import linkCompanies from './linkCompanies'

const createRelatedCompany = async (
  prisma: PrismaTransactionClient,
  updatedUserId: string,
  input: CreateRelatedCompanyInput,
): Promise<RelatedCompanyWithRelations> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    // Deconstruct input
    const {
      providerCompanyId,
      companyName,
      companyTypeName,
      companyRelationshipType,
      parentCompanyId,
      companyAddress,
      companyPhoneNumber,
      contactPerson,
      companyExtendedProperties,
      companyTags,
      companyRelationshipExtendedProperties,
      companyRelationshipTags,
      companyNotes,
    } = input

    const newCompany = await createCompany(tx, updatedUserId, {
      companyName,
      companyTypeName,
      parentCompanyId,
      companyAddress,
      companyPhoneNumber,
      contactPerson,
      companyExtendedProperties,
      companyTags,
      companyNotes,
    })

    // Link companies
    const linkedCompany = await linkCompanies(tx, updatedUserId, {
      firstCompanyId: providerCompanyId,
      secondCompanyId: newCompany.id,
      relationshipType: companyRelationshipType,
      extendedProperties: companyRelationshipExtendedProperties,
      companyRelationshipTags,
    })

    const relatedCompany = await tx.relatedCompany.findUnique({
      where: {
        firstCompanyId_secondCompanyId_companyRelationshipTypeId_companyRelationshipDirection_companyRelationshipId:
          {
            firstCompanyId: linkedCompany.firstCompanyId,
            secondCompanyId: linkedCompany.secondCompanyId,
            companyRelationshipTypeId: linkedCompany.companyRelationshipTypeId,
            companyRelationshipDirection:
              CompanyRelationshipDirection.FIRST_TO_SECOND_COMPANY,
            companyRelationshipId: linkedCompany.id,
          },
      },

      include: {
        companyRelationshipType: true,
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
        secondCompany: {
          include: {
            companyType: true,
            addresses: {
              include: {
                address: true,
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
  })
}

export default createRelatedCompany
