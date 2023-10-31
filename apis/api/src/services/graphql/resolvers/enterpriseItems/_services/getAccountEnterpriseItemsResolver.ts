import {
  CompanyRelationshipType,
  PrismaClient,
} from '../../../../../../prisma/client'
import getRelatedCompanies from '../../../../database/companyRelationships/getRelatedCompanies'
import { EnterpriseField as PrismaEnterPriseField } from '../../../../database/fields/types/fieldTypeExtensions'
import { EnterpriseField } from '../../../generated/graphql'
import { getEnterpriseFields } from '../../../../database/fields/getEnterpriseFields'
import {
  mapPrismaEnterpriseItemToGraphqlEnterpriseItem,
  mapPrismaFieldToGraphqlField,
} from '../../../mappers/fieldMappers'
import { CompanyRelationshipTypeEnum } from '../../../../../types'

const getEnterpriseItemsForCompany = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<EnterpriseField[]> => {
  const prisma = context.prisma as PrismaClient

  const { companyId, accountId } = args.input

  const relatedCompanies = await getRelatedCompanies(prisma, {
    companyId: accountId,
    relationshipType: CompanyRelationshipTypeEnum.ENTERPRISE_OWNER,
    page: 0,
    perPage: 10,
  })

  const allFields: PrismaEnterPriseField[] = []

  for (let i = 0; i < relatedCompanies.relatedCompanies.length; i++) {
    const company = relatedCompanies.relatedCompanies[i]
    const enterpriseFields = await getEnterpriseFields(
      prisma,
      company.secondCompanyId,
    )
    allFields.push(...enterpriseFields)
  }

  const result = allFields.map(enterpriseField => {
    return {
      enterpriseItem: mapPrismaEnterpriseItemToGraphqlEnterpriseItem(
        enterpriseField.enterpriseItem,
      ),
      field: mapPrismaFieldToGraphqlField(enterpriseField.field),
    }
  })

  return result
}

export default getEnterpriseItemsForCompany
