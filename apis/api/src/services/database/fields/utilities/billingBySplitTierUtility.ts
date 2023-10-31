import { TagLinkInput } from '../../types/types'
import { BillingSplitInput } from '../types/fieldTypeExtensions'

type GroupedBillingSplit = {
  [key: string]: BillingSplitInput[]
}

export function groupBillingBySplitTier(
  arr: BillingSplitInput[],
): GroupedBillingSplit {
  return arr.reduce((acc, curr) => {
    // Create a string key for the splitTier object
    const key = `${curr.splitTier.tagCategoryName}:${curr.splitTier.tagName}`

    // If the key doesn't exist in the accumulator, create it
    if (!acc[key]) {
      acc[key] = []
    }

    // Push the current item to the corresponding group
    acc[key].push(curr)

    return acc
  }, {} as GroupedBillingSplit)
}

export function extractTagFromKey(key: string): TagLinkInput {
  const [tagCategoryName, tagName] = key.split(':')
  return { tagCategoryName, tagName }
}

export function isBillingSplitGroupValid(groups: GroupedBillingSplit): boolean {
  for (const key in groups) {
    const group = groups[key]
    const sum = group.reduce((acc, curr) => acc + curr.splitPercentage, 0)

    if (sum !== 100) {
      return false
    }
  }

  return true
}
