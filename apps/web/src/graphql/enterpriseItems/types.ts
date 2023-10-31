import { TagLinkInput } from '../types'

export interface BillingSplitInput {
  accountCompanyId: string
  retailerProductId?: string
  splitPercentage: number
  splitTier: TagLinkInput
}
