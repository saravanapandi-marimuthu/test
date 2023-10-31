import { useQuery } from '@apollo/client'
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { GET_USERS } from '../../../graphql/queries'
import UserRoles from '../UserRoles/UserRoles'
import { Edit as EditIcon } from '@mui/icons-material'
import InviteUsers from '../InviteUsers/InviteUsers'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { debounce } from 'lodash'
import UserAvatar from '../UserAvatar/UserAvatar'
import { UserInfo, UsersData } from '../../../types/userTypes'
import { Column } from '../../../types/types'
import { Link } from 'react-router-dom'
import { MultiSelect } from '../../shared/MultiSelect/MultiSelect'
import EditUser from '../EditUser/EditUser'
import {
  UsersDocument,
  UsersQuery,
  User,
} from '../../../graphql/generated/graphql'

const Users = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sortBy, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [displayData, setDisplayData] = useState<User[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  //const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<UsersQuery>(
    UsersDocument,
    {
      variables: {
        input: {
          page,
          pageSize,
          searchTerm,
          sortBy,
          //filters,
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
  }, [page, pageSize, searchTerm, sortBy, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData((data.users?.items as User[]) ?? [])
      setTotalCount(data.users?.totalCount ?? 0)
    }
  }, [loading, data])

  const handleAddUserClick = () => {
    setDrawerContent('add')
    setShowDrawer(true)
  }

  const handleEditUserClick = (userInfo: User) => {
    console.log(userInfo)
    setSelectedUser(userInfo)
    setDrawerContent('edit')
    setShowDrawer(true)
  }

  let handleCustomFilterSubmit: any

  const columns: Column[] = [
    {
      name: 'firstName',
      label: 'Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Name'}
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
          const userInfo = displayData[rowIndex]
          let initial = (userInfo.firstName ?? ' ')[0].trim()

          if (!initial) {
            initial = (userInfo.email ?? ' ')[0].trim()
          }

          return (
            <>
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <UserAvatar
                  initial={initial}
                  avatarUrl={userInfo.userSettings?.avatarUrl ?? undefined}
                  size={28}
                  useVariant={true}
                />
                <Typography>
                  {`${userInfo.firstName ?? ''} ${userInfo.lastName ?? ''}`}
                </Typography>
              </Stack>
            </>
          )
        },
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'e-mail'}
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
          return displayData[rowIndex].email
        },
      },
    },
    {
      name: 'roleCount',
      label: '#Roles',
      options: {
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return displayData[rowIndex].userRoles.length
        },
        filter: false,
      },
    },
    {
      name: 'Edit',
      label: 'edit',
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowIndex = tableMeta.rowIndex
          const userInfo = displayData[rowIndex]

          return (
            <IconButton onClick={() => handleEditUserClick(userInfo)}>
              <EditIcon />
            </IconButton>
          )
        },
        filter: false,
      },
    },
  ]

  const handleRefreshUsers = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
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
    expandableRows: true,
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
        case 'filterChange':
          console.log(tableState.filterList, tableState)

          let newFilters: any = []

          tableState.filterList.forEach((filter: any, index: number) => {
            // Ignore filters that are empty
            if (filter.length > 0) {
              let newFilter: any = {}
              newFilter.filterField = columns[index].name
              newFilter.filterValues = filter
              newFilters.push(newFilter)
            }
          })

          console.log(newFilters)
          setFilters(newFilters)

          break
      }
    },

    renderExpandableRow: (rowData: any, rowMeta: any) => {
      const roles = displayData[rowMeta.rowIndex].userRoles
      return (
        <React.Fragment>
          <tr>
            <td colSpan={5} align="center" className="p-2">
              <UserRoles key={`userRoles-${rowMeta.rowIndex}`} roles={roles} />
            </td>
          </tr>
        </React.Fragment>
      )
    },
  }

  if (error) return <p>{'Error :('}</p>

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Users
        </Link>
        <Typography color="text.primary">Customers</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Users'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add User'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddUserClick}
        onRefreshButtonClicked={handleRefreshUsers}
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
        {drawerContent === 'add' && <InviteUsers />}
        {drawerContent === 'edit' && (
          <EditUser userId={selectedUser?.id ?? ''} />
        )}
      </SwipeableDrawer>
    </>
  )
}

export default Users
