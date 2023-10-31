import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from 'mui-datatables'
import {
  Link as MuiLink,
  CircularProgress,
  Backdrop,
  Box,
  Breadcrumbs,
  IconButton,
  Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { debounce } from 'lodash'
import {
  PaymentTerm,
  PaymentTermsDocument,
} from '../../../graphql/generated/graphql'

interface Column extends MUIDataTableColumn {
  label: string
}

const PaymentTerms = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sortBy, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [displayData, setDisplayData] = useState<PaymentTerm[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)

  const { loading, error, data, refetch } = useQuery(PaymentTermsDocument, {
    variables: {
      input: {
        page,
        pageSize,
        searchTerm,
        sortBy,
        //filters
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
    console.log('FILTERS:', filters)
    refetch()
  }, [page, pageSize, searchTerm, sortBy, filters, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(data.paymentTerms?.items as PaymentTerm[])
      setTotalCount(data.paymentTerms?.totalCount ?? 0)
    }
  }, [loading, data])

  const handleRefreshPaymentTerms = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }

  if (error) return <p>Error :(</p>

  const columns: Column[] = [
    {
      name: 'termType',
      label: 'Term',
      options: {
        sortThirdClickReset: true,
        filterType: 'multiselect',

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box padding={1}>{displayData[rowIndex].termName}</Box>
        },
      },
    },
    {
      name: 'dueDays',
      label: 'Due in Days',
      options: {
        sort: false,
        filter: false,

        customBodyRenderLite: dataIndex => {
          let dueDays = displayData[dataIndex].dueDays

          if (dueDays && dueDays > 0) {
            return (
              <Box textAlign="right" paddingRight={2}>
                {dueDays}
              </Box>
            )
          } else {
            return ''
          }
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        sort: false,
        filter: false,

        customBodyRenderLite: dataIndex => {
          return displayData[dataIndex].description
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
    selectableRows: 'none',

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
  }

  return (
    <div>
      <SectionHeadingToolBar
        title={'Payment Terms'}
        loading={loading}
        hasAddButton={false}
        hasRefreshButton={true}
        onRefreshButtonClicked={handleRefreshPaymentTerms}
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

export default PaymentTerms
