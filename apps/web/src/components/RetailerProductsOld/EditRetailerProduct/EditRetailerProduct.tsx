import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import { useUser } from '../../../contexts/UserContext'
import { UnitOfMeasurementSelect } from '../../shared/UnitOfMeasurementSelect/UnitOfMeasurementSelect'
import ManufacturerProductAutocomplete from '../../manufacturers/ManufacturerProductAutocomplete/ManufacturerProductAutocomplete'
import { backgroundColor } from '../../../contexts/ThemeContext'
import { UPDATE_RETAILER_PRODUCT } from '../../../graphql/mutations'
import { Trash } from '@phosphor-icons/react'
import {
  ManufactureInputState,
  RetailerProduct,
  RetailerProductTag,
} from '../../../types/productTypes'

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

export const EditRetailerProduct: React.FC<UpdateRetailerProductProps> = ({
  product,
  refetch,
  onClose,
}) => {
  const { user } = useUser()

  const [tags, setTags] = useState<any>([])
  const [input, setInput] = useState({
    productName: '',
    productSku: '',
    components: [
      {
        measurementValue: NaN,
        productId: NaN,
        unitOfMeasurementId: NaN,
        unitPrice: NaN,
      },
    ],
    retailerCompanyId: user?.selectedUserRole?.companyId,
    tags: [
      {
        tagCategoryName: 'Product Type',
        tagName: '',
      },
    ],
  })
  const [inputUpdate, setInputUpdate] = useState<UpdateProductComponent>({
    productName: product?.productName,
    productSku: product?.productSku,
    retailerCompanyId: user?.selectedUserRole?.companyId,
  })
  const [saving, setSaving] = useState<boolean>(false)
  const [inputData, setInputData] = useState<ManufactureInputState[] | []>([])
  const [quantityEditProducts, setQuantityEditProducts] = useState<number>(
    product?.retailerProductComponents.length || 0,
  )
  const [updateRetailerProduct] = useMutation(UPDATE_RETAILER_PRODUCT)

  const styleWrapperLists = {
    paddingTop: '8px',
    overflowY: 'scroll',
    maxHeight: '600px',
    width: '600px',
    paddingRight: '8px',
    '::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: 'rgba(196, 196, 196, 0.075)',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: backgroundColor,
      borderRadius: '4px',
      boxShadow: 'inset 1px 1px 10px #faf3f3',
    },
  }

  const handleAddComponent = () => {
    setInput({
      ...input,
      components: [
        ...input.components,
        {
          measurementValue: 0,
          productId: NaN,
          unitOfMeasurementId: NaN,
          unitPrice: 0,
        },
      ],
    })
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
    setInputUpdate(prev => ({
      ...prev,
      componentsAdded: [
        ...(prev.componentsAdded || []),
        {
          measurementValue: 0,
          productId: NaN,
          unitOfMeasurementId: NaN,
          unitPrice: 0,
        },
      ],
    }))
  }

  const handleRemoveComponent = (index: number) => {
    setInput(prevInput => ({
      ...prevInput,
      components: input.components.filter((_, i) => i !== index),
    }))

    inputUpdate.componentsAdded &&
      setInputUpdate(prevInput => ({
        ...prevInput,
        componentsAdded: prevInput.componentsAdded?.filter(
          (_, i) => i + quantityEditProducts !== index,
        ),
      }))

    setInputData(inputData.filter((_, i) => i + quantityEditProducts !== index))
  }

  const handleSubmitUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setSaving(true)
    try {
      const result = await updateRetailerProduct({
        variables: {
          input: {
            ...inputUpdate,
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

  const handleComponentFloatValueChange =
    (index: number, prop: keyof ComponentInput, decimal: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value === '.' ? '0.' : event.target.value
      const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimal}})?$`)
      if (regex.test(newValue)) {
        const newComponents = input.components.map((component, i) => {
          if (i !== index) return component
          let editable = product?.retailerProductComponents.some(
            (el: any) => el.productId === component.productId,
          )

          //Checked if updated component
          if (editable) {
            let ifHaveEditElement = inputUpdate.componentsUpdated?.some(
              el => el.productId === component.productId,
            )
            if (ifHaveEditElement) {
              setInputUpdate(prevInputUpdate => ({
                ...prevInputUpdate,
                componentsUpdated: inputUpdate.componentsUpdated?.map(
                  (el: ComponentInput) => {
                    if (el.productId === component.productId) {
                      return {
                        ...el,
                        [prop]: +newValue,
                      }
                    }
                    return el
                  },
                ),
              }))
            } else {
              setInputUpdate(prevInputUpdate => ({
                ...prevInputUpdate,
                componentsUpdated:
                  [
                    ...(prevInputUpdate.componentsUpdated || []),
                    {
                      ...component,
                      [prop]: +newValue,
                    },
                  ] || [],
              }))
            }
          }

          inputUpdate.componentsAdded &&
            setInputUpdate(prevInputUpdate => ({
              ...prevInputUpdate,
              componentsAdded: inputUpdate.componentsAdded?.map(
                (el: ComponentInput, i: number) => {
                  if (index === i + quantityEditProducts) {
                    return {
                      ...el,
                      [prop]: +newValue,
                    }
                  }
                  return el
                },
              ),
            }))

          return { ...component, [prop]: newValue }
        })
        setInput({ ...input, components: newComponents })
      }
    }

  // Handle Unit of Measurement change
  const handleUOMChange = (index: number, selectedUnitId: number) => {
    const newComponents: ComponentInput[] = input.components.map(
      (component, i) => {
        if (i !== index) return component

        let editable = product?.retailerProductComponents.some(
          (el: any) => el.productId === component.productId,
        )

        //Checked if updated component
        if (editable) {
          let ifHaveEditElement = inputUpdate.componentsUpdated?.some(
            el => el.productId === component.productId,
          )
          if (ifHaveEditElement) {
            setInputUpdate(prevInputUpdate => ({
              ...prevInputUpdate,
              componentsUpdated: inputUpdate.componentsUpdated?.map(
                (el: ComponentInput) => {
                  if (el.productId === component.productId) {
                    return {
                      ...el,
                      unitOfMeasurementId: selectedUnitId,
                    }
                  }
                  return el
                },
              ),
            }))
          } else {
            setInputUpdate(prevInputUpdate => ({
              ...prevInputUpdate,
              componentsUpdated:
                [
                  ...(prevInputUpdate.componentsUpdated || []),
                  {
                    ...component,
                    unitOfMeasurementId: selectedUnitId,
                  },
                ] || [],
            }))
          }
        }

        // for componentsAdded
        inputUpdate.componentsAdded &&
          setInputUpdate({
            ...inputUpdate,
            componentsAdded: inputUpdate.componentsAdded?.map(
              (el, ind: number) => {
                if (index === ind + quantityEditProducts) {
                  return {
                    ...el,
                    unitOfMeasurementId: selectedUnitId,
                  }
                }
                return el
              },
            ),
          })

        return {
          ...component,
          unitOfMeasurementId: selectedUnitId,
        }
      },
    )
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
    inputUpdate.componentsAdded &&
      setInputUpdate({
        ...inputUpdate,
        componentsAdded: inputUpdate.componentsAdded?.map((el, ind: number) => {
          if (index === ind + quantityEditProducts) {
            return {
              ...el,
              productId: id,
            }
          }
          return el
        }),
      })
    setInput({ ...input, components: newComponents })
  }

  const handeRemoveProduct = (el: ComponentInput) => {
    setInputUpdate(prev => ({
      ...prev,
      componentsRemoved: [...(prev.componentsRemoved || []), el],
      // if the user first updated the component and then decided to delete it
      componentsUpdated: prev.componentsUpdated?.filter(({ productId }) => {
        return productId != el.productId
      }),
    }))
    setInput(prev => ({
      ...prev,
      components: prev.components.filter(({ productId }) => {
        return productId != el.productId
      }),
    }))
    setQuantityEditProducts(prev => prev - 1)
  }

  const cleanerObj = (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => !Array.isArray(value) || value.length > 0,
      ),
    )
  }

  useEffect(() => {
    let dataInp: any = {
      productName: product?.productName,
      productSku: product?.productSku,
      components: product?.retailerProductComponents.map((el: any) => {
        return {
          measurementValue: el.measurementValue,
          productId: el.productId,
          unitOfMeasurementId: el.unitOfMeasurementId,
          unitPrice: el.unitPrice,
        }
      }),
      retailerCompanyId: user?.selectedUserRole?.companyId,
      tags: product?.retailerProductTags?.map(el => {
        return {
          tagCategoryName: 'Product Type',
          tagName: el.tag.name,
        }
      }),
    }

    setInput(dataInp)

    setTags(
      product?.retailerProductTags?.map(el => {
        return {
          tagCategoryName: 'Product Type',
          tagName: el.tag.name,
        }
      }),
    )
  }, [])

  useEffect(() => {
    const tagNamesAddedToFilter = product?.retailerProductTags?.map(
      (item: RetailerProductTag) => item.tag.name,
    )
    const tagsAdded = tags?.filter(
      (item: any) => !tagNamesAddedToFilter?.includes(item.tagName),
    )

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

    const cleanedData: any = cleanerObj({
      ...inputUpdate,
      tagsAdded: tagsAdded,
      tagsRemoved: tagsRemoved,
    })

    setInputUpdate(cleanedData)
  }, [tags])

  return (
    <form onSubmit={handleSubmitUpdate}>
      <Stack spacing={2} sx={styleWrapperLists}>
        <TextField label="Product Name" value={input.productName} disabled />
        <TextField label="Product SKU" value={input.productSku} disabled />
        <Divider />
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
          fontWeight={'bold'}
        >
          Components
        </Typography>
        {input.components.map((component, index) => {
          let editableComponent = product?.retailerProductComponents.find(
            (el: any) => el.productId === component.productId,
          )

          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                {editableComponent ? (
                  <TextField
                    label="Product"
                    value={`${editableComponent?.product?.productName} ${editableComponent?.product?.manufacturerName}`}
                    disabled
                  />
                ) : (
                  <ManufacturerProductAutocomplete
                    inputData={inputData}
                    setInputData={setInputData}
                    index={index}
                    onChange={handleManufactChange}
                    quantityEditProducts={quantityEditProducts}
                    disabledOptions={product?.retailerProductComponents.map(
                      el => {
                        return el.product.id
                      },
                    )}
                  />
                )}
                <UnitOfMeasurementSelect
                  selectedUnitId={component.unitOfMeasurementId}
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
                {editableComponent && (
                  <IconButton
                    sx={{ width: '40px' }}
                    onClick={() => {
                      handeRemoveProduct(component)
                    }}
                  >
                    <Trash size={16} color="#d40c0c" weight="bold" />
                  </IconButton>
                )}
                {index !== 0 && !editableComponent && (
                  <IconButton onClick={() => handleRemoveComponent(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Stack>
            </Box>
          )
        })}
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
  )
}
