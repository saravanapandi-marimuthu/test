import { useEffect, useRef, useState } from 'react'
import { BasicCompanyInfo } from '../../../../types/companyTypes'
import { BillingTree } from '../types/BillingTree'
import { BILLING_TIER_IDS, BillingSplitInfo } from '../types'
import { BillingSplitInput } from '../../../../graphql/enterpriseItems/types'
import { set } from 'lodash'

export interface BillingSplitNodeProps {
  initialSelectedAccountCompanyId: string | null
  availableAccountCompanies: BasicCompanyInfo[]
}

export const useBillingSplitNodes = (props: BillingSplitNodeProps) => {
  const { initialSelectedAccountCompanyId, availableAccountCompanies } = props

  const [validSplitTree, setValidSplitTree] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [treeVersion, setTreeVersion] = useState(0)

  const rootNodeRef = useRef<BillingTree | null>(null)

  if (!rootNodeRef.current) {
    rootNodeRef.current = new BillingTree(BILLING_TIER_IDS)
  }

  const [selectedCompanies, setSelectedCompanies] = useState<
    BasicCompanyInfo[]
  >([])

  const [remainingCompanies, setRemainingCompanies] = useState<
    BasicCompanyInfo[]
  >([])

  const prevSelectedCompaniesRef = useRef<BasicCompanyInfo[]>([])

  useEffect(() => {
    if (!availableAccountCompanies || availableAccountCompanies.length === 0) {
      return
    }

    setUpdating(true)

    setSelectedCompany()

    setUpdating(false)
  }, [initialSelectedAccountCompanyId, availableAccountCompanies])

  useEffect(() => {
    // When selected companies change, update the billing splits for each node by adding or removing companies from the selectedCompanies list
    setUpdating(true)

    prevSelectedCompaniesRef.current = selectedCompanies
    setUpdating(false)
  }, [selectedCompanies])

  useEffect(() => {
    // Set the valid split tree flag
    if (!rootNodeRef.current) return

    setValidSplitTree(rootNodeRef.current.validTree)
  }, [rootNodeRef.current])

  const updateTreeVersion = () => {
    if (!rootNodeRef.current) return
    setValidSplitTree(rootNodeRef.current.validTree)
    setTreeVersion(prevVersion => prevVersion + 1)
  }

  const setSelectedCompany = () => {
    if (!initialSelectedAccountCompanyId) return
    const selectedCompany = availableAccountCompanies.find(
      c => c.companyId === initialSelectedAccountCompanyId,
    )

    if (!selectedCompany) return

    setSelectedCompanies([selectedCompany])

    setRemainingCompanies(
      availableAccountCompanies.filter(
        c => c.companyId !== selectedCompany.companyId,
      ),
    )

    rootNodeRef.current?.addCompanyToAllNodes(selectedCompany.companyId)
    updateTreeVersion()
  }

  const addAccountToSplitGroup = (index: number, companyId: string) => {
    console.log('addAccountToSplitGroup', index, companyId)
    if (!companyId) return

    const existingSelectedCompany = selectedCompanies.find(
      c => c.companyId === companyId,
    )

    if (existingSelectedCompany) return

    if (index < 0 || index >= availableAccountCompanies.length) return

    const selectedCompany = availableAccountCompanies.find(
      c => c.companyId === companyId,
    )

    if (!selectedCompany) return

    const newSelected = [...selectedCompanies]

    const companyIdAtCurrentIndex = newSelected[index]?.companyId

    newSelected[index] = selectedCompany

    setSelectedCompanies(newSelected)
    setRemainingCompanies(
      remainingCompanies.filter(c => c.companyId !== companyId),
    )

    if (companyIdAtCurrentIndex) {
      rootNodeRef.current?.addOrReplaceCompanyToAllNodes(
        companyIdAtCurrentIndex,
        companyId,
      )
    } else {
      rootNodeRef.current?.addCompanyToAllNodes(companyId)
    }

    updateTreeVersion()
  }

  const removeAccountFromSplitGroup = (index: number, companyId: string) => {
    const remainingSelectedCompanies = selectedCompanies.filter(
      c => c.companyId !== companyId,
    )

    const removed = selectedCompanies.splice(index, 1)[0]
    setSelectedCompanies([...remainingSelectedCompanies])
    setRemainingCompanies([
      ...remainingCompanies,
      availableAccountCompanies.find(c => c.companyId === companyId)!,
    ])

    if (remainingCompanies.length <= 1) {
      //TODO
    }

    rootNodeRef.current?.removeCompanyFromAllNodes(companyId)
    updateTreeVersion()
  }

  const getNextAvailableLevels = (nodeId: string): string[] => {
    return rootNodeRef.current?.getChildrenIdsForNodeId(nodeId) ?? []
  }

  const getTierLevelSplits = (nodeId: string): BillingSplitInfo[] => {
    return rootNodeRef.current?.getBillingSplitsForNodeId(nodeId) ?? []
  }

  const getAccountSplitPercentage = (
    nodeId: string,
    accountCompanyId: string,
  ): number => {
    return (
      rootNodeRef.current?.getSplitPercentageForNodeId(
        nodeId,
        accountCompanyId,
      ) ?? 0
    )
  }

  const getTierLevelSplitTotal = (nodeId: string): number => {
    return rootNodeRef.current?.getSplitPercentageTotalForNodeId(nodeId) ?? 0
  }

  const updateSplitEnabledAtNode = (nodeId: string, enabled: boolean) => {
    rootNodeRef.current?.updateSplitEnabledAtNode(nodeId, enabled)
    updateTreeVersion()
  }

  const updateRefinementEnabledAtNode = (
    nodeId: string,
    enabled: boolean,
  ): void => {
    rootNodeRef.current?.updateRefinementEnabledAtNode(nodeId, enabled)
    updateTreeVersion()
  }

  const isNodeSplitEnabled = (nodeId: string): boolean => {
    return rootNodeRef.current?.isNodeSplitEnabled(nodeId) ?? false
  }

  const isNodeRefinementEnabled = (nodeId: string): boolean => {
    return rootNodeRef.current?.isNodeRefinementEnabled(nodeId) ?? false
  }

  const setAccountSplitPercentage = (
    nodeId: string,
    accountCompanyId: string,
    splitPercentage: number,
  ): void => {
    console.log(
      'setAccountSplitPercentage',
      nodeId,
      accountCompanyId,
      splitPercentage,
    )
    setUpdating(true)
    rootNodeRef.current?.setSplitPercentageForNodeId(
      nodeId,
      accountCompanyId,
      splitPercentage,
    )

    updateTreeVersion()

    setUpdating(false)
  }

  const splitEqually = (nodeId: string): void => {
    setUpdating(true)
    rootNodeRef.current?.splitEqually(nodeId)
    updateTreeVersion()
    setUpdating(false)
  }

  const getBillingSplitTreeAsArray = (): BillingSplitInput[] => {
    return rootNodeRef.current?.getTreeAsBillingSplitInputArray() ?? []
  }

  return {
    getNextAvailableLevels,
    updateSplitEnabledAtNode,
    updateRefinementEnabledAtNode,
    isNodeSplitEnabled,
    isNodeRefinementEnabled,
    selectedCompanies,
    remainingCompanies,
    setSelectedCompanies,
    addAccountToSplitGroup,
    removeAccountFromSplitGroup,
    getTierLevelSplits,
    getAccountSplitPercentage,
    setAccountSplitPercentage,
    splitEqually,
    updating,
    getTierLevelSplitTotal,
    validSplitTree,
    treeVersion,
    getBillingSplitTreeAsArray,
  }
}
