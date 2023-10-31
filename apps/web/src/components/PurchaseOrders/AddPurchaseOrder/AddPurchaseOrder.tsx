import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material'
import {
  Box,
  TextField,
  FormHelperText,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  IconButton,
  Divider,
} from '@mui/material'
import { callSnackBar } from '../../../utilities/callSnackBar'
import { HighlightedBox } from '../../shared/mui/HighlightedBox/HighlightedBox'
import { StyledTextField } from '../../shared/mui/StyledTextField/StyledTextField'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Column } from '../../../types/types'
import BasicDatePicker from '../../shared/mui/DatePicker/DatePicker'
import { useMutation, useQuery } from '@apollo/client'
import {
  CreatePurchaseOrderDocument,
  CreatePurchaseOrderMutation,
  RelatedCompaniesDocument,
  RelatedCompaniesQuery,
  WarehousesDocument,
  WarehousesQuery,
} from '../../../graphql/generated/graphql'
import { useUser } from '../../../contexts/UserContext'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { PurchaseOrderFormFields } from '../../../utilities/FormValidation/DataTypes/PurchaseOrder'
import { purchaseOrderSchema } from '../../../utilities/FormValidation/ValidatorSchemas/PurchaseOrder'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import UomPicker from '../../../zen_components/selectors/UomPicker/UomPicker'
import ManufacturerProductAutocomplete from '../../manufacturers/ManufacturerProductAutocomplete/ManufacturerProductAutocomplete'
import { ManufactureInputState } from '../../../types/productTypes'
import PackagePicker from '../../../zen_components/selectors/PackagePicker/PackagePicker'

interface AddPurchaseOrderProps {
  successAndError: string[]
  onClose: () => void
  refetch: () => void
}

interface ComponentInput {
  productId: number
  // unitOfMeasurementId: string
  packageId: string
  unitPrice: string
  notes: string
  orderedQty: number
}

const AddPurchaseOrder: React.FC<AddPurchaseOrderProps> = ({
  successAndError,
  onClose,
  refetch,
}) => {
  const { user } = useUser()
  const [error, setError] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [sort, setSort] = useState('')

  const [inputData, setInputData] = useState<ManufactureInputState[] | []>([
    {
      value: '',
      inputValue: '',
      options: [],
      totalCount: 0,
      isSelectOption: false,
    },
  ])
  const [productInput, setProductInput] = useState({
    components: [
      {
        productId: NaN,
        // unitOfMeasurementId: NaN,
        packageId: NaN,
        unitPrice: 0,
        notes: '',
        orderedQty: 0,
      },
    ],
  })
  const {
    control: purchaseOrderController,
    handleSubmit,
    formState: { errors: addPurchaseOrderErrors },
    reset,
  } = useForm<PurchaseOrderFormFields>({
    criteriaMode: 'all',
    defaultValues: {
      vendorCompanyId: '',
      locationId: '',
      billingAccountId: '',
      notes: '',
      orderDate: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(purchaseOrderSchema),
  })

  const [createPurchaseOrder] = useMutation<CreatePurchaseOrderMutation>(
    CreatePurchaseOrderDocument,
  )
  const { data: vendorData } = useQuery<RelatedCompaniesQuery>(
    RelatedCompaniesDocument,
    {
      variables: {
        input: {
          companyId: user?.selectedUserRole?.companyId,
          companyRelationshipType: 'VENDOR',
        },
      },
    },
  )

  const { data: locationData } = useQuery<WarehousesQuery>(WarehousesDocument, {
    variables: {
      input: {
        retailerCompanyId: user?.selectedUserRole?.companyId,
      },
    },
  })

  const [productData] = useState<any>({
    products: [
      {
        id: 1,
        product: 'Water',
        description: '-',
        unit: '5gal',
        quantity: '55',
        price: 62.24,
      },
      {
        id: 2,
        product: 'Glyphosate',
        description: '-',
        unit: '5gal',
        quantity: '62',
        price: 80.3,
      },
      {
        id: 3,
        product: 'Metribuzin',
        description: '-',
        unit: '12lb bag',
        quantity: '86',
        price: 34.6,
      },
      {
        id: 4,
        product: 'Dicamba',
        description: '-',
        unit: '10L',
        quantity: '75',
        price: 75.9,
      },
      {
        id: 5,
        product: 'Ag saver',
        description: '-',
        unit: '20lb bag',
        quantity: '96',
        price: 84.95,
      },
    ],
  })

  const handleManufacturerProductChange = (id: number, index: number) => {
    const newComponents = productInput.components.map((component, i) => {
      if (i === index) {
        return {
          ...component,
          productId: id,
        }
      }
      return component
    })

    setProductInput({ ...productInput, components: newComponents })
  }

  // Handle Unit of Measurement change
  // const handleUOMChange = (index: number, selectedUnitId: number) => {
  //   const newComponents = productInput.components.map((component, i) => {
  //     if (i !== index) return component
  //     return {
  //       ...component,
  //       unitOfMeasurementId: selectedUnitId,
  //     }
  //   })

  //   setProductInput({ ...productInput, components: newComponents })
  // }

  const handlePackageChange = (index: number, selectedUnitId: number) => {
    const newComponents = productInput.components.map((component, i) => {
      if (i !== index) return component
      return {
        ...component,
        packageId: selectedUnitId,
      }
    })

    setProductInput({ ...productInput, components: newComponents })
  }

  const handleComponentFloatValueChange =
    (index: number, prop: keyof ComponentInput, decimal?: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (['unitPrice'].includes(prop)) {
        const newValue = event.target.value === '.' ? '0.' : event.target.value
        const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimal}})?$`)
        if (regex.test(newValue)) {
          const newComponents = productInput.components.map((component, i) => {
            if (i !== index) return component
            return { ...component, [prop]: event.target.value }
          })
          setProductInput({ ...productInput, components: newComponents })
        }
      } else {
        const newComponents = productInput.components.map((component, i) => {
          if (i !== index) return component
          return { ...component, [prop]: event.target.value }
        })
        setProductInput({ ...productInput, components: newComponents })
      }
    }

  const handleAddComponent = () => {
    setProductInput(prevInput => ({
      components: [
        ...prevInput.components,
        {
          unitPrice: 0,
          productId: NaN,
          // unitOfMeasurementId: NaN,
          packageId: NaN,
          notes: '',
          orderedQty: 0,
        },
      ],
    }))
    setInputData([
      ...inputData,
      {
        value: '',
        inputValue: '',
        options: [],
        totalCount: 0,
        isSelectOption: false,
      },
    ])
  }

  const handleRemoveComponent = (index: number) => {
    setProductInput(prevInput => ({
      components: prevInput.components.filter((_, i) => i !== index),
    }))
    setInputData(inputData.filter((_, i) => i !== index))
  }

  const submitHandler = async (data: PurchaseOrderFormFields) => {
    setSaving(true)
    try {
      const result = await createPurchaseOrder({
        variables: {
          input: {
            orderNumber: 'PO-0004',
            orderStatus: 'OPEN',
            trackingNumber: 'TR-0001',
            notes: data.notes,
            billingAccountId: Number(data.billingAccountId),
            paymentTermsId: 3,
            dateOrdered: data.orderDate,
            vendorCompanyId: data.vendorCompanyId,
            companyId: user?.selectedUserRole?.companyId,
            lineItems: productInput.components.map(el => {
              return {
                ...el,
                unitPrice: +el.unitPrice,
                orderedQty: +el.orderedQty,
              }
            }),
          },
        },
      })
      refetch()
      reset()
      onClose()
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  const columns: Column[] = [
    {
      name: 'product',
      label: 'Product',
      options: {
        sortThirdClickReset: false,
        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="left" paddingRight={2}>
              {productData.products[dataIndex].product}
            </Box>
          )
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        sortThirdClickReset: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="left" paddingRight={2}>
              {productData.products[dataIndex].description}
            </Box>
          )
        },
      },
    },
    {
      name: 'unit',
      label: 'Unit',
      options: {
        sortThirdClickReset: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="left" paddingRight={2}>
              {productData.products[dataIndex].unit}
            </Box>
          )
        },
      },
    },
    {
      name: 'quantity',
      label: 'Qty',
      options: {
        sortThirdClickReset: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="left" paddingRight={2}>
              {productData.products[dataIndex].quantity}
            </Box>
          )
        },
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        sortThirdClickReset: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Box textAlign="left" paddingRight={2}>
              ${productData.products[dataIndex].price}
            </Box>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'multiselect',
    responsive: 'standard',
    rowsPerPage: perPage,
    page: page,
    rowsPerPageOptions: [10, 25, 50],
    count: productData.products.length,
    // serverSide: true,
    fixedHeader: true,
    // draggableColumns: { enabled: true },
    filter: true,
    download: false,
    print: false,
    searchAlwaysOpen: true,
    selectableRowsHeader: true,
    confirmFilters: true,
    expandableRows: false,
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'changePage':
          setPage(tableState.page)
          break
        case 'changeRowsPerPage':
          setPerPage(tableState.rowsPerPage)
          break
        // case 'sort':
        //   if (
        //     tableState.sortOrder &&
        //     tableState.sortOrder.direction !== 'none'
        //   ) {
        //     setSort(
        //       `${tableState.sortOrder.name}:${tableState.sortOrder.direction}`,
        //     )
        //   } else {
        //     setSort('')
        //   }
        //   break
      }
    },
  }

  return (
    <Box width={'100%'} justifyContent={'center'} padding={0} height={'100%'}>
      <Stack direction="column" padding={0}>
        <Box
          sx={{
            maxHeight: 660,
            width: '100%',
            overflowY: 'auto',
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <form
              id="purchaseOrderAddForm"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Grid container direction="row" sx={{ marginTop: 1 }}>
                <Grid item sx={{ flex: 1 }}>
                  <Grid container direction={'column'}>
                    <Grid
                      item
                      sx={{
                        marginBottom: 1,
                      }}
                    >
                      <FormControl sx={{ flex: 1, display: 'flex' }}>
                        <InputLabel id="state-province-selector-label">
                          Vendor
                        </InputLabel>
                        <Typography component="div">
                          <Controller
                            control={purchaseOrderController}
                            name="vendorCompanyId"
                            render={({
                              field: { onChange, value, name, ref },
                              formState,
                            }) => {
                              return (
                                <Select
                                  labelId="state-province-selector-label"
                                  required
                                  value={value}
                                  name={name}
                                  fullWidth
                                  size="small"
                                  sx={{ borderRadius: '4px' }}
                                  onChange={e => onChange(e.target.value)}
                                  input={<OutlinedInput label="Vendor" />}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 300,
                                        overflowY: 'auto',
                                      },
                                    },
                                  }}
                                >
                                  {vendorData?.relatedCompanies &&
                                  vendorData?.relatedCompanies?.items.length > 0
                                    ? vendorData?.relatedCompanies.items.map(
                                        (vendor, index) => {
                                          return (
                                            <MenuItem
                                              key={`SelectItem-${index}`}
                                              value={vendor.company.id}
                                            >
                                              {vendor.company.name}
                                            </MenuItem>
                                          )
                                        },
                                      )
                                    : []}
                                </Select>
                              )
                            }}
                          />
                          {addPurchaseOrderErrors?.vendorCompanyId?.message && (
                            <FormHelperText
                              className="Mui-error"
                              component={'p'}
                            >
                              {addPurchaseOrderErrors?.vendorCompanyId?.message}
                            </FormHelperText>
                          )}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid
                      item
                      sx={{
                        marginBottom: 1,
                      }}
                    >
                      <FormControl sx={{ flex: 1, display: 'flex' }}>
                        <InputLabel id="location-province-selector-label">
                          Location
                        </InputLabel>
                        <Typography component="div">
                          <Controller
                            control={purchaseOrderController}
                            name="locationId"
                            render={({
                              field: { onChange, value, name, ref },
                              formState,
                            }) => {
                              return (
                                <Select
                                  labelId="location-province-selector-label"
                                  required
                                  value={value}
                                  name={name}
                                  fullWidth
                                  size="small"
                                  sx={{ borderRadius: '4px' }}
                                  onChange={onChange}
                                  input={<OutlinedInput label="Location" />}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 300,
                                        overflowY: 'auto',
                                      },
                                    },
                                  }}
                                >
                                  {locationData?.warehouses &&
                                  locationData?.warehouses.items.length > 0
                                    ? locationData?.warehouses.items.map(
                                        (lcoation, index) => {
                                          return (
                                            <MenuItem
                                              key={`SelectItem-${index}`}
                                              value={lcoation.id}
                                            >
                                              {lcoation.name}
                                            </MenuItem>
                                          )
                                        },
                                      )
                                    : []}
                                </Select>
                              )
                            }}
                          />
                          {addPurchaseOrderErrors?.locationId?.message && (
                            <FormHelperText
                              className="Mui-error"
                              component={'p'}
                            >
                              {addPurchaseOrderErrors?.locationId?.message}
                            </FormHelperText>
                          )}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid
                      item
                      sx={{
                        marginBottom: 1,
                      }}
                    >
                      <FormControl sx={{ flex: 1, display: 'flex' }}>
                        <InputLabel id="state-province-selector-label">
                          Accounts
                        </InputLabel>
                        <Typography component="div">
                          <Controller
                            control={purchaseOrderController}
                            name="billingAccountId"
                            render={({
                              field: { onChange, value, name, ref },
                              formState,
                            }) => {
                              return (
                                <Select
                                  labelId="location-province-selector-label"
                                  required
                                  value={value}
                                  name={name}
                                  fullWidth
                                  size="small"
                                  sx={{ borderRadius: '4px' }}
                                  onChange={onChange}
                                  input={<OutlinedInput label="Location" />}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 300,
                                        overflowY: 'auto',
                                      },
                                    },
                                  }}
                                >
                                  {[
                                    {
                                      name: 'GL Account 1',
                                      id: 1,
                                    },
                                    {
                                      name: 'GL Account 2',
                                      id: 2,
                                    },
                                    {
                                      name: 'GL Account 3',
                                      id: 3,
                                    },
                                    {
                                      name: 'GL Account 4',
                                      id: 4,
                                    },
                                  ].map((account, index) => {
                                    return (
                                      <MenuItem
                                        key={`SelectItem-${index}`}
                                        value={account.id}
                                      >
                                        {account.name}
                                      </MenuItem>
                                    )
                                  })}
                                </Select>
                              )
                            }}
                          />
                          {addPurchaseOrderErrors?.billingAccountId
                            ?.message && (
                            <FormHelperText
                              className="Mui-error"
                              component={'p'}
                            >
                              {
                                addPurchaseOrderErrors?.billingAccountId
                                  ?.message
                              }
                            </FormHelperText>
                          )}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ marginLeft: 1, marginRight: 1 }} />

                <Grid item sx={{ flex: 1 }}>
                  <Grid container direction={'column'}>
                    <Grid item sx={{ marginBottom: 1 }}>
                      <Typography component="div">
                        <Controller
                          control={purchaseOrderController}
                          name="orderDate"
                          render={({
                            field: { onChange, value, name, ref },
                            formState,
                          }) => {
                            return (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                  // inputFormat={'MM-DD-YYYY'}
                                  label="Purchase Date *"
                                  className="custom-time"
                                  value={
                                    value
                                      ? moment(value).format('MM-DD-YYYY')
                                      : ''
                                  }
                                  inputRef={ref}
                                  onChange={(e: any) => {
                                    onChange(
                                      e
                                        ? moment(e.toDate()).format(
                                            'MM-DD-YYYY',
                                          )
                                        : '',
                                    )
                                  }}
                                />
                              </LocalizationProvider>
                            )
                          }}
                        />
                        {addPurchaseOrderErrors?.orderDate?.message && (
                          <FormHelperText className="Mui-error" component={'p'}>
                            {addPurchaseOrderErrors?.orderDate?.message}
                          </FormHelperText>
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="div">
                        <Controller
                          control={purchaseOrderController}
                          name="notes"
                          render={({
                            field: { onChange, value, name, ref },
                            formState,
                          }) => {
                            return (
                              <StyledTextField
                                multiline
                                rows={4}
                                label="Notes"
                                name={name}
                                value={value}
                                onChange={onChange}
                              />
                            )
                          }}
                        />
                        {addPurchaseOrderErrors?.notes?.message && (
                          <FormHelperText className="Mui-error" component={'p'}>
                            {addPurchaseOrderErrors?.notes?.message}
                          </FormHelperText>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Stack>

          <Stack>
            {/* <MUIDataTable
              title={''}
              data={productData.products}
              columns={columns}
              options={options}
            /> */}
            <Typography
              variant="subtitle1"
              component="div"
              color="text.secondary"
              fontWeight={'bold'}
            >
              Product component
            </Typography>
            {productInput.components.map((component, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack direction={'row'} spacing={1}>
                  <ManufacturerProductAutocomplete
                    index={index}
                    onChange={handleManufacturerProductChange}
                    inputData={inputData}
                    setInputData={setInputData}
                  />
                  {/* <UomPicker
                    selectedUomId={component.unitOfMeasurementId}
                    onChange={(selectedUnitId: number) =>
                      handleUOMChange(index, selectedUnitId)
                    }
                  /> */}
                  <PackagePicker
                    selectedPackageId={component.packageId}
                    onChange={(newSelectedPackageId: number) => {
                      handlePackageChange(index, newSelectedPackageId)
                    }}
                  />
                  <TextField
                    label="Unit Price"
                    value={component.unitPrice}
                    onChange={handleComponentFloatValueChange(
                      index,
                      'unitPrice',
                      2,
                    )}
                  />
                  <TextField
                    label="Quantity"
                    value={component.orderedQty}
                    onChange={handleComponentFloatValueChange(
                      index,
                      'orderedQty',
                    )}
                  />
                  <TextField
                    label="Description"
                    value={component.notes}
                    onChange={handleComponentFloatValueChange(index, 'notes')}
                  />
                  {index !== 0 && (
                    <IconButton onClick={() => handleRemoveComponent(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            ))}
            <Button
              onClick={handleAddComponent}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Component
            </Button>

            <Divider />
          </Stack>
        </Box>
        <HighlightedBox
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          sx={{
            padding: 2,
            paddingY: 3,
          }}
        >
          <Stack direction={'row'} spacing={2}>
            {saving && (
              <Box sx={{ paddingX: 2 }}>
                <CircularProgress size={18} />
              </Box>
            )}
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={saving}
              form="purchaseOrderAddForm"
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </HighlightedBox>
      </Stack>
    </Box>
  )
}

export default AddPurchaseOrder
