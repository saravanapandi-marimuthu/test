import moment from 'moment'
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
import { Link } from 'react-router-dom'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { debounce } from 'lodash'
import { useUser } from '../../contexts/UserContext'
import { Column } from '../../types/types'
import SectionHeadingToolBar from '../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import FloatingDialog from '../shared/FloatingDialog/FloatingDialog'
import AddPurchaseOrder from './AddPurchaseOrder/AddPurchaseOrder'
import {
  PurchaseOrder,
  PurchaseOrdersDocument,
  PurchaseOrdersQuery,
} from '../../graphql/generated/graphql'
import ZenTable from '../../zen_components/table/ZenTable/ZenTable'
import { ZenTableColumn } from '../../zen_components/table/types/ZenTableColumn'
import ColumnHeader from '../../zen_components/table/ColumnHeader/ColumnHeader'
import { HashtagIcon } from '@heroicons/react/24/solid'
import SingleLineTextBox from '../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'
import { ZenTableOptions } from '../../zen_components/table/types/ZenTableOptions'

const PurchaseOrders = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [displayData, setDisplayData] = useState<PurchaseOrder[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)
  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<PurchaseOrdersQuery>(
    PurchaseOrdersDocument,
    {
      variables: {
        input: {
          companyId: user?.selectedUserRole?.companyId,
          // page,
          // perPage,
          // searchTerm,
          // sort,
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

  // useEffect(() => {
  //   refetch().catch(e => console.log(e))
  // }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData((data.purchaseOrders?.items as PurchaseOrder[]) ?? [])
      setTotalCount(data.purchaseOrders?.totalCount || 0)
    }
  }, [loading, data])

  const handleRefreshPurchaseOrders = async () => {
    setIsManualRefetching(true)
    await refetch()
    // setDisplayData(data.purchaseOrders?.items || [])
    // setTotalCount(data.purchaseOrders?.totalCount || 0)
    setIsManualRefetching(false)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const handleDialogClose = () => {
    setShowFloatingDialog(false)
  }

  const handleAddPurchaseOrderClick = (): void => {
    setShowFloatingDialog(true)
  }

  const columns: ZenTableColumn<any>[] = [
    {
      name: 'orderStatus',
      label: 'Status',
      sortable: true,
      HeaderComponent: props => (
        <ColumnHeader icon={HashtagIcon} name={'Status'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <SingleLineTextBox
          value={rowData.orderStatus}
          onChange={function (newValue: string): void {
            console.log('SingleLineTextBox', newValue)
          }}
        />
      ),
    },
    {
      name: 'orderNumber',
      label: 'Order',
      HeaderComponent: props => (
        <ColumnHeader icon={HashtagIcon} name={'Order'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <SingleLineTextBox
          value={rowData.orderNumber}
          onChange={function (newValue: string): void {
            console.log('SingleLineTextBox', newValue)
          }}
        />
      ),
    },
    {
      name: 'vendorName',
      label: 'Vendor',
      HeaderComponent: props => (
        <ColumnHeader icon={HashtagIcon} name={'Vendor'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <SingleLineTextBox
          value={rowData.vendorCompany?.name ?? ''}
          onChange={function (newValue: string): void {
            console.log('SingleLineTextBox', newValue)
          }}
        />
      ),
    },
    {
      name: 'totalPrice',
      label: 'Price',
      HeaderComponent: props => (
        <ColumnHeader icon={HashtagIcon} name={'Price'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <SingleLineTextBox
          value={formatPrice(rowData.totalPrice)}
          onChange={function (newValue: string): void {
            console.log('SingleLineTextBox', newValue)
          }}
        />
      ),
    },
    {
      name: 'dateOrdered',
      label: 'Purchase Date',
      HeaderComponent: props => (
        <ColumnHeader icon={HashtagIcon} name={'Purchase Date'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <SingleLineTextBox
          value={moment(rowData.dateOrdered).format('MM/DD/YYYY')}
          onChange={function (newValue: string): void {
            console.log('SingleLineTextBox', newValue)
          }}
        />
      ),
    },
  ]

  const options: ZenTableOptions<any> = {
    pageSize: 10,
    currentPage: 0,
    searchFilter: '',
    rowContextMenuEnabled: false,
    lassoSelectEnabled: true,
    rowReorderEnabled: true,
    // rowActionMenu: MyCustomMenu,
    // rowActions: [
    //   {
    //     label: 'Test Action',
    //     action: testAction,
    //   },
    // ],
  }

  if (error) return <p>Error :(</p>

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Inventory
        </Link>
        <Typography color="text.primary">Purchase Orders</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Purchase Orders'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'New Purchase Order'}
        onAddButtonClicked={handleAddPurchaseOrderClick}
        hasRefreshButton={true}
        onRefreshButtonClicked={handleRefreshPurchaseOrders}
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
        {/* <MUIDataTable
          title={''}
          data={displayData}
          columns={columns}
          options={options}
        /> */}
        <ZenTable
          columns={columns}
          data={displayData}
          idField={'id'}
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
        title="New Purchase Order"
        totalNumberOfWindows={1}
        windowIndex={0}
      >
        <AddPurchaseOrder
          successAndError={[
            'New purachase order is created',
            'Error creating purachase order',
          ]}
          onClose={handleDialogClose}
          refetch={refetch}
        />
      </FloatingDialog>
    </div>
  )
}

export default PurchaseOrders
