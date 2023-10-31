import { PrismaClient } from '../../../../prisma/client'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import getTag from '../configurations/tags/getTag'
import { PrismaTransactionClient } from '../types/types'
import {
  EnterpriseField,
  EnterpriseItemWithRelations,
  FieldWithRelations,
} from './types/fieldTypeExtensions'

export default async function getFieldById(
  prisma: PrismaTransactionClient,
  fieldId: number,
): Promise<EnterpriseField> {
  // Get Tag Id for Field under Enterprise Item Type
  const enterpriseItemTag = await getTag(
    prisma,
    'enterprise item type',
    'field',
  )

  // Get EnterpriseItem with itemId as fieldId and itemTypeId as enterpriseItemTag.id
  const enterpriseItem: EnterpriseItemWithRelations =
    await prisma.enterpriseItem.findUnique({
      where: {
        itemId_itemTypeId: {
          itemId: fieldId,
          itemTypeId: enterpriseItemTag.id,
        },
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

  if (!enterpriseItem) {
    throw createServiceError({
      code: ERROR_CODES.FIELD_NOT_FOUND,
      data: {
        fieldId,
      },
    })
  }

  // Get Field with id as fieldId
  const field: FieldWithRelations = await prisma.field.findUnique({
    where: {
      id: fieldId,
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

  return {
    enterpriseItem,
    field,
  }
}
