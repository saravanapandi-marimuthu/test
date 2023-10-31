import { PrismaClient } from '../../../../prisma/client'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import getTag from '../configurations/tags/getTag'
import {
  EnterpriseField,
  EnterpriseItemWithRelations,
  FieldWithRelations,
} from './types/fieldTypeExtensions'

export async function getEnterpriseFields(
  prisma: PrismaClient,
  companyId: string,
): Promise<EnterpriseField[]> {
  // Get Tag Id for Field under Enterprise Item Type
  const enterpriseItemTag = await getTag(
    prisma,
    'enterprise item type',
    'field',
  )

  // Get all EnterpriseItems for the given companyId and itemTypeId as enterpriseItemTag.id
  const enterpriseItems: EnterpriseItemWithRelations[] =
    await prisma.enterpriseItem.findMany({
      where: {
        companyId: companyId,
        itemTypeId: enterpriseItemTag.id,
      },
      include: {
        itemType: {
          include: {
            tagCategory: true,
          },
        },

        billingSplitGroup: {
          include: {
            splitGroupAccounts: {
              include: {
                accountCompany: true,
              },
            },
            splitItems: {
              include: {
                accountSplitAllocations: true,
              },
            },
            defaultSplitItem: {
              include: {
                accountSplitAllocations: true,
                childSplitItems: {
                  include: {
                    accountSplitAllocations: true,
                  },
                },
              },
            },
          },
        },
      },
    })

  if (!enterpriseItems.length) {
    return []
  }

  // Fetch the corresponding Fields for the fetched EnterpriseItems
  const fieldIds = enterpriseItems.map(item => item.itemId)
  const fields: FieldWithRelations[] = await prisma.field.findMany({
    where: {
      id: {
        in: fieldIds,
      },
    },
    include: {
      fieldTags: {
        include: {
          tag: {
            include: {
              tagCategory: true,
            },
          },
        },
      },
      fieldVersions: {
        include: {
          fieldLayers: {
            include: {
              fieldLayerZones: {
                include: {
                  geoLocation: true,
                },
              },
            },
          },
        },
      },
      geoLocation: true,
    },
  })

  // Map EnterpriseItems to their corresponding Fields
  return enterpriseItems.map(item => {
    const correspondingField = fields.find(field => field.id === item.itemId)
    if (!correspondingField) {
      throw createServiceError({
        code: ERROR_CODES.FIELD_NOT_FOUND,
        data: {
          fieldId: item.itemId,
        },
      })
    }
    return {
      enterpriseItem: item,
      field: correspondingField,
    }
  })
}
