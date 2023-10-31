import {
  CompanyRelationship,
  UserAuditLogType,
} from '../../../../prisma/client'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import logAuditTrail from '../utilities/logAuditTrail'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import { PrismaTransactionClient } from '../types/types'
import { CompanyRelationshipTypeEnum } from '../../../types'

/**
 * Removes the account link from the enterprise
 * @param prisma PrismaTransactionClient
 * @param firstCompanyId  The company Id of account linked to enterprise
 * @param secondCompanyId The company Id of enterprise
 * @param updatedByUserId  The user Id of the user performing the action
 */
const unlinkCompanies = async (
  prisma: PrismaTransactionClient,
  updatedByUserId: string,
  firstCompanyId: string,
  secondCompanyId: string,
  companyRelationshipType: CompanyRelationshipTypeEnum,
): Promise<CompanyRelationship | undefined> => {
  return executePrismaActionWithTransaction(prisma, async tx => {
    const existingCompanyRelationship = await tx.relatedCompany.findFirst({
      where: {
        firstCompanyId: secondCompanyId,
        secondCompanyId: firstCompanyId,
        companyRelationshipType: {
          companyRelationshipTypeName: companyRelationshipType.toLowerCase(),
        },
      },
    })

    if (!existingCompanyRelationship) {
      throw createServiceError({
        code: ERROR_CODES.COMPANY_RELATIONSHIP_DOES_NOT_EXIST,
        data: {
          accountId: firstCompanyId,
          enterpriseId: secondCompanyId,
        },
      })
    }

    await tx.relatedCompany.deleteMany({
      where: {
        companyRelationshipId:
          existingCompanyRelationship.companyRelationshipId,
      },
    })

    const deletedCompanyRelationship = await tx.companyRelationship.delete({
      where: {
        id: existingCompanyRelationship.companyRelationshipId,
      },
    })

    await logAuditTrail(
      tx,
      'CompanyRelationship',
      UserAuditLogType.DELETE,
      updatedByUserId,
      deletedCompanyRelationship as any,
      null,
    )

    return deletedCompanyRelationship
  })
}

export default unlinkCompanies
