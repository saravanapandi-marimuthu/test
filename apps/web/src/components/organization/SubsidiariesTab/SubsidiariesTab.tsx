import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Backdrop,
  Typography,
} from '@mui/material'

import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { debounce } from 'lodash'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  Company,
  CompanyTypeEnum,
  SubsidiaryCompanyTreeData,
} from '../../../types/companyTypes'
import { Column } from '../../../types/types'
import { MultiSelect } from '../../shared/MultiSelect/MultiSelect'
import { CustomerPrimaryContact } from '../../CustomerPrimaryContact/CustomerPrimaryContact'
import { AddressView } from '../../shared/address/AddressView/AddressView'
import { useUser } from '../../../contexts/UserContext'
import { createSubsidiaryQuery } from '../../../graphql/companies/queries'
import AddSubsidiaryCompany from '../AddSubsidiaryCompany/AddSubsidiaryCompany'
import FloatingDialog from '../../shared/FloatingDialog/FloatingDialog'
import { flattenCompanyTree } from './flattenCompanyTree'
import SubsidiaryTreeView from '../SubsidiaryTreeView/SubsidiaryTreeView'

const SubsidiariesTab = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<Company[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [addMessage, setAddMessage] = useState('')
  const [drawerContent, setDrawerContent] = useState('')

  const { user } = useUser()

  const treeDepth = 3
  const query = createSubsidiaryQuery(treeDepth)
  const GET_SUBSIDIARY_TREE = gql(query)

  const { loading, error, data, refetch } = useQuery<SubsidiaryCompanyTreeData>(
    GET_SUBSIDIARY_TREE,
    {
      variables: {
        input: {
          parentCompanyId: user?.selectedUserRole?.company?.id,
          treeDepth,
          page,
          perPage,
          searchTerm,
          sort,
        },
      },
    },
  )

  useEffect(() => {
    const debouncedHandleSearch = debounce(() => {
      setSearchTerm(localSearchTerm)
      setPage(0)
    }, 200)

    debouncedHandleSearch()

    // Cleanup
    return () => {
      debouncedHandleSearch.cancel()
    }
  }, [localSearchTerm])

  useEffect(() => {
    refetch()
  }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(
        data.getSubsidiaryCompaniesTree.companies.flatMap(flattenCompanyTree),
      )
      setTotalCount(data.getSubsidiaryCompaniesTree.totalCount)
    }
  }, [loading, data])

  const handleAddSubsidiaryCompanyClick = (selectedCompany: Company) => {
    if (!selectedCompany) {
      return
    }

    console.log('selectedCompany=', selectedCompany)
    setSelectedCompany(selectedCompany)
    setDrawerContent('add')
    setShowFloatingDialog(true)
  }

  const handleEditCompanyClick = () => {
    setDrawerContent('edit')
    setShowFloatingDialog(true)
  }

  const handleRefreshCompanies = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  const handleDialogClose = () => {
    console.log('handleDialogClose')
    setSelectedCompany(null)
    setShowFloatingDialog(false)
  }

  let handleCustomFilterSubmit: any

  const columns: Column[] = [
    {
      name: 'companyName',
      label: 'Company',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Company'}
                filterList={filterList}
                onChange={onChange}
                index={index}
                column={column}
                filterData={filterData}
                onConfirm={handleCustomFilterSubmit}
              />
            )
          },
        },

        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex

          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{
                position: 'relative',
                ':hover': {
                  '& .open-add-screen': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box>{displayData[rowIndex].companyName}</Box>
              <Button
                className="open-add-screen"
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  opacity: 0,
                  transition: '0.1s',
                  fontSize: 12,
                  p: 0.3,
                }}
                onClick={() => {
                  handleAddSubsidiaryCompanyClick(displayData[rowIndex])
                }}
              >
                Add
              </Button>
            </Stack>
          )
        },
      },
    },
    {
      name: 'parentCompany',
      label: 'Parent Org',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Parent Org'}
                filterList={filterList}
                onChange={onChange}
                index={index}
                column={column}
                filterData={filterData}
                onConfirm={handleCustomFilterSubmit}
              />
            )
          },
        },

        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return displayData[rowIndex].parentCompany?.companyName
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Address'}
                filterList={filterList}
                onChange={onChange}
                index={index}
                column={column}
                filterData={filterData}
                onConfirm={handleCustomFilterSubmit}
              />
            )
          },
        },
        sort: false,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return (
            <AddressView
              categorizedAddress={displayData[rowIndex].addresses.find(
                addr => addr.addressType === 'BILLING',
              )}
            />
          )
        },
      },
    },
    {
      name: 'Primary Contact',
      label: 'Primary Contact',
      options: {
        sort: false,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return (
            <CustomerPrimaryContact
              role={
                displayData[rowIndex].roles.find(
                  (role: any) => role.role.roleName === 'Contact',
                ) as any
              }
            />
          )
        },
        filter: false,
      },
    },
    {
      name: 'Edit',
      label: 'Edit',
      options: {
        sort: false,

        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <IconButton onClick={handleEditCompanyClick}>
              <EditIcon />
            </IconButton>
          )
        },
        filter: false,
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'multiselect',
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: perPage,
    page: page,
    rowsPerPageOptions: [10, 25, 50],
    count: totalCount,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    filter: true,
    download: false,
    print: false,
    searchAlwaysOpen: true,
    selectableRowsHeader: true,
    customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
      handleCustomFilterSubmit = applyNewFilters
      return null
    },
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'changePage':
          setPage(tableState.page)
          break
        case 'changeRowsPerPage':
          setPerPage(tableState.rowsPerPage)
          break
        case 'search':
          setLocalSearchTerm(tableState.searchText || '')
          break
        case 'sort':
          if (
            tableState.sortOrder &&
            tableState.sortOrder.direction !== 'none'
          ) {
            setSort(
              `${tableState.sortOrder.name}:${tableState.sortOrder.direction}`,
            )
          } else {
            setSort('')
          }
          break
      }
    },

    expandableRows: false,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      console.log(rowData, rowMeta)
      return (
        <>
          <tr>
            <td colSpan={5} align="center" className="p-2">
              <Typography>More details</Typography>
            </td>
          </tr>
        </>
      )
    },
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setShowFloatingDialog(open)
    }

  if (error) return <p>Error: {error.message}</p>

  return (
    <Box paddingBottom={3} width={'100%'}>
      <SectionHeadingToolBar
        title={''}
        loading={loading}
        hasAddButton={false}
        addButtonTitle={'Add Subsidiary'}
        hasRefreshButton={true}
        onRefreshButtonClicked={handleRefreshCompanies}
      />

      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          {data?.getSubsidiaryCompaniesTree?.companies &&
            data?.getSubsidiaryCompaniesTree?.companies?.length > 0 && (
              <SubsidiaryTreeView
                rootCompany={data?.getSubsidiaryCompaniesTree.companies[0]}
                onClickAddSubsidiary={handleAddSubsidiaryCompanyClick}
              />
            )}
        </Box>
        <Box position="relative">
          <MUIDataTable
            title={''}
            data={displayData}
            columns={columns}
            options={options}
          />
          <Backdrop
            open={loading || isManualRefetching}
            sx={{
              color: '#fff',
              zIndex: theme => theme.zIndex.drawer + 1,
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Stack>

      {selectedCompany && (
        <FloatingDialog
          isOpen={showFloatingDialog}
          onClose={handleDialogClose}
          title={`Subsidiary/Branch of ${selectedCompany.companyName}`}
          totalNumberOfWindows={1}
          windowIndex={0}
        >
          <AddSubsidiaryCompany
            parentCompanyName={selectedCompany.companyName}
            parentCompanyId={selectedCompany.id}
            entryType={CompanyTypeEnum.AG_RETAILER}
            labelMessage="Subsidiary/Branch Name"
            successAndError={[
              'New Subsidiary is created',
              'Error creating Subsidiary',
            ]}
            onClose={handleDialogClose}
            refetch={refetch}
          />
        </FloatingDialog>
      )}
    </Box>
  )
}

export default SubsidiariesTab
