import { useMutation, useQuery } from '@apollo/client'
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
import { GET_RETAILER_PRODUCTS } from '../../graphql/queries'
import { debounce } from 'lodash'
import SectionHeadingToolBar from '../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
  PencilSimpleLine,
} from '@phosphor-icons/react'
import { useUser } from '../../contexts/UserContext'
import FloatingDialog from '../shared/FloatingDialog/FloatingDialog'
import { Link } from 'react-router-dom'
import { Column } from '../../types/types'
import { AddRetailerProduct } from '../retailerProducts/AddRetailerProduct/AddRetailerProduct'
import { useThemeMode } from '../../contexts/ThemeContext'
import {
  RetailerProduct,
  RetailerProductTag,
  RetailerProductsData,
} from '../../types/productTypes'
import { FlexModal } from '../Modals/FlexModal/FlexModal'
import { EditRetailerProduct } from './EditRetailerProduct/EditRetailerProduct'
import { AddNewField } from '../shared/Table/AddNewField'
import { UPDATE_RETAILER_PRODUCT } from '../../graphql/mutations'
import { RetailerProductComponents } from './RetailerProductComponents'
import useMuiDatatablesFilter from '../../hooks/useMuiDatatablesFilter'
import {
  Tag,
  UnitOfMeasurement,
  UnitOfMeasurementDocument,
  UnitOfMeasurementQuery,
} from '../../graphql/generated/graphql'
import { TagPicker } from '../shared/TagPicker/TagPicker'

const customTableBodyFooterRender = (options: any, handleAddRowFooter: any) => {
  const { columns } = options

  return (
    <AddNewField
      columns={columns}
      onAddNewField={handleAddRowFooter}
      label="Retailer Product"
    />
  )
}

const customBodyRenderTags = (
  value: any,
  tableMeta: any,
  updateValue: any,
  displayData: RetailerProduct[],
  onEditTag: (product: RetailerProduct, newValue: Tag[]) => void,
) => {
  const rowIndex = tableMeta.rowIndex
  const retailerProduct = displayData[rowIndex]
  const Tags = retailerProduct.retailerProductTags?.map(el => el.tag)
  return (
    <Stack
      sx={{ maxWidth: '240px' }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      spacing={1}
    >
      <TagPicker
        selectedTags={Tags}
        tagCategoryName={'Product Type'}
        onSelectedTagsChanged={tags => {
          onEditTag(retailerProduct, tags)
        }}
        multiple={true}
        showAsMuiSelect={false}
      />
    </Stack>
  )
}

export const RetailerProducts: React.FC = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [tagFilters, setTagFilters] = useState([])
  const [displayData, setDisplayData] = useState<RetailerProduct[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const [showFloatingDialog, setShowFloatingDialog] = useState<boolean>(false)

  // EDIT PARAMS
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [editProduct, setEditProduct] = useState<RetailerProduct | null>(null)

  const { theme, toggleTheme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  let handleCustomFilterSubmit: any
  const productNameFilter = useMuiDatatablesFilter(
    'Product Name',
    handleCustomFilterSubmit,
  )
  const skuFilter = useMuiDatatablesFilter('SKU', handleCustomFilterSubmit)
  const tagsFilter = useMuiDatatablesFilter('Tags', handleCustomFilterSubmit)

  const { user } = useUser()
  const { loading, error, data, refetch } = useQuery<RetailerProductsData>(
    GET_RETAILER_PRODUCTS,
    {
      variables: {
        companyId: user?.selectedUserRole?.companyId,
        page,
        perPage,
        searchTerm,
        sort,
        filters,
        tagFilters,
      },
    },
  )
  const [updateRetailerProduct] = useMutation(UPDATE_RETAILER_PRODUCT)

  const filterTagData = useMemo(() => {
    const dataTag = displayData
      .map((el: RetailerProduct) => {
        let dataTagNames: string[] = []
        el.retailerProductTags?.forEach(el => {
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
  }, [page, perPage, searchTerm, sort, refetch])

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(data.getRetailerProducts.products)
      setTotalCount(data.getRetailerProducts.totalCount)
    }
  }, [loading, data])

  useEffect(() => {}, [data])
  const [unitOfMeasurementData, setUnitOfMeasurementData] = useState<any[]>([])
  const {
    loading: unitOfMeasurementLoading,
    error: unitOfMeasurementError,
    data: unitOfMeasurementsRespData,
  } = useQuery<UnitOfMeasurementQuery>(UnitOfMeasurementDocument, {
    variables: {
      input: {},
    },
  })

  useEffect(() => {
    if (!unitOfMeasurementLoading && unitOfMeasurementsRespData) {
      const unitOfMeasurements = unitOfMeasurementsRespData?.unitOfMeasurements
        ?.items as UnitOfMeasurement[]
      const unitOfMeasurementData = unitOfMeasurements.map(
        (unitOfMeasurement: any) => {
          return {
            id: unitOfMeasurement.id,
            name: unitOfMeasurement.unitName,
          }
        },
      )
      setUnitOfMeasurementData(unitOfMeasurementData)
    }
  }, [unitOfMeasurementLoading, unitOfMeasurementsRespData])

  const handleRefreshCustomers = async () => {
    setIsManualRefetching(true)
    const { data } = await refetch()
    setDisplayData(data.getRetailerProducts.products)
    setTotalCount(data.getRetailerProducts.totalCount)
    setIsManualRefetching(false)
  }

  const handleAddRowFooter = () => {
    setDisplayData([
      ...displayData,
      {
        companyId: '',
        productSku: '',
        productName: 'new name',
        retailerProductTags: [],
        retailerProductComponents: [],
      },
    ])
  }

  /* Function to remove empty array from object */
  const cleanObject = (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => !Array.isArray(value) || value.length > 0,
      ),
    )
  }

  const onEditTag = async (product: RetailerProduct, tags: Tag[]) => {
    const tagNamesAddedToFilter = product?.retailerProductTags?.map(
      (item: RetailerProductTag) => item.tag.name,
    )
    const tagsAdded = tags
      ?.filter((item: any) => !tagNamesAddedToFilter?.includes(item.tagName))
      ?.map((el: any) => {
        return {
          tagName: el.tagName,
          tagCategoryName: el.tagCategory.tagCategoryName,
        }
      })

    const tagNamesRemovedToFilter = tags?.map((item: any) => item.tagName)

    const tagsRemoved = product?.retailerProductTags
      ?.filter(
        (item: RetailerProductTag) =>
          !tagNamesRemovedToFilter.includes(item.tag.name),
      )
      ?.map((el: any) => {
        return {
          tagName: el.tag.tagName,
          tagCategoryName: el.tag.tagCategory.tagCategoryName,
        }
      })

    const updateProductJSON = {
      productName: product.productName,
      productSku: product.productSku,
      retailerCompanyId: user?.selectedUserRole?.companyId,
    }

    const editedProduct = cleanObject({
      ...updateProductJSON,
      tagsAdded,
      tagsRemoved,
    })
    try {
      const result = await updateRetailerProduct({
        variables: {
          input: {
            ...editedProduct,
          },
        },
      })
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  // @ts-ignore:
  const columns: Column[] = [
    {
      name: 'productName',
      label: 'Product Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RetailerProduct) => {
            return el?.productName
          }),
          display: productNameFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].productName}</Typography>
        },
      },
    },
    {
      name: 'productSku',
      label: 'SKU',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RetailerProduct) => {
            return el?.productSku
          }),
          display: skuFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{displayData[rowIndex].productSku}</Typography>
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
          display: tagsFilter,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) =>
          customBodyRenderTags(
            value,
            tableMeta,
            updateValue,
            displayData,
            onEditTag,
          ),
      },
    },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        filter: false,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const Tags = displayData[rowIndex].retailerProductTags

          return (
            <IconButton
              aria-label="delete"
              onClick={() => {
                setOpenEditModal(true)
                setEditProduct(displayData[rowIndex])
              }}
            >
              <PencilSimpleLine
                size={18}
                color={isDarkMode ? '#ffffff' : '#000000'}
              />
            </IconButton>
          )
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
    selectableRowsHeader: true,
    confirmFilters: true,
    expandableRows: true,
    //rowsExpanded: displayData.map((_, i) => i),

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
          let newFilters: any = []
          let newTagFilters: any = []

          tableState.filterList.forEach((filter: any, index: number) => {
            // Ignore filters that are empty
            if (filter.length > 0) {
              let newFilter: any = {}
              if (columns[index].name === 'companyTags') {
                let tagFilters = displayData
                  .map((elCust: RetailerProduct) => {
                    let foo: any = []
                    elCust.retailerProductTags.forEach(elTag => {
                      return (foo = [
                        ...foo,
                        {
                          tagCategoryName: elTag.tag.tagCategory.name,
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

    renderExpandableRow: (rowData: any, rowMeta: any) => {
      return (
        <>
          <tr>
            <td colSpan={5} align="center" className="p-2">
              <RetailerProductComponents
                data={displayData[rowMeta.rowIndex]}
                loading={loading || isManualRefetching}
                unitOfMeasurements={unitOfMeasurementData}
                refetch={handleRefreshCustomers}
              />
            </td>
          </tr>
        </>
      )
    },
    customTableBodyFooterRender: options => {
      return customTableBodyFooterRender(options, handleAddRowFooter)
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
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
      <SectionHeadingToolBar
        title={'Products'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Product'}
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
        title="New Product"
        totalNumberOfWindows={1}
        windowIndex={0}
      >
        <AddRetailerProduct onClose={handleDialogClose} refetch={refetch} />
      </FloatingDialog>

      <FlexModal
        title={'Edit Product'}
        open={openEditModal}
        handleClose={() => {
          setOpenEditModal(false)
        }}
      >
        <EditRetailerProduct
          product={editProduct}
          refetch={refetch}
          onClose={() => {
            setOpenEditModal(false)
          }}
        />
      </FlexModal>
    </div>
  )
}
