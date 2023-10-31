import { BillingSplitValueType } from '../../../../prisma/client'
import getTag from '../configurations/tags/getTag'
import { PrismaTransactionClient } from '../types/types'
import { BillingSplitInput } from './types/fieldTypeExtensions'

/**
 * Create Split Group
 * Each split group has associated accounts
 * Split group has a root BillingSplitItem that defines the default split at Enterprise Item level
 * Each BillingSplitItem has split percentages for each account in the split group that adds up to 100%
 * @param tx
 * @param createdByUserId
 * @param billingSplitGroupName
 * @param billingSplitsByTier
 * @returns
 */
const createSplitGroup = async (
  tx: PrismaTransactionClient,
  createdByUserId: string,
  billingSplitGroupName: string,
  billingSplitsByTier: {
    [key: string]: BillingSplitInput[]
  },
) => {
  const splitGroup = await tx.billingSplitGroup.create({
    data: {
      lastUpdatedBy: createdByUserId,
      splitGroupName: billingSplitGroupName || 'Default Split Group',
    },
  })

  let firstIndex = true
  let billingSplitGroupAccounts: Record<string, number> = {}

  for (const key in billingSplitsByTier) {
    const group = billingSplitsByTier[key]

    const splitTier = group[0].splitTier

    const splitTierTag = await getTag(
      tx,
      splitTier.tagCategoryName,
      splitTier.tagName,
    )

    const splitItem = await tx.billingSplitItem.create({
      data: {
        splitGroupId: splitGroup.id,
        splitTierId: splitTierTag.id,
      },
    })

    for (const split of billingSplitsByTier[key]) {
      if (firstIndex) {
        const billingSplitGroupAccount =
          await tx.billingSplitGroupAccount.create({
            data: {
              lastUpdatedBy: createdByUserId,
              splitGroupId: splitGroup.id,
              accountCompanyId: split.accountCompanyId,
            },
          })

        billingSplitGroupAccounts[split.accountCompanyId] =
          billingSplitGroupAccount.id
      }

      await tx.billingAccountSplitAllocation.create({
        data: {
          lastUpdatedBy: createdByUserId,
          splitItemId: splitItem.id,
          splitGroupAccountId:
            billingSplitGroupAccounts[split.accountCompanyId],
          splitValue: split.splitPercentage,
          splitValueType: BillingSplitValueType.PERCENTAGE,
        },
      })
    }

    firstIndex = false
  }
  return splitGroup
}

export default createSplitGroup
