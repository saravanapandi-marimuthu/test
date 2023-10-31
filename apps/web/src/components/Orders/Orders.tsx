import { useState, useEffect } from 'react'
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  Grid,
} from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Column } from '../../types/types'
import { AddNewField } from '../shared/Table/AddNewField'
import { DropdownTextBox } from '../shared/textEditors/DropdownTextBox/DropdownTextBox'
import { AutoCompleteTextBox } from '../shared/textEditors/AutoCompleteTextBox/AutoCompleteTextBox'
import useCallbackState from '../../utilities/useCallbackState'
import { Divider } from '@mui/material'
import { StyledTextField } from '../shared/mui/StyledTextField/StyledTextField'
import SingleLineTextBox from '../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

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
  handleRateValueChange: (unit: any, index: any, displayData: any) => void,
  displayData: any[],
) => {
  const rowIndex = tableMeta.rowIndex
  const selectedItems = items.filter(
    item => item.name === value?.unitOfMeasurement?.name,
  )

  return (
    <Stack
      sx={{ maxWidth: '240px' }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      spacing={1}
    >
      <SingleLineTextBox
        value={value?.rateValue}
        onChange={newValue => {
          // Implement the logic to save the edited value to your data source
          handleRateValueChange(newValue, rowIndex, displayData)
        }}
        textAlign={'right'}
        type="number"
      />
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
        textAlign={'right'}
      />
    </Box>
  )
}

export const Orders: React.FC<{
  data: any
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
    data.orders ?? [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!retailerProductLoading && data) {
      setDisplayData(data.orders)
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
  const onUnitOfMeasurementEdit = (unit: any, index: number, data: any) => {
    if (unit.length === 0) return
    const productComponent = data[index]
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          let rate = {
            unitOfMeasurement: unit[0],
          }
          return {
            ...el,
            unitOfMeasurementId: unit[0].id,
            rate: rate,
            isExistingEdit: true,
          }
        }
        return el
      })
    })
  }

  const onRateValueEdit = (value: any, index: number, data: any) => {
    const productComponent = data[index]
    setDisplayData(prev => {
      return prev.map((el, i) => {
        if (i === index) {
          return {
            ...el,
            rate: {
              ...el.rate,
              rateValue: +value,
            },
            isExistingEdit: true,
          }
        }
        return el
      })
    })
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

  const columns: Column[] = [
    {
      name: 'product.productId',
      label: '#',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'product.productName',
      label: 'Product',
      options: {
        filter: false,
        sort: false,
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
      name: 'rate',
      label: 'Rate',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customUnitOfMeasurementRender(
            value,
            tableMeta,
            updateValue,
            unitOfMeasurements,
            onUnitOfMeasurementEdit,
            onRateValueEdit,
            displayData,
          ),
      },
    },
    {
      name: 'measurementValue',
      label: 'Total Product',
      options: {
        filter: false,
        sort: false,
        setCellHeaderProps: () => {
          return { align: 'center' }
        },
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
      name: 'total',
      label: '$Total',
      options: {
        filter: false,
        sort: false,
        setCellHeaderProps: () => {
          return { align: 'right' }
        },
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
    customTableBodyFooterRender: options => {
      return customTableBodyFooterRender(options, handleAddRowFooter)
    },
  }
  return (
    <>
      <Box position="relative" width={'95%'}>
        <Box display={'flex'}>
          <Typography variant={'h5'} sx={{ fontWeight: 800 }}>
            Orders
          </Typography>
        </Box>
        <MUIDataTable
          title={''}
          data={displayData}
          columns={columns}
          options={options}
        />
        <Divider />
        <Box marginTop={4}>
          <Divider />
          <Box display={'flex'} flexWrap={'wrap'}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box padding={2}>
                  <StyledTextField
                    multiline
                    rows={4}
                    value={'notes'}
                    onChange={e => console.log(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box padding={2}>
                  <Box display={'flex'} flexDirection={'row'}>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        Product Total:
                      </Typography>
                    </Box>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        $1,106.64
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        Application Total:
                      </Typography>
                    </Box>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        $300.00
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        Tax 1:
                      </Typography>
                    </Box>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        $75.00
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        Tax 2:
                      </Typography>
                    </Box>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        $75.00
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        Total:
                      </Typography>
                    </Box>
                    <Box
                      flexDirection={'column'}
                      flex={1}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <Typography
                        variant={'h6'}
                        fontWeight={800}
                        marginLeft={'auto'}
                      >
                        $1,556.64
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
