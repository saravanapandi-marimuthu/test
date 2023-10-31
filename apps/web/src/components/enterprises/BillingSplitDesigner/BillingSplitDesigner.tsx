import React, { useState, useEffect } from 'react'
import {
  MenuItem,
  Select,
  Button,
  IconButton,
  Stack,
  TableRow,
  Typography,
  styled,
  Box,
  lighten,
  Grid,
  Chip,
  Tooltip,
  TextField,
  Alert,
  AlertTitle,
  SwipeableDrawer,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { BasicCompanyInfo, CompanyTypeEnum } from '../../../types/companyTypes'
import {
  Plus as PlusIcon,
  Equals as EqualsIcon,
  ArrowsSplit as ArrowsSplitIcon,
  WarningDiamond as WarningDiamondIcon,
  CheckSquareOffset as CheckSquareOffsetIcon,
} from '@phosphor-icons/react'
import ToggleSwitch from '../../shared/ToggleSwitch/ToggleSwitch'
import PercentPicker from '../../shared/PercentPicker/PercentPicker'
import { useBillingSplitNodes } from './hooks/useBillingSplitNodes'
import { BillingSplitInput } from '../../../graphql/enterpriseItems/types'
import { PLACE_HOLDER_COMPANY_ID } from './types'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { CompanyServiceTypes } from '../../../graphql/generated/graphql'

export interface BillingSplitDesignerProps {
  selectedAccountCompanyId: string | null
  availableAccountCompanies: BasicCompanyInfo[]
  isCompactView: boolean
  onBillingSplitChange: (
    billingSplitName: string,
    billingSplit: BillingSplitInput[],
    validSplitTree: boolean,
  ) => void
}

const HighlightedBox = styled(Box)(({ theme }) => ({
  backgroundColor: lighten(theme.palette.action.hover, 0.2),
  border: 0,
  borderRadius: 5,
}))

const BillingSplitDesigner: React.FC<BillingSplitDesignerProps> = ({
  selectedAccountCompanyId,
  availableAccountCompanies,
  isCompactView,
  onBillingSplitChange,
}) => {
  const [advancedSplitEditEnabled, setAdvancedSplitEditEnabled] =
    useState<boolean>(false)

  const [billingSplitName, setBillingSplitName] =
    useState<string>('Default Split')

  const [showBillingSplitDesignerDrawer, setShowBillingSplitDesignerDrawer] =
    useState<boolean>(false)

  const [
    availableAccountCompaniesWithDefaultSelect,
    setAvailableAccountCompaniesWithDefaultSelect,
  ] = useState<BasicCompanyInfo[]>([])

  const {
    getNextAvailableLevels,
    isNodeSplitEnabled,
    isNodeRefinementEnabled,
    updateSplitEnabledAtNode,
    updateRefinementEnabledAtNode,
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
    getBillingSplitTreeAsArray,
    treeVersion,
  } = useBillingSplitNodes({
    initialSelectedAccountCompanyId: selectedAccountCompanyId,
    availableAccountCompanies: availableAccountCompaniesWithDefaultSelect,
  })

  useEffect(() => {
    onBillingSplitChange(
      billingSplitName,
      getBillingSplitTreeAsArray(),
      validSplitTree,
    )
  }, [validSplitTree, treeVersion])

  useEffect(() => {
    setAvailableAccountCompaniesWithDefaultSelect([
      {
        companyId: PLACE_HOLDER_COMPANY_ID,
        companyName: 'Select Account',
        companyType: CompanyServiceTypes.Account,
      },
      ...availableAccountCompanies,
    ])
  }, [availableAccountCompanies])

  const getLastSegment = (text: string): string => {
    const segments = text.split(':')
    return segments[segments.length - 1]
  }

  const toggleBillingSplitDesignerDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setShowBillingSplitDesignerDrawer(open)
    }

  const compactView = () => {}

  const tierLevelSplitComponent = (tier: number, tierId: string) => {
    if (!advancedSplitEditEnabled && tier > 0) {
      return (
        <>
          <Typography>TEST</Typography>
        </>
      )
    }

    const tierLevelSplits = getTierLevelSplits(tierId)

    const showPercentage = selectedCompanies.length > 1
    const splitLevelTotal = getTierLevelSplitTotal(tierId)

    return (
      <>
        <Box paddingLeft={(tier - 1) * 2}>
          {tierLevelSplits.map((selected, index) => (
            <Box
              key={`TierLevelSplit-${tier}-${tierId}-${selected.accountCompanyId}`}
            >
              <Grid container paddingY={0.5} spacing={1}>
                <Grid
                  item
                  xs={showPercentage ? 8 : 12}
                  sm={showPercentage ? 8 : 12}
                >
                  <Select
                    fullWidth
                    size="small"
                    value={selected.accountCompanyId}
                    onChange={e =>
                      addAccountToSplitGroup(index, e.target.value)
                    }
                  >
                    {availableAccountCompaniesWithDefaultSelect.map(company => (
                      <MenuItem
                        key={company.companyId}
                        value={company.companyId}
                        disabled={
                          company.companyId === 'select-company' ||
                          selectedCompanies.some(
                            s => s.companyId === company.companyId,
                          )
                        }
                      >
                        {company.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {selectedCompanies.length > 1 && (
                  <>
                    <Grid item xs={3} sm={3}>
                      <PercentPicker
                        value={getAccountSplitPercentage(
                          tierId,
                          selected.accountCompanyId,
                        )}
                        onChange={function (newValue: number): void {
                          setAccountSplitPercentage(
                            tierId,
                            selected.accountCompanyId,
                            newValue,
                          )
                        }}
                      />
                    </Grid>
                  </>
                )}
                {index !== 0 && (
                  <Grid item xs={1} sm={1}>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() =>
                        removeAccountFromSplitGroup(
                          index,
                          selected.accountCompanyId,
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}

          <HighlightedBox padding={1}>
            <Stack
              direction="row"
              spacing={1}
              alignContent={'center'}
              textAlign={'center'}
            >
              <Button
                size="small"
                disabled={remainingCompanies.length === 0}
                startIcon={<PlusIcon size="18" />}
                variant="text"
                color="primary"
                onClick={event =>
                  addAccountToSplitGroup(
                    selectedCompanies.length,
                    'select-company',
                  )
                }
                sx={{ textTransform: 'none' }}
                className="my-first-step"
              >
                Add
              </Button>
              {selectedCompanies.length > 1 && (
                <>
                  <Button
                    size="small"
                    startIcon={<EqualsIcon size="18" />}
                    variant="text"
                    color="secondary"
                    onClick={() => splitEqually(tierId)}
                    sx={{ textTransform: 'none' }}
                    className="my-other-step"
                  >
                    Equal Split
                  </Button>

                  <Chip
                    icon={
                      splitLevelTotal === 100 ? undefined : (
                        <WarningDiamondIcon size="18" />
                      )
                    }
                    color={splitLevelTotal === 100 ? 'success' : 'error'}
                    sx={{ minWidth: 60 }}
                    label={splitLevelTotal}
                    variant={splitLevelTotal === 100 ? 'outlined' : 'filled'}
                  />
                </>
              )}

              {selectedCompanies.length > 1 && tier === 0 && (
                <Box
                  flexGrow={1}
                  alignContent={'flex-end'}
                  alignItems={'flex-end'}
                  textAlign={'right'}
                >
                  <Button
                    sx={{ textTransform: 'none' }}
                    size="small"
                    startIcon={<ArrowsSplitIcon size="18" />}
                    variant="text"
                    color="secondary"
                    onClick={() => {
                      setAdvancedSplitEditEnabled(!advancedSplitEditEnabled)
                      setShowBillingSplitDesignerDrawer(true)
                    }}
                  >
                    Advanced Split
                  </Button>
                </Box>
              )}
            </Stack>
          </HighlightedBox>
          <Box margin={1}></Box>
        </Box>
      </>
    )
  }

  const nextTierSplitComponent = (tier: number, tierId: string) => {
    if (!advancedSplitEditEnabled) {
      return <></>
    }

    const nextLevelItems = getNextAvailableLevels(tierId)

    return (
      <>
        {nextLevelItems.map(nextLevelTierId => (
          <React.Fragment key={`RefinementLevel-${nextLevelTierId}`}>
            <HighlightedBox padding={0.5} paddingLeft={2 * tier}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item xs={8} sm={8}>
                  <Typography color="text.secondary" fontWeight={'bold'}>
                    {getLastSegment(nextLevelTierId)}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                  {tier < 4 && (
                    <ToggleSwitch
                      checked={isNodeSplitEnabled(nextLevelTierId)}
                      onChange={newState => {
                        updateSplitEnabledAtNode(nextLevelTierId, newState)
                      }}
                      label={'Split'}
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  {tier < 3 && (
                    <ToggleSwitch
                      checked={isNodeRefinementEnabled(nextLevelTierId)}
                      onChange={newState => {
                        updateRefinementEnabledAtNode(nextLevelTierId, newState)
                      }}
                      label={'Refine'}
                    />
                  )}
                </Grid>
              </Grid>
            </HighlightedBox>
            {isNodeSplitEnabled(nextLevelTierId) && (
              <React.Fragment>
                {tierLevelSplitComponent(tier + 1, nextLevelTierId)}
              </React.Fragment>
            )}

            {isNodeRefinementEnabled(nextLevelTierId) && (
              <React.Fragment>
                {nextTierSplitComponent(tier + 1, nextLevelTierId)}
              </React.Fragment>
            )}
            <Box margin={1}></Box>
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="text.secondary">
          Billing Info
        </Typography>
        <Box
          display={'flex'}
          padding={1}
          flexGrow={1}
          justifyContent={'flex-end'}
        >
          <Tooltip
            title={
              validSplitTree ? 'All Splits Valid' : 'Some splits have error'
            }
          >
            <IconButton color={validSplitTree ? 'success' : 'error'}>
              {validSplitTree ? (
                <CheckSquareOffsetIcon size="22" />
              ) : (
                <WarningDiamondIcon size="22" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>

      <Box>
        <TextField
          fullWidth
          label="Billing Split Name"
          required
          size="small"
          variant="outlined"
          value={billingSplitName}
          onChange={e => setBillingSplitName(e.target.value)}
        />
      </Box>

      {isCompactView && tierLevelSplitComponent(0, 'Enterprise Item')}

      {!isCompactView && (
        <>
          {tierLevelSplitComponent(0, 'Enterprise Item')}
          {nextTierSplitComponent(1, 'Enterprise Item')}
        </>
      )}

      <SwipeableDrawer
        anchor="right"
        sx={{ width: 600 }}
        open={showBillingSplitDesignerDrawer}
        onClose={toggleBillingSplitDesignerDrawer(false)}
        onOpen={toggleBillingSplitDesignerDrawer(true)}
      >
        <Box
          minWidth={600}
          sx={{
            padding: 2,
            paddingTop: 10,
          }}
        >
          <>
            <SectionHeadingToolBar
              title={'Billing Info'}
              loading={false}
              hasAddButton={false}
              hasRefreshButton={false}
              middleComponent={
                <Tooltip
                  title={
                    validSplitTree
                      ? 'All Splits Valid'
                      : 'Some splits have error'
                  }
                >
                  <IconButton color={validSplitTree ? 'success' : 'error'}>
                    {validSplitTree ? (
                      <CheckSquareOffsetIcon size="22" />
                    ) : (
                      <WarningDiamondIcon size="22" />
                    )}
                  </IconButton>
                </Tooltip>
              }
            />

            {tierLevelSplitComponent(0, 'Enterprise Item')}
            {nextTierSplitComponent(1, 'Enterprise Item')}
          </>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BillingSplitDesigner
