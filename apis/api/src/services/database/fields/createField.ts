import { BillingSplitValueType } from '../../../../prisma/client'
import { createServiceError } from '../../errors/errorFactory'
import { ERROR_CODES } from '../../errors/errorsRegistry'
import getTag from '../configurations/tags/getTag'
import getTags from '../configurations/tags/getTags'
import { PrismaTransactionClient } from '../types/types'
import { executePrismaActionWithTransaction } from '../utilities/executePrismaAction'
import createSplitGroup from './createSplitGroup'
import getFieldById from './getField'
import { CreateFieldInput, EnterpriseField } from './types/fieldTypeExtensions'
import {
  groupBillingBySplitTier,
  isBillingSplitGroupValid,
} from './utilities/billingBySplitTierUtility'

const createField = (
  prisma: PrismaTransactionClient,
  createdByUserId: string,
  input: CreateFieldInput,
): Promise<EnterpriseField> => {
  const {
    enterpriseCompanyId,
    fieldName,
    plssLocation,
    plssLocationState,
    gpsCoordinates,
    fieldTags = [],
    estimatedArea,
    fieldBoundaryData,
    billingSplitGroupName,
    billingSplits = [],
    notes = undefined,
  } = input

  // Group billing splits by split tier where split tiers with the same tagCategoryName and tagName are grouped together
  const billingSplitsByTier = groupBillingBySplitTier(billingSplits)

  if (!isBillingSplitGroupValid(billingSplitsByTier)) {
    throw createServiceError({
      code: ERROR_CODES.INVALID_BILLING_SPLIT_GROUP,
      data: {
        billingSplits,
      },
    })
  }

  return executePrismaActionWithTransaction(prisma, async tx => {
    // To create a new field, check if the field name already exists
    const existingField = await tx.field.findUnique({
      where: {
        companyId_fieldName: {
          companyId: enterpriseCompanyId,
          fieldName,
        },
      },
    })

    if (existingField) {
      throw createServiceError({
        code: ERROR_CODES.FIELD_ALREADY_EXISTS,
        data: {
          fieldName,
        },
      })
    }

    const tags = await getTags(tx, fieldTags)
    const fieldTagsData = tags.map(tag => ({
      tagId: tag.id,
      lastUpdatedBy: createdByUserId,
    }))

    // Get Tag Id for Field under Enterprise Item Type
    const enterpriseItemTag = await getTag(tx, 'Enterprise Item Type', 'Field')

    const fieldBoundaryLayerType = await getTag(
      tx,
      'Field Layer Type',
      'Field Boundary',
    )

    // Create the field
    const newField = await tx.field.create({
      data: {
        fieldName,
        notes,
        plssLocation,
        plssLocationState,
        company: {
          connect: {
            id: enterpriseCompanyId,
          },
        },
        fieldTags: {
          create: fieldTagsData,
        },
        lastUpdatedBy: createdByUserId,
        geoLocation: gpsCoordinates && {
          connectOrCreate: {
            where: {
              latitude_longitude: {
                latitude: gpsCoordinates.latitude,
                longitude: gpsCoordinates.longitude,
              },
            },
            create: {
              latitude: gpsCoordinates.latitude,
              longitude: gpsCoordinates.longitude,
              lastUpdatedBy: createdByUserId,
            },
          },
        },

        fieldVersions: {
          create: {
            active: true,
            startDate: new Date(),
            estimatedArea,
            lastUpdatedBy: createdByUserId,
            fieldLayers: {
              create: [
                {
                  lastUpdatedBy: createdByUserId,
                  manuallyGenerated: true,
                  layerTypeId: fieldBoundaryLayerType.id,
                  layerName: 'Initial Field Boundary',
                  geoJsonData: fieldBoundaryData,
                },
              ],
            },
          },
        },
      },
    })

    const splitGroup = await createSplitGroup(
      tx,
      createdByUserId,
      billingSplitGroupName,
      billingSplitsByTier,
    )

    // Create Enterprise Item
    const newEnterpriseItem = await tx.enterpriseItem.create({
      data: {
        lastUpdatedBy: createdByUserId,
        company: {
          connect: {
            id: enterpriseCompanyId,
          },
        },
        itemType: {
          connect: {
            id: enterpriseItemTag.id,
          },
        },
        itemId: newField.id,
        billingSplitGroup: {
          connect: {
            id: splitGroup.id,
          },
        },
      },
    })

    return getFieldById(tx, newField.id)
  })
}

export default createField
