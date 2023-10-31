import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { gql, useMutation } from '@apollo/client'

import { useUser } from '../../../contexts/UserContext'
import { callSnackBar } from '../../../utilities/callSnackBar'
import {
  CreateRetailerProductDocument,
  CreateRetailerProductInput,
  ManufacturerProduct,
} from '../../../graphql/generated/graphql'
import EnumPicker from '../../../zen_components/selectors/EnumPicker/EnumPicker'

const CREATE_RETAILER_PRODUCT = gql`
  mutation Mutation($input: CreateRetailerProductInput) {
    createRetailerProduct(input: $input) {
      retailerProductId
      success
    }
  }
`

interface AddRetailerProductProps {
  innerHeight?: number
  manufacturerProduct: ManufacturerProduct
  refetch: () => void
  onClose: () => void
}

export const AddProductToRetailerCatalog: React.FC<AddRetailerProductProps> = ({
  refetch,
  onClose,
  manufacturerProduct,
  innerHeight = 660,
}) => {
  const { user } = useUser()
  const [createRetailerProduct] = useMutation(CreateRetailerProductDocument)

  const [input, setInput] = useState<CreateRetailerProductInput>({
    components: [
      {
        manufacturerProductId: manufacturerProduct.id,
      },
    ],
    productName: '',
    notes: '',
    sku: '',
    productCategory: manufacturerProduct.productCategory,
    productType: manufacturerProduct.productType,
    retailerCompanyId: user?.selectedUserRole?.companyId,
  })

  const [saving, setSaving] = useState<boolean>(false)
  const [canSubmit, setCanSubmit] = useState<boolean>(true)

  useEffect(() => {
    setInput(prevState => ({
      ...prevState,
      productName: manufacturerProduct.productName,
    }))
  }, [manufacturerProduct])

  useEffect(() => {
    if (!input.productName || !input.sku) {
      setCanSubmit(false)
    } else {
      setCanSubmit(true)
    }
  }, [input])

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [prop]: event.target.value })
    }

  const handleUpdate = (prop: string, value: any) => {
    setInput({ ...input, [prop]: value })
  }

  const handleSubmit = async event => {
    console.log('handleSubmit')
    event.preventDefault()
    setSaving(true)
    try {
      console.log('Input', input)

      const result = await createRetailerProduct({
        variables: {
          input: input,
        },
      })

      console.log('result', result)

      refetch()
      callSnackBar(
        `Successfully added ${input.productName} to your catalog!`,
        'success',
      )
      onClose()
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  return (
    <Box width={'100%'} padding={2}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Product Name"
          value={input.productName}
          onChange={handleChange('productName')}
        />
        <TextField
          label="Product SKU"
          value={input.sku}
          onChange={handleChange('sku')}
        />
        <Stack direction={'row'} spacing={1}>
          <Box width={'50%'}>
            <EnumPicker
              queryType={'productCategories'}
              selectedEnum={input.productCategory ?? ''}
              onChange={function (newSelectedEnum: string): void {
                console.log('EnumPicker', newSelectedEnum)
                handleUpdate('productCategory', newSelectedEnum)
              }}
              allowNone={true}
              showAsMuiSelect={true}
              muiTitle={'Product Category'}
              hintText="Product Category"
            />
          </Box>
          <Box
            width={'50%'}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <EnumPicker
              queryType={'productTypes'}
              selectedEnum={input.productType ?? ''}
              onChange={function (newSelectedEnum: string): void {
                console.log('EnumPicker', newSelectedEnum)
                handleUpdate('productType', newSelectedEnum)
              }}
              showAsMuiSelect={true}
              allowNone={true}
              muiTitle={'Product Type'}
              hintText="Product Type"
            />
          </Box>
        </Stack>
        <Grid container padding={1}>
          <Grid item xs={6}></Grid>
        </Grid>
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={3}>
              <Typography>Common Name:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Tooltip title={manufacturerProduct.commonName}>
                <Typography noWrap>{manufacturerProduct.commonName}</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Typography>Manufacturer:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Tooltip title={manufacturerProduct.manufacturerName}>
                <Typography noWrap>
                  {manufacturerProduct.manufacturerName}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Typography>EPA Number:</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>{manufacturerProduct.epa}</Typography>
            </Grid>
            <Grid item xs={2}>
              {manufacturerProduct.isUs && (
                <Tooltip title={'Available in the United States'}>
                  <Typography variant="h5">🇺🇸</Typography>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={2}>
              {manufacturerProduct.isCanada && (
                <Tooltip title={'Available in Canada'}>
                  <Typography variant="h5">🇨🇦</Typography>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Paper>
        <Box margin={1}></Box>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          sx={{ paddingY: 1 }}
        >
          <Stack direction={'row'} spacing={2} alignItems="center">
            {saving && <CircularProgress size={18} />}
            <Button
              variant="contained"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              Save and Close
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
