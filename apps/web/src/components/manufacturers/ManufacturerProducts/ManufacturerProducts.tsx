import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  CircularProgress,
  Backdrop,
  Box,
  Breadcrumbs,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material'
import { GET_MANUFACTURER_PRODUCTS } from '../../../graphql/queries'
import { Link } from 'react-router-dom'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  Check as CheckIcon,
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { debounce } from 'lodash'
import { Column } from '../../../types/types'
import { useUser } from '../../../contexts/UserContext'
import FloatingDialog from '../../shared/FloatingDialog/FloatingDialog'
import { AddProductToRetailerCatalog } from '../AddProductToRetailerCatalog/AddProductToRetailerCatalog'
import AddIcon from '@mui/icons-material/Add'
import {
  ManufacturerProduct,
  ManufacturerProductsDocument,
  ManufacturerProductsQuery,
} from '../../../graphql/generated/graphql'

export interface ManufacturerProductsProp {
  manufacturerId?: string
  manufacturerName?: string
}

const ManufacturerProducts: React.FC<ManufacturerProductsProp> = ({
  manufacturerId,
  manufacturerName = 'All Available Products',
}) => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<ManufacturerProduct[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ManufacturerProduct>()
  const { user } = useUser()

  const { loading, error, data, refetch, fetchMore } =
    useQuery<ManufacturerProductsQuery>(ManufacturerProductsDocument, {
      variables: {
        input: {
          page,
          pageSize: perPage,
          searchTerm,
          sortBy: sort,
        },
      },
    })

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
    refetch().catch(e => console.log(e))
  }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    console.log(data)
    if (!loading && data) {
      setDisplayData(
        (data.manufacturerProducts?.items as ManufacturerProduct[]) ?? [],
      )
      setTotalCount(data.manufacturerProducts?.totalCount ?? 0)
    }
  }, [loading, data])

  const handleDialogClose = () => {
    setSelectedProduct(undefined)
  }

  const handleRefreshManufacturers = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  if (error) return <p>Error :(</p>

  let columns: Column[] = [
    {
      name: 'productName',
      label: 'Product Name',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const mfgId = displayData[rowIndex].id

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
              <Box>{displayData[rowIndex].productName}</Box>
              <Button
                className="open-add-screen"
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  opacity: 0,
                  transition: '0.1s',
                  fontSize: 12,
                  p: 0,
                }}
                onClick={() => {
                  setSelectedProduct(displayData[rowIndex])
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
      name: 'commonName',
      label: 'Common Name',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const mfgId = displayData[rowIndex].id

          return displayData[rowIndex].commonName
        },
      },
    },
  ]

  if (manufacturerName === 'All Available Products') {
    columns.push({
      name: 'manufacturerName',
      label: 'Manufacturer',
      options: {
        sortThirdClickReset: true,

        customBodyRenderLite: dataIndex => {
          return (
            <Box paddingRight={2}>
              {displayData[dataIndex].manufacturerName}
            </Box>
          )
        },
      },
    })
  }

  columns = columns.concat([
    {
      name: 'EPA',
      label: 'EPA',
      options: {
        sortThirdClickReset: true,

        customBodyRenderLite: dataIndex => {
          return <Box paddingRight={2}>{displayData[dataIndex].epa}</Box>
        },
      },
    },
    {
      name: 'labelDAT',
      label: 'Label',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return displayData[rowIndex].labelDAT
        },
      },
    },
    {
      name: 'isUS',
      label: 'Available in US',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return displayData[rowIndex].isUs === true ? (
            <Box display="flex" justifyContent="center" alignContent="center">
              <CheckIcon />
            </Box>
          ) : (
            ''
          )
        },
      },
    },
  ])

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

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Manufacturers</Typography>
        <Link color="inherit" to="/manufacturers">
          Manufacturers
        </Link>
        <Typography color="text.primary">{manufacturerName}</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={manufacturerName}
        loading={loading}
        hasAddButton={false}
        hasRefreshButton={true}
        onRefreshButtonClicked={handleRefreshManufacturers}
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
      {selectedProduct && (
        <FloatingDialog
          isOpen={selectedProduct !== undefined}
          onClose={handleDialogClose}
          title="New Product"
          totalNumberOfWindows={1}
          windowIndex={0}
          height={500}
        >
          <AddProductToRetailerCatalog
            onClose={handleDialogClose}
            refetch={refetch}
            manufacturerProduct={selectedProduct}
          />
        </FloatingDialog>
      )}
    </div>
  )
}

export default ManufacturerProducts
