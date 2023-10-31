import React, { useEffect, useState } from 'react'
import ManufacturerProductAutocomplete from '../../manufacturers/ManufacturerProductAutocomplete/ManufacturerProductAutocomplete'
import { useQuery } from '@apollo/client'
import {
  RetailerProduct,
  RetailerProductDocument,
} from '../../../graphql/generated/graphql'
import { Box, Stack, Typography, styled } from '@mui/material'
import SingleLineTextBox from '../../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'
import EnumPicker from '../../../zen_components/selectors/EnumPicker/EnumPicker'

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  noWrap: true,
  variant: 'body1',
  width: '150px',
  minWidth: '150px',
}))

interface RetailerProductDetailsProps {
  retailerProductId: number
}

const RetailerProductDetails: React.FC<RetailerProductDetailsProps> = props => {
  const { retailerProductId } = props

  const [product, setProduct] = useState<Partial<RetailerProduct>>()
  const { data, loading, error } = useQuery(RetailerProductDocument, {
    variables: {
      input: {
        retailerProductId,
      },
    },
    onCompleted: data => {
      setProduct(data?.retailerProduct as RetailerProduct)
    },
  })

  useEffect(() => {
    if (data?.retailerProduct) {
      setProduct(data?.retailerProduct as RetailerProduct)
    }
  }, [data])

  const updateValue = (key: keyof RetailerProduct, value: any) => {
    if (!product) return

    setProduct(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  return (
    <div>
      <Typography variant="h6">{product?.productName}</Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex', // use flexbox
          alignItems: 'center', // vertical centering
        }}
      >
        <LabelTypography>Product Name</LabelTypography>

        <SingleLineTextBox
          textAlign="left"
          value={product?.productName ?? ''}
          onChange={(newValue: string) => {
            updateValue('productName', newValue)
          }}
          showAsMuiSelect={false}
          muiTitle={'Product Name'}
          hintText="Product Name"
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex', // use flexbox
          alignItems: 'center', // vertical centering
        }}
      >
        <LabelTypography>SKU</LabelTypography>

        <SingleLineTextBox
          width="100%"
          textAlign="left"
          value={product?.sku ?? ''}
          onChange={(newValue: string) => {
            updateValue('sku', newValue)
          }}
          showAsMuiSelect={false}
          muiTitle={'SKU'}
          hintText="SKU"
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex', // use flexbox
          alignItems: 'center', // vertical centering
        }}
      >
        <LabelTypography>Category</LabelTypography>

        <EnumPicker
          width={'100%'}
          queryType={'productCategories'}
          selectedEnum={product?.productCategoryInfo?.value ?? ''}
          onChange={(newValue: string, selectedEnum: any) => {
            updateValue('productCategory', newValue)
            updateValue('productCategoryInfo', selectedEnum)
          }}
          allowNone={true}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex', // use flexbox
          alignItems: 'center', // vertical centering
        }}
      >
        <LabelTypography>Product Type</LabelTypography>

        <EnumPicker
          width={'100%'}
          queryType={'productTypes'}
          selectedEnum={product?.productTypeInfo?.value ?? ''}
          onChange={(newValue: string, selectedEnum: any) => {
            updateValue('productType', newValue)
            updateValue('productTypeInfo', selectedEnum)
          }}
          allowNone={true}
        />
      </Stack>
      {/* <ManufacturerProductAutocomplete
        index={0}
        inputData={[]}
        setInputData={(el: any) => {
          //throw new Error('Function not implemented.')
        }}
        onChange={(newValue: number, index: number) => {
          //throw new Error('Function not implemented.')
        }}
      /> */}
    </div>
  )
}

export default RetailerProductDetails
