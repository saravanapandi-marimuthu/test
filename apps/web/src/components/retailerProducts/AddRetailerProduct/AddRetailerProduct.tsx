import React, { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import { useUser } from '../../../contexts/UserContext'
import ManufacturerProductAutocomplete from '../../manufacturers/ManufacturerProductAutocomplete/ManufacturerProductAutocomplete'
import { ManufactureInputState } from '../../../types/productTypes'
import {
  ProductCategoriesDocument,
  ProductCategoriesQuery,
  Tag,
} from '../../../graphql/generated/graphql'
import UomPicker from '../../../zen_components/selectors/UomPicker/UomPicker'

const CREATE_RETAILER_PRODUCT = gql`
  mutation Mutation($input: CreateRetailerProductInput) {
    createRetailerProduct(input: $input) {
      retailerProductId
      success
    }
  }
`

interface ComponentInput {
  measurementValue: string
  productId: number
  unitOfMeasurementId: string
  unitPrice: string
}

interface AddRetailerProductProps {
  innerHeight?: number
  refetch: () => void
  onClose: () => void
}

export const AddRetailerProduct: React.FC<AddRetailerProductProps> = ({
  refetch,
  onClose,
  innerHeight = 660,
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { user } = useUser()
  const [createRetailerProduct] = useMutation(CREATE_RETAILER_PRODUCT)
  const [inputData, setInputData] = useState<ManufactureInputState[] | []>([
    {
      value: '',
      inputValue: '',
      options: [],
      totalCount: 0,
      isSelectOption: false,
    },
  ])
  const [input, setInput] = useState({
    components: [
      {
        measurementValue: 0,
        productId: NaN,
        unitOfMeasurementId: NaN,
        unitPrice: 0,
      },
    ],
    productName: '',
    productSku: '',
    retailerCompanyId: user?.selectedUserRole?.companyId,
    tags: [
      {
        tagCategoryName: 'Product Type',
        tagName: '',
      },
    ],
  })
  const [saving, setSaving] = useState<boolean>(false)

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [prop]: event.target.value })
    }

  const handleComponentChange =
    (index: number, prop: keyof ComponentInput) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newComponents = input.components.map((component, i) => {
        if (i !== index) return component
        return { ...component, [prop]: parseInt(event.target.value) }
      })
      setInput({ ...input, components: newComponents })
    }

  const handleComponentFloatValueChange =
    (index: number, prop: keyof ComponentInput, decimal: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value === '.' ? '0.' : event.target.value
      const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimal}})?$`)
      if (regex.test(newValue)) {
        const newComponents = input.components.map((component, i) => {
          if (i !== index) return component
          return { ...component, [prop]: event.target.value }
        })
        setInput({ ...input, components: newComponents })
      }
    }

  const handleAddComponent = () => {
    setInput(prevInput => ({
      ...prevInput,
      components: [
        ...prevInput.components,
        {
          measurementValue: 0,
          unitPrice: 0,
          productId: NaN,
          unitOfMeasurementId: NaN,
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
    setInput(prevInput => ({
      ...prevInput,
      components: prevInput.components.filter((_, i) => i !== index),
    }))
    setInputData(inputData.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      console.log('Tags', tags, 'Input', input)

      const result = await createRetailerProduct({
        variables: {
          input: {
            ...input,
            components: input.components.map(el => {
              return {
                ...el,
                measurementValue: +el.measurementValue,
                unitPrice: +el.unitPrice,
              }
            }),
            retailerCompanyId: user?.selectedUserRole?.companyId,
            tags: tags.map((tag: any) => ({
              tagCategoryName: tag.tagCategory.tagCategoryName,
              tagName: tag.tagName,
            })),
          },
        },
      })
      refetch()
      onClose()
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  // Handle Unit of Measurement change
  const handleUOMChange = (index: number, selectedUnitId: number) => {
    const newComponents = input.components.map((component, i) => {
      if (i !== index) return component
      return {
        ...component,
        unitOfMeasurementId: selectedUnitId,
      }
    })

    setInput({ ...input, components: newComponents })
  }

  const handleManufactChange = (id: number, index: number) => {
    const newComponents = input.components.map((component, i) => {
      if (i === index) {
        return {
          ...component,
          productId: id,
        }
      }
      return component
    })

    setInput({ ...input, components: newComponents })
  }

  return (
    <Box padding={1}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            value={input.productName}
            onChange={handleChange('productName')}
          />
          <TextField
            label="Product SKU"
            value={input.productSku}
            onChange={handleChange('productSku')}
          />
          <Divider />

          <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
            fontWeight={'bold'}
          >
            Components
          </Typography>
          {input.components.map((component, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <ManufacturerProductAutocomplete
                  index={index}
                  onChange={handleManufactChange}
                  inputData={inputData}
                  setInputData={setInputData}
                />
                <UomPicker
                  selectedUomId={component.unitOfMeasurementId}
                  onChange={(selectedUnitId: number) =>
                    handleUOMChange(index, selectedUnitId)
                  }
                />
                <TextField
                  label="Measurement Value"
                  value={component.measurementValue}
                  onChange={handleComponentFloatValueChange(
                    index,
                    'measurementValue',
                    2,
                  )}
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
          <TagPicker
            selectedTags={tags}
            onSelectedTagsChanged={tags => setTags(tags)}
            tagCategoryName={'Product Type'}
          />

          <Divider />
        </Stack>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          sx={{ paddingY: 1 }}
        >
          <Stack direction={'row'} spacing={2} alignItems="center">
            {saving && <CircularProgress size={18} />}
            <Button variant="contained" type="submit">
              Save and Close
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  )
}
