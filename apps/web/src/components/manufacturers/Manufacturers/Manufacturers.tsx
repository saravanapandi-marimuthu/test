import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  Link as MuiLink,
  CircularProgress,
  Backdrop,
  Box,
  Breadcrumbs,
  IconButton,
  Typography,
} from '@mui/material'
import { GET_MANUFACTURERS } from '../../../graphql/queries'
import { Link } from 'react-router-dom'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { debounce } from 'lodash'
import { Column } from '../../../types/types'
import { Manufacturer, ManufacturersData } from '../../../types/productTypes'
import { useUser } from '../../../contexts/UserContext'

const Manufacturers = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<Manufacturer[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<ManufacturersData>(
    GET_MANUFACTURERS,
    {
      variables: {
        companyId: user?.selectedUserRole?.companyId,
        page,
        perPage,
        searchTerm,
        sort,
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
    refetch().catch(e => console.log(e))
  }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(data.getManufacturers.manufacturers)
      setTotalCount(data.getManufacturers.totalCount)
    }
  }, [loading, data])

  const handleRefreshManufacturers = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  if (error) return <p>Error :(</p>

  const columns: Column[] = [
    {
      name: 'companyName',
      label: 'Manufacturer',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const mfgId = displayData[rowIndex].id
          const mfgName = encodeURIComponent(displayData[rowIndex].companyName)

          return (
            <Link to={`/manufacturer-products/${mfgId}/${mfgName}`}>
              {displayData[rowIndex].companyName}
            </Link>
          )
        },
      },
    },
    {
      name: 'productsCount',
      label: 'Products Count',
      options: {
        sortThirdClickReset: true,

        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="right" paddingRight={2}>
              {displayData[dataIndex].productsCount}
            </Box>
          )
        },
      },
    },
    {
      name: 'homePage',
      label: 'Home Page',
      options: {
        sort: false,

        customBodyRenderLite: dataIndex => {
          let homePage = displayData[dataIndex].homepage

          if (homePage) {
            if (
              !homePage.startsWith('http://') &&
              !homePage.startsWith('https://')
            ) {
              homePage = 'https://' + homePage
            }

            return (
              <MuiLink
                href={homePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {homePage}
              </MuiLink>
            )
          } else {
            return ''
          }
        },
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
        <Link color="inherit" to="/">
          Sales
        </Link>
        <Typography color="text.primary">Manufacturers</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Manufacturers'}
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
    </div>
  )
}

export default Manufacturers
