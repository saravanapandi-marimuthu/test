// treeHelpers.ts
type BillingTierNode = {
  id: string
  level: number
  children?: BillingTierNode[]
}

const BILLING_TIER_IDS: BillingTierNode = {
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

const initializeTree = (
  parentNodeId: string | undefined,
  data: BillingTierNode,
): BillingSplitNode => {
  let node: BillingSplitNode = {
    nodeSplitEnabled: false,
    refinementEnabled: false,
    nodeId: data.id,
    nodeLevel: data.level,
    billingSplits: [],
    parentNodeId: parentNodeId,
  }

  if (data.children && data.children.length > 0) {
    node.children = data.children.map((child: any) =>
      initializeTree(node.nodeId, child),
    )
  }

  return node
}

export const initializeBillingSplitTree = (): BillingSplitNode => {
  return initializeTree(undefined, BILLING_TIER_IDS)
}

export const findNode = (
  rootNode: BillingSplitNode,
  nodeId: string,
): BillingSplitNode | null => {
  if (!rootNode || !nodeId) return null
  if (rootNode.nodeId === nodeId) return rootNode

  if (rootNode.children) {
    for (let child of rootNode.children) {
      const found = findNode(child, nodeId)
      if (found) return found
    }
  }

  return null
}

export const updateNodeState = (
  rootNode: BillingSplitNode,
  node: BillingSplitNode,
  id: string,
  nodeSplitEnabled?: boolean,
  refinementEnabled?: boolean,
): BillingSplitNode => {
  if (node.nodeId !== id) {
    if (!node.children) return node
    return {
      ...node,
      children: node.children.map(child =>
        updateNodeState(
          rootNode,
          child,
          id,
          nodeSplitEnabled,
          refinementEnabled,
        ),
      ),
    }
  }

  const updatedNode = { ...node }

  if (nodeSplitEnabled != null) {
    updatedNode.nodeSplitEnabled = nodeSplitEnabled

    if (node.parentNodeId) {
      const parentNode = findNode(rootNode!, node.parentNodeId)
      updatedNode.billingSplits = updateBillingSplits(node, parentNode)
    }
  }

  if (refinementEnabled != null) {
    updatedNode.refinementEnabled = refinementEnabled
  }

  return updatedNode
}

const updateBillingSplits = (
  node: BillingSplitNode,
  parentNode: BillingSplitNode | undefined | null,
) => {
  if (
    node.billingSplits.length > 0 &&
    node.billingSplits.every(split => split.splitPercentage === 0)
  ) {
    if (parentNode?.billingSplits) {
      return parentNode.billingSplits.map(split => ({ ...split }))
    }
  }
  return node.billingSplits
}

const getTierLevelSplits = (
  rootNode: BillingSplitNode,
  nodeId: string,
): BillingSplitInfo[] => {
  const node = findNode(rootNode!, nodeId)
  return node ? node.billingSplits : []
}
