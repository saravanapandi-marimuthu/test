import {
  BILLING_TIER_IDS,
  BillingSplitInfo,
  BillingSplitNode,
  BillingTierNode,
  PLACE_HOLDER_COMPANY_ID,
} from '.'
import { BillingSplitInput } from '../../../../graphql/enterpriseItems/types'

export class BillingTree {
  root: BillingSplitNode
  validTree: boolean = false

  constructor(tierNode: BillingTierNode) {
    this.root = this._transformNode(tierNode)
    this.root.nodeSplitEnabled = true
  }

  private _transformNode(node: BillingTierNode): BillingSplitNode {
    return {
      nodeId: node.id,
      nodeLevel: node.level,
      nodeSplitEnabled: false,
      refinementEnabled: false,
      billingSplits: [],
      parentNodeId: undefined, // We can update this when initializing children
      children: node.children
        ? node.children.map(child => {
            const childNode = this._transformNode(child)
            childNode.parentNodeId = node.id
            return childNode
          })
        : undefined,
    }
  }

  // Method to update the billing split array at a specific node
  updateBillingSplitsAtNode(nodeId: string, splits: BillingSplitInfo[]): void {
    const node = this._findNodeById(this.root, nodeId)
    if (node) {
      node.billingSplits = splits
    }

    this.validatedTree()
  }

  // Method to update the split enabled state at a specific node
  updateSplitEnabledAtNode(nodeId: string, enabled: boolean): void {
    const node = this._findNodeById(this.root, nodeId)
    if (node) {
      node.nodeSplitEnabled = enabled

      // If enabled === true, copy the parent billing split percentages to the current node
      if (enabled) {
        const parentNode = this._findNodeById(this.root, node.parentNodeId!)
        if (parentNode) {
          node.billingSplits = parentNode.billingSplits.map(split => ({
            ...split,
          }))
        }
      }
    }

    this.validatedTree()
  }

  // Method to update the refinement enabled state at a specific node
  updateRefinementEnabledAtNode(nodeId: string, enabled: boolean): void {
    const node = this._findNodeById(this.root, nodeId)
    if (node) {
      node.refinementEnabled = enabled
    }

    this.validatedTree()
  }

  // Method to check if the node split is enabled at a given node ID.
  isNodeSplitEnabled(nodeId: string): boolean {
    const node = this._findNodeById(this.root, nodeId)
    return node ? node.nodeSplitEnabled : false
  }

  isNodeRefinementEnabled(nodeId: string): boolean {
    const node = this._findNodeById(this.root, nodeId)
    return node ? node.refinementEnabled : false
  }

  private _findNodeById(
    node: BillingSplitNode,
    nodeId: string,
  ): BillingSplitNode | undefined {
    if (node.nodeId === nodeId) return node
    for (let child of node.children || []) {
      const found = this._findNodeById(child, nodeId)
      if (found) return found
    }
    return undefined
  }

  // Method to get the tree as an array of BillingSplitInput objects.
  getTreeAsBillingSplitInputArray(): BillingSplitInput[] | null {
    const billingSplitInputArray: BillingSplitInput[] = []
    this._getTreeAsBillingSplitInputArrayRecursive(
      this.root,
      billingSplitInputArray,
    )
    return billingSplitInputArray.length > 0 ? billingSplitInputArray : null
  }

  private _getTreeAsBillingSplitInputArrayRecursive(
    node: BillingSplitNode,
    billingSplitInputArray: BillingSplitInput[],
  ): void {
    if (node.nodeSplitEnabled && node.billingSplits.length > 0) {
      node.billingSplits.forEach(split => {
        if (split.accountCompanyId === PLACE_HOLDER_COMPANY_ID) {
          return
        }

        billingSplitInputArray.push({
          accountCompanyId: split.accountCompanyId,
          retailerProductId: split.retailerProductId,
          splitPercentage: split.splitPercentage,
          splitTier: {
            tagName: node.nodeId,
            tagCategoryName: `Billing Split Tier ${node.nodeLevel}`,
          },
        })
      })
    }

    if (node.children) {
      node.children.forEach(child =>
        this._getTreeAsBillingSplitInputArrayRecursive(
          child,
          billingSplitInputArray,
        ),
      )
    }
  }

  // Method to get the next available tiers from the current tier Id
  getChildrenIdsForNodeId(nodeId: string): string[] {
    return this._getChildrenIdsForNodeId(nodeId, BILLING_TIER_IDS)
  }

  _getChildrenIdsForNodeId(
    nodeId: string,
    node: BillingTierNode = BILLING_TIER_IDS,
  ): string[] {
    // If the current node ID matches the given ID, return its children IDs.
    if (node.id === nodeId) {
      return node.children ? node.children.map(child => child.id) : []
    }

    // If not, search recursively in the children.
    if (node.children) {
      for (let child of node.children) {
        const result = this._getChildrenIdsForNodeId(nodeId, child)
        if (result.length > 0) {
          return result
        }
      }
    }

    return []
  }

  // Check if a node has valid for billing splits, i.e., all splits add upto 100%
  isNodeValidForBillingSplits(nodeId: string): boolean {
    const node = this._findNodeById(this.root, nodeId)
    if (!node) return false
    if (!node.nodeSplitEnabled) return true

    const totalPercentage = node.billingSplits.reduce(
      (acc, split) => acc + split.splitPercentage,
      0,
    )
    return totalPercentage === 100
  }

  validatedTree() {
    if (
      this.root.billingSplits.find(
        split => split.accountCompanyId === PLACE_HOLDER_COMPANY_ID,
      )
    ) {
      this.validTree = false
      return
    }

    this.validTree = this._isTreeValidForBillingSplitsRecursive(this.root)
  }

  _isTreeValidForBillingSplitsRecursive(node: BillingSplitNode): boolean {
    if (node.nodeSplitEnabled && node.billingSplits.length > 0) {
      const totalPercentage = node.billingSplits.reduce(
        (acc, split) => acc + split.splitPercentage,
        0,
      )
      if (totalPercentage !== 100) return false
    }

    if (node.children) {
      for (let child of node.children) {
        const result = this._isTreeValidForBillingSplitsRecursive(child)
        if (!result) return false
      }
    }

    return true
  }

  // Get the tier level billing splits for a given node ID.
  getBillingSplitsForNodeId(nodeId: string): BillingSplitInfo[] {
    if (!nodeId) return []

    const node = this._findNodeById(this.root, nodeId)
    return node ? node.billingSplits : []
  }

  // Set the split percent for a given account company ID at a given node ID.
  setSplitPercentageForNodeId(
    nodeId: string,
    accountCompanyId: string,
    splitPercentage: number,
  ): void {
    const node = this._findNodeById(this.root, nodeId)
    if (!node) return

    const billingSplits = [...node.billingSplits]

    const splitIndex = billingSplits.findIndex(
      split => split.accountCompanyId === accountCompanyId,
    )

    if (splitIndex < 0) return

    billingSplits[splitIndex].splitPercentage = splitPercentage

    // const total = billingSplits.reduce(
    // (acc, item) => acc + item.splitPercentage,
    // 0,
    // )

    // if (total !== 100) {
    // billingSplits[billingSplits.length - 1].splitPercentage += 100 - total
    // }
    node.billingSplits = billingSplits

    this.validatedTree()
  }

  // Get the split percent for a given account company ID at a given node ID.
  getSplitPercentageForNodeId(
    nodeId: string,
    accountCompanyId: string,
  ): number {
    const node = this._findNodeById(this.root, nodeId)
    if (!node) return 0

    const billingSplits = [...node.billingSplits]

    const splitIndex = billingSplits.findIndex(
      split => split.accountCompanyId === accountCompanyId,
    )

    if (splitIndex < 0) return 0

    return billingSplits[splitIndex].splitPercentage
  }

  // Method to get the split percentage total for a given node ID.
  getSplitPercentageTotalForNodeId(nodeId: string): number {
    const node = this._findNodeById(this.root, nodeId)
    if (!node) return 0

    const billingSplits = [...node.billingSplits]

    return billingSplits.reduce((acc, item) => acc + item.splitPercentage, 0)
  }

  // Split the percentages equally for a given node ID.
  splitEqually(nodeId: string): void {
    const node = this._findNodeById(this.root, nodeId)
    if (!node) return

    const billingSplits = [...node.billingSplits]

    const splitPercentage = (100 / billingSplits.length).toFixed(2)

    billingSplits.forEach(
      split => (split.splitPercentage = parseFloat(splitPercentage)),
    )

    // Ensuring the total percentage is 100 by adjusting the last entry
    const total = billingSplits.reduce(
      (acc, item) => acc + item.splitPercentage,
      0,
    )

    if (total !== 100) {
      billingSplits[billingSplits.length - 1].splitPercentage += 100 - total
    }

    node.billingSplits = billingSplits

    this.validatedTree()
  }

  // Method to add or replace a company with a new company to all nodes in the tree.
  addOrReplaceCompanyToAllNodes(
    oldCompanyId: string,
    newCompanyId: string,
  ): void {
    this._addOrReplaceCompanyToAllNodesRecursive(
      this.root,
      oldCompanyId,
      newCompanyId,
    )

    this.validatedTree()
  }

  _addOrReplaceCompanyToAllNodesRecursive(
    node: BillingSplitNode,
    oldCompanyId: string,
    newCompanyId: string,
  ): void {
    //if (node.nodeSplitEnabled) {
    node.billingSplits = node.billingSplits.map(split => {
      if (split.accountCompanyId === oldCompanyId) {
        return {
          ...split,
          accountCompanyId: newCompanyId,
        }
      }
      return split
    })
    //}

    if (node.children) {
      node.children.forEach(child =>
        this._addOrReplaceCompanyToAllNodesRecursive(
          child,
          oldCompanyId,
          newCompanyId,
        ),
      )
    }
  }

  // Method to add a company to all the nodes in the tree with percentage 0.
  addCompanyToAllNodes(companyId: string): void {
    this._addCompanyToAllNodesRecursive(this.root, companyId)

    // Split the parent node equally
    this.splitEqually('Enterprise Item')
    this.validatedTree()
  }

  _addCompanyToAllNodesRecursive(
    node: BillingSplitNode,
    companyId: string,
  ): void {
    node.billingSplits.push({
      accountCompanyId: companyId,
      splitPercentage: 0,
    })

    if (node.children) {
      node.children.forEach(child =>
        this._addCompanyToAllNodesRecursive(child, companyId),
      )
    }

    // If node is root node and node has only one company, set the company to 100%
    if (node.nodeId === this.root.nodeId && node.billingSplits.length === 1) {
      node.billingSplits[0].splitPercentage = 100
    }
  }

  // Method to remove a company from all the nodes in the tree.
  removeCompanyFromAllNodes(companyId: string): void {
    this._removeCompanyFromAllNodesRecursive(this.root, companyId)

    this.validatedTree()
  }

  _removeCompanyFromAllNodesRecursive(
    node: BillingSplitNode,
    companyId: string,
  ): void {
    if (node.nodeSplitEnabled) {
      node.billingSplits = node.billingSplits.filter(
        split => split.accountCompanyId !== companyId,
      )
    }

    if (node.children) {
      node.children.forEach(child =>
        this._removeCompanyFromAllNodesRecursive(child, companyId),
      )
    }
  }
}
