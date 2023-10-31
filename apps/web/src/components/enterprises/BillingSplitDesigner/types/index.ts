export type BillingTierNode = {
  id: string
  level: number
  children?: BillingTierNode[]
}

export const PLACE_HOLDER_COMPANY_ID = 'select-company'

export const BILLING_TIER_IDS: BillingTierNode = {
  id: 'Enterprise Item',
  level: 1,
  children: [
    {
      id: 'Products',
      level: 2,
      children: [
        {
          id: 'Products:Chemicals',
          level: 3,
          children: [{ id: 'Products:Chemicals:Specific', level: 4 }],
        },
        {
          id: 'Products:Fertilizer',
          level: 3,
          children: [{ id: 'Products:Fertilizer:Specific', level: 4 }],
        },
        {
          id: 'Products:Seed',
          level: 3,
          children: [{ id: 'Products:Seed:Specific', level: 4 }],
        },
        {
          id: 'Products:Fuel',
          level: 3,
          children: [{ id: 'Products:Fuel:Specific', level: 4 }],
        },
        {
          id: 'Products:Other',
          level: 3,
          children: [{ id: 'Products:Other:Specific', level: 4 }],
        },
      ],
    },
    {
      id: 'Services',
      level: 2,
      children: [
        {
          id: 'Services:Custom Application',
          level: 3,
          children: [{ id: 'Services:Custom Application:Specific', level: 4 }],
        },
        {
          id: 'Services:Soil Sampling',
          level: 3,
          children: [{ id: 'Services:Soil Sampling:Specific', level: 4 }],
        },
        {
          id: 'Services:Scouting',
          level: 3,
          children: [{ id: 'Services:Scouting:Specific', level: 4 }],
        },
        {
          id: 'Services:Delivery',
          level: 3,
          children: [{ id: 'Services:Delivery:Specific', level: 4 }],
        },
        {
          id: 'Services:ArialImagery',
          level: 3,
          children: [{ id: 'Services:ArialImagery:Specific', level: 4 }],
        },
        {
          id: 'Services:Other',
          level: 3,
          children: [{ id: 'Services:Other:Specific', level: 4 }],
        },
      ],
    },
  ],
}

export interface BillingSplitInfo {
  accountCompanyId: string
  splitPercentage: number
  retailerProductName?: string
  retailerProductId?: string
}

export interface BillingSplitNode {
  nodeId: string
  nodeLevel: number
  nodeSplitEnabled: boolean
  refinementEnabled: boolean
  billingSplits: BillingSplitInfo[]
  parentNodeId: string | undefined
  children?: BillingSplitNode[]
}
