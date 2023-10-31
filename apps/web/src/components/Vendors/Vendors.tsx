import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  Box,
  Breadcrumbs,
  IconButton,
  Typography,
  Stack,
  Chip,
  Avatar,
} from '@mui/material'
import { debounce } from 'lodash'
import SectionHeadingToolBar from '../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { grey } from '@mui/material/colors'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { useUser } from '../../contexts/UserContext'
import FloatingDialog from '../shared/FloatingDialog/FloatingDialog'
import UserAvatar from '../users/UserAvatar/UserAvatar'
import { Link } from 'react-router-dom'
import { Column } from '../../types/types'
import { MultiSelect } from '../shared/MultiSelect/MultiSelect'
import { useThemeMode } from '../../contexts/ThemeContext'
import AddRelatedCompany from '../AddRelatedCompany/AddRelatedCompany'
import { CategorizedAddress } from '../../types/sharedTypes'
import { AddressView } from '../shared/address/AddressView/AddressView'
import TagChip from '../shared/TagChip/TagChip'
import {
  AddressType,
  CompanyAddress,
  CompanyRelationshipType,
  CompanyServiceTypes,
  RelatedCompaniesDocument,
  RelatedCompanyView,
  RoleTypes,
  UserRole,
} from '../../graphql/generated/graphql'
import getCategorizedAddressFromCompanyAddress from '../../utilities/getCategorizedAddress'
import { CustomerPrimaryContact } from '../CustomerPrimaryContact/CustomerPrimaryContact'

export interface AddressProp {
  address?: CategorizedAddress
}

export const Vendors: React.FC = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [filters, setFilters] = useState([])
  const [tagFilters, setTagFilters] = useState([])
  const [displayData, setDisplayData] = useState<RelatedCompanyView[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)
  const { theme, toggleTheme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  const { user } = useUser()
  const { loading, error, data, refetch } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: user?.selectedUserRole?.companyId,
        companyRelationshipType: CompanyRelationshipType.Vendor,
        page,
        pageSize,
        searchTerm,
        sortBy,
        // filters,
        // tagFilters,
      },
    },
  })

  let handleCustomFilterSubmit: any

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
  }, [page, pageSize, searchTerm, sortBy, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(
        (data.relatedCompanies?.items as RelatedCompanyView[]) ?? [],
      )
      setTotalCount(data.relatedCompanies?.totalCount ?? 0)
    }
  }, [loading, data])

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
          return (
            <Link to={`/vendors/${customerCompanyId}`}>
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
              {Tags.map((el: any, ind: number) => {
                return (
                  <>
                    <TagChip
                      key={el.tag.id}
                      name={el.tag.tagName}
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
            setSortBy(
              `${tableState.sortOrder.name}:${tableState.sortOrder.direction}`,
            )
          } else {
            setSortBy('')
          }
          break
        case 'filterChange':
          let newFilters: any = []
          let newTagFilters: any = []

          tableState.filterList.forEach((filter: any, index: number) => {
            // Ignore filters that are empty
            if (filter.length > 0) {
              let newFilter: any = {}
              if (columns[index].name === 'companyTags') {
                let tagFilters = displayData
                  .map((elCust: RelatedCompanyView) => {
                    let foo: any = []
                    elCust.companyRelationshipTags.forEach(elTag => {
                      return (foo = [
                        ...foo,
                        {
                          tagCategoryName: elTag.tag.tagCategory?.name,
                          tagName: elTag.tag.name,
                        },
                      ])
                    })
                    return foo
                  })
                  .flat()
                  .filter(el =>
                    filter.some((elFilter: string) => elFilter === el.tagName),
                  )

                const uniqueData = Array.from(
                  new Set(tagFilters.map((item: any) => item.tagName)),
                ).map(tagName =>
                  tagFilters.find((item: any) => item.tagName === tagName),
                )

                newTagFilters = uniqueData
                return
              }
              newFilter.filterField = columns[index].name
              newFilter.filterValues = filter
              newFilters.push(newFilter)
            }
          })

          setTagFilters(newTagFilters)
          setFilters(newFilters)

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
          Home
        </Link>
        <Typography color="text.primary">Vendors</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Vendors'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Vendor'}
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

      <MUIDataTable
        title={''}
        data={displayData}
        columns={columns}
        options={options}
      />

      <FloatingDialog
        isOpen={showFloatingDialog}
        onClose={handleDialogClose}
        title="New Vendors"
        totalNumberOfWindows={1}
        windowIndex={0}
      >
        <AddRelatedCompany
          companyServiceType={CompanyServiceTypes.ServiceProvider}
          tagCategoryName="Vendor Type"
          labelMessage="Vendor (Labs, Distributors, etc.)"
          successAndError={['New vendor is created', 'Error creating company']}
          companyRelationshipType={CompanyRelationshipType.Vendor}
          allowMultipleTags={true}
          onClose={handleDialogClose}
          refetch={refetch}
        />
      </FloatingDialog>
    </div>
  )
}
