import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { Link } from 'react-router-dom'
import {
  BookmarkSimple as BookmarkSimpleIcon,
  DownloadSimple as DownloadSimpleIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@apollo/client'
import {
  ProductCategory,
  RetailerProduct,
  RetailerProductsDocument,
  RetailerProductsQuery,
} from '../../../graphql/generated/graphql'
import { useUser } from '../../../contexts/UserContext'
import { ZenTableColumn } from '../../../zen_components/table/types/ZenTableColumn'
import ColumnHeader from '../../../zen_components/table/ColumnHeader/ColumnHeader'
import { ZenTableOptions } from '../../../zen_components/table/types/ZenTableOptions'
import ZenTable from '../../../zen_components/table/ZenTable/ZenTable'
import FloatingDialog from '../../shared/FloatingDialog/FloatingDialog'
import { AddRetailerProduct } from '../AddRetailerProduct/AddRetailerProduct'
import EnumPicker from '../../../zen_components/selectors/EnumPicker/EnumPicker'
import Multi from '../../EditableTable/img/Multi'
import MultiLineTextBox from '../../shared/textEditors/MultiLineTextBox/MultiLineTextBox'
import RetailerProductDetails from '../RetailerProductDetails/RetailerProductDetails'
import SingleLineTextBox from '../../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

const RetailerProducts: React.FC = () => {
  console.log('RetailerProducts')

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = React.useState('')
  const [sortDesc, setSortDesc] = React.useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<RetailerProduct>>
  >({})
  const [localData, setLocalData] = useState<RetailerProduct[]>([])

  const [selectedProduct, setSelectedProduct] =
    useState<RetailerProduct | null>(null)

  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<RetailerProductsQuery>(
    RetailerProductsDocument,
    {
      variables: {
        input: {
          retailerCompanyId: user?.selectedUserRole?.companyId,
          page,
          pageSize,
          searchTerm,
          sortBy,
          sortDesc,
        },
      },
      onCompleted: data => {
        if (data?.retailerProducts?.items) {
          setLocalData((data.retailerProducts.items as RetailerProduct[]) ?? [])
        }
      },
    },
  )

  const handleDialogClose = () => {
    setShowFloatingDialog(false)
  }

  const handleAddProductClick = () => {
    setShowFloatingDialog(true)
  }

  const handleRefreshProducts = () => {
    console.log('handleRefreshProducts')
    refetch()
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

  const updateEditedRow = (
    id: number,
    key: keyof RetailerProduct,
    value: any,
  ) => {
    // Update editedRows for tracking changes
    setEditedRows(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [key]: value,
      },
    }))

    // Update localData to reflect changes in UI
    setLocalData(prevData => {
      const updatedData = [...prevData]
      const rowIndex = updatedData.findIndex(row => row.id === id)
      if (rowIndex !== -1) {
        updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: value }
      }
      return updatedData
    })
  }

  const columns: ZenTableColumn<RetailerProduct>[] = [
    {
      name: 'name',
      label: 'Name',
      sortable: true,
      HeaderComponent: props => <ColumnHeader name={'Name'} {...props} />,
      CellComponent: ({ rowData }) => (
        <Stack direction={'row'} spacing={0.5}>
          <SingleLineTextBox
            textAlign="left"
            value={rowData.productName}
            onChange={(newValue: string) => {
              console.log('SingleLineTextBox', newValue)
              updateEditedRow(rowData.id, 'productName', newValue)
            }}
          />
          <Box
            sx={{
              display: 'flex', // use flexbox
              alignItems: 'center', // vertical centering
            }}
          >
            <Button
              variant="outlined"
              className="ZenTable-showOnHover"
              sx={{
                visibility: 'hidden',
              }}
              onClick={() => {
                setSelectedProduct(rowData)
                setShowDrawer(true)
              }}
            >
              Open
            </Button>
          </Box>
        </Stack>
      ),
    },
    {
      name: 'sku',
      label: 'SKU',
      width: '130px',
      sortable: true,
      HeaderComponent: props => <ColumnHeader name={'SKU'} {...props} />,
      CellComponent: ({ rowData }) => (
        <Box>
          <SingleLineTextBox
            textAlign="left"
            value={rowData.sku as string}
            onChange={(newValue: string) => {
              console.log('SingleLineTextBox', newValue)
              updateEditedRow(rowData.id, 'sku', newValue)
            }}
          />
        </Box>
      ),
    },

    {
      name: 'productCategory',
      label: 'Category',
      width: '150px',
      sortable: false,
      HeaderComponent: props => <ColumnHeader name={'Category'} {...props} />,
      CellComponent: ({ rowData }) => (
        <Box display={'flex'}>
          <EnumPicker
            width={'100%'}
            queryType={'productCategories'}
            selectedEnum={rowData.productCategoryInfo?.value ?? ''}
            onChange={(newValue: string, selectedEnum: any) => {
              updateEditedRow(rowData.id, 'productCategory', newValue)
              updateEditedRow(rowData.id, 'productCategoryInfo', selectedEnum)
            }}
            allowNone={true}
          />
        </Box>
      ),
    },
    {
      name: 'productType',
      label: 'Type',
      sortable: false,
      HeaderComponent: props => <ColumnHeader name={'Type'} {...props} />,
      CellComponent: ({ rowData }) => (
        <Box display={'flex'}>
          <EnumPicker
            width={'300px'}
            queryType={'productTypes'}
            selectedEnum={rowData.productTypeInfo?.value ?? ''}
            onChange={(newValue: string, selectedEnum: any) => {
              updateEditedRow(rowData.id, 'productType', newValue)
              updateEditedRow(rowData.id, 'productTypeInfo', selectedEnum)
            }}
            allowNone={true}
            hintText="Select a Product Type"
          />
        </Box>
      ),
    },
    {
      name: 'description',
      label: 'Description',
      sortable: false,
      HeaderComponent: props => (
        <ColumnHeader name={'Description'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <Box
          display={'flex'}
          sx={{
            minWidth: '300px',
            minHeight: '30px',
            width: '100%',
          }}
        >
          <MultiLineTextBox
            value={rowData.description as string}
            onEditSave={(newValue?: string) => {
              console.log('MultiLineTextBox', newValue)
              updateEditedRow(rowData.id, 'description', newValue)
            }}
          />
          <Typography>{rowData.description}</Typography>
        </Box>
      ),
    },
  ]

  const options: ZenTableOptions<RetailerProduct> = {
    pageSize: pageSize,
    currentPage: page,
    sortBy: sortBy,
    sortDesc: sortDesc,
    searchFilter: searchTerm,
    totalCount: data?.retailerProducts?.totalCount ?? 0,
    rowContextMenuEnabled: true,
    lassoSelectEnabled: true,
    rowReorderEnabled: true,
    onSortChange(sortBy, isDescending) {
      console.log('onSortChange', sortBy, isDescending)
      setSortBy(sortBy)
      setSortDesc(isDescending)
    },
    onPageChange: (newPage: number) => {
      console.log('onPageChange', newPage)
      setPage(newPage)
    },
    // rowActionMenu: MyCustomMenu,
    // rowActions: [
    //   {
    //     label: 'Test Action',
    //     action: testAction,
    //   },
    // ],
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Products'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Product'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddProductClick}
        onRefreshButtonClicked={handleRefreshProducts}
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
      <Box>
        {!loading && data?.retailerProducts?.items && (
          <ZenTable
            columns={columns}
            data={localData}
            idField={'id'}
            options={options}
          />
        )}
      </Box>

      <FloatingDialog
        isOpen={showFloatingDialog}
        onClose={handleDialogClose}
        title="New Product"
        totalNumberOfWindows={1}
        windowIndex={0}
      >
        <AddRetailerProduct onClose={handleDialogClose} refetch={refetch} />
      </FloatingDialog>
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
            width: 600,
            minWidth: 600,
            minHeight: 400,
          }}
        >
          {selectedProduct && (
            <RetailerProductDetails retailerProductId={selectedProduct.id} />
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  )
}

export default RetailerProducts
