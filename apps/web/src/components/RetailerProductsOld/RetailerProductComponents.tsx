import { useState, useEffect } from 'react'
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Column } from '../../types/types'
import { RetailerProduct } from '../../types/productTypes'
import { AddNewField } from '../shared/Table/AddNewField'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_RETAILER_PRODUCT } from '../../graphql/mutations'
import { useUser } from '../../contexts/UserContext'
import {
  Check,
  Delete as DeleteIcon,
  RemoveOutlined,
} from '@mui/icons-material'
import { DropdownTextBox } from '../shared/textEditors/DropdownTextBox/DropdownTextBox'
import { AutoCompleteTextBox } from '../shared/textEditors/AutoCompleteTextBox/AutoCompleteTextBox'
import useCallbackState from '../../utilities/useCallbackState'
import ConfirmDialog from '../shared/ConfirmDialog/ConfirmDialog'
import SingleLineTextBox from '../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

interface ComponentInput {
  measurementValue: number
  productId: number
  unitOfMeasurementId: number
  unitPrice: number
}

interface TagsUpdate {
  tagName: string
  tagCategoryName: string
}

interface UpdateRetailerProductProps {
  product: RetailerProduct | null
  refetch: () => void
  onClose: () => void
}

interface UpdateProductComponent {
  productName: string | undefined
  productSku: string | undefined
  retailerCompanyId: string | undefined
  componentsRemoved?: ComponentInput[]
  componentsUpdated?: ComponentInput[]
  componentsAdded?: ComponentInput[]
  tagsAdded?: TagsUpdate[]
  tagsRemoved?: TagsUpdate[]
}

const customTableBodyFooterRender = (options: any, handleAddRowFooter: any) => {
  const { columns } = options

  return (
    <AddNewField
      columns={columns}
      onAddNewField={handleAddRowFooter}
      label="Component"
    />
  )
}

const customActionRender = (
  value: any,
  tableMeta: { rowIndex: any },
  updateValue: any,
  displayData: any[],
  handleEditProductComponent: (index: number, displayData: any) => void,
  handleDeleteProductComponent: (
    retailerProductComponent: ComponentInput,
  ) => void,
  handleRemoveProductComponent: (index: number) => void,
  confirmDialog: boolean,
  setConfirmDialog: (value: boolean) => void,
) => {
  const rowIndex = tableMeta.rowIndex
  const retailerProductComponent = displayData[rowIndex]

  return (
    <Box sx={{ minWidth: 100 }}>
      {retailerProductComponent?.isEdit ? (
        <>
          <IconButton
            onClick={() => handleEditProductComponent(rowIndex, displayData)}
          >
            <Check />
          </IconButton>
          <IconButton onClick={() => handleRemoveProductComponent(rowIndex)}>
            <RemoveOutlined />
          </IconButton>
        </>
      ) : (
        <>
          {retailerProductComponent?.isExistingEdit && (
            <IconButton
              onClick={() => handleEditProductComponent(rowIndex, displayData)}
            >
              <Check />
            </IconButton>
          )}
          <IconButton onClick={() => setConfirmDialog(true)}>
            <DeleteIcon />
          </IconButton>
          <ConfirmDialog
            title={'Delete Product Component'}
            open={confirmDialog}
            setOpen={setConfirmDialog}
            children={'Are you sure you want to delete this product component?'}
            onConfirm={() =>
              handleDeleteProductComponent(retailerProductComponent)
            }
          />
        </>
      )}
    </Box>
  )
}

const customManufacturerProductRender = (
  value: any,
  tableMeta: { rowIndex: any },
  updateValue: any,
  onManufacturerProductEdit: (value: any, index: number) => void,
  displayData: any[],
) => {
  const index = tableMeta.rowIndex
  const retailerProductComponent = displayData[index]
  const handleManufacturerProductChange = (manfacturerProduct: any) => {
    onManufacturerProductEdit(manfacturerProduct, index)
  }

  return (
    <>
      {retailerProductComponent?.isEdit ? (
        <AutoCompleteTextBox
          isLabel={false}
          selectedItems={value}
          onEditSave={selectedValue => console.log(selectedValue)}
          setManufacturerProducts={handleManufacturerProductChange}
        />
      ) : (
        <Box display={'flex'} flexGrow={1} sx={{ overflow: 'hidden' }}>
          <Typography noWrap component="div">
            {value}
          </Typography>
        </Box>
      )}
    </>
  )
}

const customUnitOfMeasurementRender = (
  value: any,
  tableMeta: any,
  updateValue: any,
  items: any[],
  handleUOMChange: (unit: any, index: any, displayData: any) => void,
  displayData: any[],
) => {
  const rowIndex = tableMeta.rowIndex
  const selectedItems = items.filter(item => item.name === value)

  return (
    <Stack
      sx={{ maxWidth: '240px' }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      spacing={1}
    >
      <DropdownTextBox
        items={items}
        selectedItems={selectedItems}
        label={'Product Type'}
        onEditSave={unitOfMeasurement =>
          handleUOMChange(unitOfMeasurement, rowIndex, displayData)
        }
        isOpen={true}
      />
    </Stack>
  )
}

const customeTextFieldRender = (
  value: any,
  tableMeta: { rowIndex: any },
  updateValue: any,
  onEditSave: (value: any, index: number, displayData: any) => void,
  displayData: any[],
) => {
  const index = tableMeta.rowIndex
  return (
    <Box
      display={'flex'}
      sx={{
        minHeight: '30px',
      }}
    >
      <SingleLineTextBox
        value={value}
        onChange={newValue => {
          // Implement the logic to save the edited value to your data source
          onEditSave(newValue, index, displayData)
        }}
      />
    </Box>
  )
}

export const RetailerProductComponents: React.FC<{
  data: RetailerProduct
  loading: boolean
  unitOfMeasurements: any[]
  refetch: () => void
}> = ({
  data,
  loading: retailerProductLoading,
  unitOfMeasurements,
  refetch,
}) => {
  const [displayData, setDisplayData] = useCallbackState<any[]>(
    data.retailerProductComponents,
  )

  const [updateRetailerProduct] = useMutation(UPDATE_RETAILER_PRODUCT)
  const { user } = useUser()

  const [inputUpdate, setInputUpdate] =
    useCallbackState<UpdateProductComponent>({
      productName: data?.productName,
      productSku: data?.productSku,
      retailerCompanyId: user?.selectedUserRole?.companyId,
      componentsRemoved: [],
      componentsUpdated: [],
      componentsAdded: [],
    })

  const [loading, setLoading] = useState(false)

  const [confirmDialog, setConfirmDialog] = useState(false)

  useEffect(() => {
    if (!retailerProductLoading && data) {
      setDisplayData(data.retailerProductComponents)
      setInputUpdate(prev => ({
        ...prev,
        componentsRemoved: [],
        componentsUpdated: [],
        componentsAdded: [],
      }))
    }
  }, [data, retailerProductLoading])

  const handleAddRowFooter = () => {
    setDisplayData(prev => [
      ...prev,
      {
        productId: NaN,
        unitOfMeasurement: NaN,
        measurementValue: 0,
        unitPrice: 0,
        isEdit: true,
      },
    ])
  }

  const handleEditProductComponent = (index: number, displayData: any) => {
    setLoading(true)
    const component = displayData[index]
    if (Number.isNaN(component.productId)) return

    if (component.isEdit) {
      setInputUpdate(
        prev => ({
          ...prev,
          componentsAdded: [
            {
              productId: component.productId,
              unitOfMeasurementId: component.unitOfMeasurementId,
              measurementValue: component.measurementValue,
              unitPrice: component.unitPrice,
            },
          ],
        }),
        newVal => {
          handleUpdateProductComponent(newVal)
        },
      )
      disableEdit(index)
    } else if (component.isExistingEdit) {
      setInputUpdate(
        prev => ({
          ...prev,
          componentsUpdated: [
            {
              productId: component.productId,
              unitOfMeasurementId: component.unitOfMeasurementId,
              measurementValue: component.measurementValue,
              unitPrice: component.unitPrice,
            },
          ],
        }),
        newVal => {
          handleUpdateProductComponent(newVal)
        },
      )
      disableEdit(index)
    }
  }

  const handleDeleteProductComponent = (el: ComponentInput) => {
    const component = {
      productId: el.productId,
      unitOfMeasurementId: el.unitOfMeasurementId,
      measurementValue: el.measurementValue,
      unitPrice: el.unitPrice,
    }
    setInputUpdate(
      prev => ({
        ...prev,
        componentsRemoved: [...(prev.componentsRemoved || []), component],
      }),
      newVal => {
        setLoading(true)
        handleUpdateProductComponent(newVal)
      },
    )
  }

  const handleRemoveProductComponent = (index: number) => {
    setDisplayData(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpdateProductComponent = async (input: any) => {
    try {
      const result = await updateRetailerProduct({
        variables: {
          input: {
            ...input,
          },
        },
      })
      setLoading(false)
      refetch()
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const onManufacturerProductEdit = (value: any, index: number) => {
    const { __typename, ...product } = value
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            productId: product.id,
            product,
          }
        }
        return el
      })
    })
  }

  const onUnitOfMeasurementEdit = (unit: any, index: number, data: any) => {
    if (unit.length === 0) return
    const productComponent = data[index]
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            unitOfMeasurementId: unit[0].id,
            isExistingEdit: true,
          }
        }
        return el
      })
    })
  }

  const onUnitPriceEdit = (value: any, index: number, data: any) => {
    const productComponent = data[index]
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            unitPrice: +value,
            isExistingEdit: true,
          }
        }
        return el
      })
    })
  }

  const onMeasurementValueEdit = (value: any, index: number, data: any) => {
    const productComponent = data[index]
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            measurementValue: +value,
            isExistingEdit: true,
          }
        }
        return el
      })
    })
  }

  const disableEdit = (index: number) => {
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            isExistingEdit: false,
            isEdit: false,
          }
        }
        return el
      })
    })
  }

  const columns: Column[] = [
    {
      name: 'product.productName',
      label: 'Product Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) =>
          customManufacturerProductRender(
            value,
            tableMeta,
            updateValue,
            onManufacturerProductEdit,
            displayData,
          ),
      },
    },
    {
      name: 'product.commonName',
      label: 'Common Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'product.manufacturerName',
      label: 'Manufacturer Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'unitOfMeasurement.unitName',
      label: 'Unit Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customUnitOfMeasurementRender(
            value,
            tableMeta,
            updateValue,
            unitOfMeasurements,
            onUnitOfMeasurementEdit,
            displayData,
          ),
      },
    },
    {
      name: 'measurementValue',
      label: 'Value',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customeTextFieldRender(
            value,
            tableMeta,
            updateValue,
            onMeasurementValueEdit,
            displayData,
          ),
      },
    },
    {
      name: 'product.EPA',
      label: 'EPA',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'product.isUs',
      label: 'US Product?',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customActionRender(
            value,
            tableMeta,
            updateValue,
            displayData,
            handleEditProductComponent,
            handleDeleteProductComponent,
            handleRemoveProductComponent,
            confirmDialog,
            setConfirmDialog,
          ),
      },
    },
  ]

  const options: MUIDataTableOptions = {
    // filterType: 'textField',
    responsive: 'standard',
    serverSide: true,
    pagination: false,
    fixedHeader: true,
    filter: false,
    download: false,
    print: false,
    search: false,
    viewColumns: false,
    searchAlwaysOpen: false,
    selectableRows: 'none',
    enableNestedDataAccess: '.',
    // onTableChange: (action: string, tableState: any) => {
    // switch (action) {
    //   case 'sort':
    //     if (
    //       tableState.sortOrder &&
    //       tableState.sortOrder.direction !== 'none'
    //     ) {
    //       setSort(
    //         `${tableState.sortOrder.name}:${tableState.sortOrder.direction}`,
    //       )
    //     } else {
    //       setSort('')
    //     }
    //     break
    // }
    // },
    customTableBodyFooterRender: options => {
      return customTableBodyFooterRender(options, handleAddRowFooter)
    },
  }
  return (
    <>
      <Box position="relative" width={'95%'}>
        <MUIDataTable
          title={''}
          data={displayData}
          columns={columns}
          options={options}
        />
        <Backdrop
          open={loading}
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  )
}
