import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import EditCompanyPopover from '../EditCompanyPopover/EditCompanyPopover'
import AddCompanyPopover from '../AddCompanyPopover/AddCompanyPopover'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Backdrop,
  Breadcrumbs,
  Typography,
} from '@mui/material'

import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { debounce } from 'lodash'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { Column } from '../../../types/types'
import { MultiSelect } from '../../shared/MultiSelect/MultiSelect'
import { CustomerPrimaryContact } from '../../CustomerPrimaryContact/CustomerPrimaryContact'
import { AddressView } from '../../shared/address/AddressView/AddressView'

import {
  CompaniesDocument,
  Company,
  CompaniesQuery,
  UserRole,
  RoleTypes,
  AddressType,
  CompanyAddress,
} from '../../../graphql/generated/graphql'
import getCategorizedAddressFromCompanyAddress from '../../../utilities/getCategorizedAddress'

const Companies = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<Company[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)

  const [addMessage, setAddMessage] = useState('')
  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState('')

  const handleAddCompanyClick = () => {
    setDrawerContent('add')
    setShowDrawer(true)
  }

  const handleEditCompanyClick = () => {
    setDrawerContent('edit')
    setShowDrawer(true)
  }

  const { loading, error, data, refetch } = useQuery<CompaniesQuery>(
    CompaniesDocument,
    {
      variables: {
        input: { page, pageSize: perPage, searchTerm, sortBy: sort },
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
      console.log(data.companies?.items)
      setDisplayData((data.companies?.items as Company[]) ?? [])
      setTotalCount(data.companies?.totalCount ?? 0)
    }
  }, [loading, data])

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
                <MultiSelect
                  label={'Company'}
                  filterList={filterList}
                  onChange={onChange}
                  index={index}
                  column={column}
                  filterData={filterData}
                  onConfirm={handleCustomFilterSubmit}
                />
              </Stack>
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
          return displayData[rowIndex].name
        },
      },
    },
    {
      name: 'companyType',
      label: 'Type',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Company Type'}
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
          return displayData[rowIndex].servicesInfo?.[0]?.name ?? 'Unknown'
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
          const companyAddress = displayData[rowIndex].companyAddresses.find(
            addr => addr.addressType === AddressType.Billing,
          )

          return (
            <AddressView
              categorizedAddress={getCategorizedAddressFromCompanyAddress(
                companyAddress as CompanyAddress,
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

          const contactRole = displayData[rowIndex]?.userRoles?.find(
            (role: UserRole) => role.roles?.find(r => r === RoleTypes.Contact),
          )

          return <CustomerPrimaryContact role={contactRole} />
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

      setShowDrawer(open)
    }

  const onEdit = (company: any) => {
    //setSelectedCompany(company)
  }

  const onCloseEdit = () => {
    //setSelectedCompany(null)
  }

  const handleRefreshCompanies = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  const handleDelete = (selectedRows: any) => {
    /*
    const idsToDelete = selectedRows.data.map(
      (d: any) => displayedCompanies[d.index].id,
    )

    // Now you can use idsToDelete to perform deletion.
    console.log(idsToDelete)
    */
  }

  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <SectionHeadingToolBar
        title={'Companies'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Company'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddCompanyClick}
        onRefreshButtonClicked={handleRefreshCompanies}
      />

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

      <SwipeableDrawer
        anchor="right"
        open={showDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            paddingTop: 10,
            paddingX: 2,
            minWidth: 300,
            minHeight: 400,
          }}
        >
          <Typography variant="h6">More Details</Typography>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}

export default Companies
