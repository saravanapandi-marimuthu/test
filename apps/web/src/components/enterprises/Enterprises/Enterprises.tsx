import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  CircularProgress,
  Backdrop,
  Box,
  Breadcrumbs,
  IconButton,
  Typography,
  Stack,
} from '@mui/material'
import { debounce } from 'lodash'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'

import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { useUser } from '../../../contexts/UserContext'
import FloatingDialog from '../../shared/FloatingDialog/FloatingDialog'
import { Link } from 'react-router-dom'
import { Column } from '../../../types/types'
import { MultiSelect } from '../../shared/MultiSelect/MultiSelect'
import AddRelatedCompany from '../../AddRelatedCompany/AddRelatedCompany'
import AddressView from '../../shared/address/AddressView/AddressView'
import TagChip from '../../shared/TagChip/TagChip'
import {
  AddressType,
  CompanyAddress,
  CompanyRelationshipTag,
  CompanyRelationshipType,
  CompanyServiceTypes,
  RelatedCompaniesDocument,
  RelatedCompanyView,
  RoleTypes,
  UserRole,
} from '../../../graphql/generated/graphql'
import getCategorizedAddressFromCompanyAddress from '../../../utilities/getCategorizedAddress'
import { CustomerPrimaryContact } from '../../CustomerPrimaryContact/CustomerPrimaryContact'

export const Enterprises: React.FC = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<RelatedCompanyView[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)

  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: user?.selectedUserRole?.companyId,
        companyRelationshipType:
          CompanyRelationshipType.EnterpriseServiceProvider,
        page,
        pageSize,
        //searchTerm,
        //sort,
        //filters,
        //tagFilters,
      },
    },
  })

  let handleCustomFilterSubmit: any

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
  }, [page, pageSize, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      console.log(data)
      setDisplayData(
        (data.relatedCompanies?.items as RelatedCompanyView[]) ?? [],
      )
      setTotalCount(data.relatedCompanies?.totalCount ?? 0)
    }
  }, [loading, data])

  const filterTagData = useMemo(() => {
    const dataTag = displayData
      .map((el: RelatedCompanyView) => {
        let dataTagNames: string[] = []
        el.companyRelationshipTags.forEach(el => {
          return (dataTagNames = [...dataTagNames, el.tag.name])
        })
        return dataTagNames
      })
      .flat()
    const uniqTagData = [...new Set(dataTag)]
    return uniqTagData
  }, [displayData])

  const handleRefreshCustomers = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  const columns: Column[] = [
    {
      name: 'companyName',
      label: 'Company Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RelatedCompanyView) => {
            return el?.company.name
          }),
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Company Name'}
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
          const customerCompanyId = displayData[rowIndex].company.id
          const companyName = encodeURIComponent(
            displayData[rowIndex].company.name,
          )

          return (
            <Link to={`/enterprises/${customerCompanyId}/${companyName}`}>
              {displayData[rowIndex].company.name}
            </Link>
          )
        },
      },
    },
    {
      name: 'companyTags',
      label: 'Tags',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: filterTagData,
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Tags'}
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
          const Tags = displayData[rowIndex].companyRelationshipTags

          return (
            <Stack
              sx={{ maxWidth: '240px' }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={1}
            >
              {Tags.map((el: CompanyRelationshipTag, ind: number) => {
                return (
                  <>
                    <TagChip
                      key={el.tag.id}
                      name={el.tag.name}
                      colorIndex={el.tag.colorIndex}
                    />
                  </>
                )
              })}
            </Stack>
          )
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex

          const companyAddress = displayData[
            rowIndex
          ].company.companyAddresses.find(
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
      name: 'contact',
      label: 'Primary Contact',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RelatedCompanyView) => {
            if (!el?.company.userRoles?.length) return ''
            return el?.company.userRoles[0].user?.firstName ?? ''
          }),
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Primary Contact'}
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

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          if (!displayData[rowIndex].company.userRoles) {
            return <></>
          }
          const contactRole = displayData[rowIndex]?.company.userRoles?.find(
            (role: UserRole) => role.roles?.find(r => r === RoleTypes.Contact),
          )

          return <CustomerPrimaryContact role={contactRole} />
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'multiselect',
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: pageSize,
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
    confirmFilters: true,
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
          setPageSize(tableState.rowsPerPage)
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

  const handleDialogClose = () => {
    setShowFloatingDialog(false)
  }

  const handleAddCustomerClick = (): void => {
    setShowFloatingDialog(true)
  }

  if (error) return <p>{'Error :('}</p>

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Sales
        </Link>
        <Typography color="text.primary">Enterprises</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Enterprises'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Account'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddCustomerClick}
        onRefreshButtonClicked={handleRefreshCustomers}
        middleComponent={
          <>
            <Box paddingX={2}>
              <IconButton>
                <BookmarkSimpleIcon size={18} />
              </IconButton>
              <IconButton>
                <DownloadSimpleIcon size={18} />
              </IconButton>
            </Box>
          </>
        }
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

      <FloatingDialog
        isOpen={showFloatingDialog}
        onClose={handleDialogClose}
        title="New Enterprise/Farm"
        totalNumberOfWindows={1}
        windowIndex={0}
      >
        <AddRelatedCompany
          companyServiceType={CompanyServiceTypes.Enterprise}
          tagCategoryName="Enterprise Item Type"
          labelMessage="Enterprise/Farm Company"
          successAndError={['New account is created', 'Error creating company']}
          companyRelationshipType={
            CompanyRelationshipType.EnterpriseServiceProvider
          }
          onClose={handleDialogClose}
          refetch={refetch}
        />
      </FloatingDialog>
    </div>
  )
}
