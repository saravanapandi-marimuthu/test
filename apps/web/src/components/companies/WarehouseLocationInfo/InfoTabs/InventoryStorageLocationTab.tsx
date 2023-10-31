import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  CircularProgress,
  Backdrop,
  Box,
  IconButton,
  Typography,
  Stack,
  SwipeableDrawer,
} from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import React, { useEffect, useMemo, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { GET_STORAGE_LOCATIONS } from '../../../../graphql/queries'
import {
  GetStorageLocationsData,
  StorageLocation,
} from '../../../../types/storageLocationsTypes'
import { debounce } from 'lodash'
import { Column } from '../../../../types/types'
import { MultiSelect } from '../../../shared/MultiSelect/MultiSelect'
import { useUser } from '../../../../contexts/UserContext'
import useMuiDatatablesFilter from '../../../../hooks/useMuiDatatablesFilter'
import { useParams } from 'react-router-dom'
import SectionHeadingToolBar from '../../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { AddStorageLocation } from './AddStorageLocation/AddStorageLocation'
import TagChip from '../../../shared/TagChip/TagChip'
import InviteUsers from '../../../users/InviteUsers/InviteUsers'
import EditStorageLocation from './EditStorageLocation/EditStorageLocation'
import {
  StorageLocationsDocument,
  StorageLocationsQuery,
} from '../../../../graphql/generated/graphql'

function InventoryStorageLocationTab() {
  const { id } = useParams()
  const { user } = useUser()
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [tagFilters, setTagFilters] = useState([])
  const [displayData, setDisplayData] = useState<any>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  // const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)

  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState('')
  const [selectedInfo, setSelectedInfo] = useState<StorageLocation | null>(null)

  const { loading, error, data, refetch } = useQuery<StorageLocationsQuery>(
    StorageLocationsDocument,
    {
      variables: {
        input: {
          warehouseId: parseInt(id ?? '-1'),
          // page,
          // perPage,
          // searchTerm,
          // sort,
          // filters,
          // tagFilters,
        },
      },
    },
  )

  const filterTagData = useMemo(() => {
    const dataTag = displayData
      .map((el: any) => {
        return el.storageLocationType?.name
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
  }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(data.storageLocations?.items)
      setTotalCount(data.storageLocations?.totalCount ?? 0)
    }
  }, [loading, data])

  const handleEditLocationClick = (locationInfo: StorageLocation) => {
    console.log(locationInfo)
    setSelectedInfo(locationInfo)
    setDrawerContent('edit')
    setShowDrawer(true)
  }

  let handleCustomFilterSubmit: any
  const nameFilter = useMuiDatatablesFilter('Name', handleCustomFilterSubmit)
  const desciptionFilter = useMuiDatatablesFilter(
    'Description',
    handleCustomFilterSubmit,
  )

  const handleRefreshStorageLocations = async () => {
    setIsManualRefetching(true)
    const { data } = await refetch()
    setDisplayData(data.storageLocations?.items)
    setTotalCount(data.storageLocations?.totalCount ?? 0)
    setIsManualRefetching(false)
  }

  const columns: Column[] = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: StorageLocation) => {
            return el?.name
          }),
          display: nameFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].name}</Typography>
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: StorageLocation) => {
            return el?.description
          }),
          display: desciptionFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].description}</Typography>
        },
      },
    },
    {
      name: 'storageType',
      label: 'Type',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: filterTagData,
          // display: tagsFilter,
          display: (filterList, onChange, index, column, filterData) => {
            return (
              <MultiSelect
                label={'Type'}
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
          const storageTypeTag = displayData[rowIndex].storageLocationType
          return (
            <Stack
              sx={{ maxWidth: '240px' }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={1}
            >
              <TagChip
                key={storageTypeTag.id}
                name={storageTypeTag.name}
                colorIndex={storageTypeTag.colorIndex}
              />
            </Stack>
          )
        },
      },
    },
    {
      name: 'parentId',
      label: 'Parent',
      options: {
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return (
            <Typography>
              {displayData[rowIndex]?.parentStorageLocationId
                ? displayData.find(
                    p => p.id === displayData[rowIndex].parentStorageLocationId,
                  )?.name
                : '-'}
            </Typography>
          )
        },
      },
    },
    {
      name: 'identifier',
      label: 'Identifier',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: StorageLocation) => {
            return el?.identifier
          }),
          display: desciptionFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].identifier}</Typography>
        },
      },
    },
    {
      name: 'barcode',
      label: 'Barcode',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: StorageLocation) => {
            return el?.barcode
          }),
          display: desciptionFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].barcode}</Typography>
        },
      },
    },
    {
      name: 'Edit',
      label: 'Edit',
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowIndex = tableMeta.rowIndex
          const locationInfo = displayData[rowIndex]

          return (
            <IconButton onClick={() => handleEditLocationClick(locationInfo)}>
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

      // setShowFloatingDialog(open)
      setShowDrawer(open)
    }

  const handleDialogClose = () => {
    // setShowFloatingDialog(false)
    setShowDrawer(false)
  }

  const handleAddCustomerClick = (): void => {
    setDrawerContent('add')
    setShowDrawer(true)
  }

  if (error) return <p>{'Error :('}</p>

  return (
    <div>
      <SectionHeadingToolBar
        title={''}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Storage Location'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddCustomerClick}
        onRefreshButtonClicked={handleRefreshStorageLocations}
        // middleComponent={
        //   <>
        //     <Box paddingX={2}>
        //       <IconButton>
        //         <BookmarkSimpleIcon size={18} />
        //       </IconButton>
        //       <IconButton>
        //         <DownloadSimpleIcon size={18} />
        //       </IconButton>
        //     </Box>
        //   </>
        // }
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
        {drawerContent === 'add' && (
          <AddStorageLocation
            onClose={handleDialogClose}
            refetch={refetch}
            parentData={displayData}
          />
        )}
        {drawerContent === 'edit' && (
          <EditStorageLocation
            onClose={handleDialogClose}
            refetchList={refetch}
            locationId={Number(selectedInfo?.id)}
            parentData={displayData}
          />
        )}
      </SwipeableDrawer>
    </div>
  )
}

export default InventoryStorageLocationTab
