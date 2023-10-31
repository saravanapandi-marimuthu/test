import React, { useEffect, useState } from 'react'
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  Typography,
  Stack,
  IconButton,
} from '@mui/material'
import { CalculateOutlined } from '@mui/icons-material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Column } from '../../../types/types'
import { AddNewField } from '../../shared/Table/AddNewField'
import { DropdownTextBox } from '../../shared/textEditors/DropdownTextBox/DropdownTextBox'
import { NutrientFieldNeeds } from './NutrientFieldNeeds'
import {
  Check,
  Delete as DeleteIcon,
  RemoveOutlined,
} from '@mui/icons-material'
import ConfirmDialog from '../../shared/ConfirmDialog/ConfirmDialog'
import useCallbackState from '../../../utilities/useCallbackState'
import { GET_NUTRIENT_REMOVAL_RATES } from '../../../graphql/queries'
import { useQuery } from '@apollo/client'
import {
  Tag,
  UnitOfMeasurement,
  UnitOfMeasurementDocument,
  UnitOfMeasurementQuery,
} from '../../../graphql/generated/graphql'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import SingleLineTextBox from '../../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

export interface NutrientRemovalProps {}

const customTableBodyFooterRender = (options: any, handleAddRowFooter: any) => {
  const { columns } = options

  return (
    <AddNewField
      columns={columns}
      onAddNewField={handleAddRowFooter}
      label="Year"
    />
  )
}

const customTextFieldRender = (
  value: any,
  tableMeta: { rowIndex: any },
  updateValue: any,
  onEditSave: (value: any, index: number, displayData: any) => void,
  displayData: any[],
  textAlign: 'left' | 'right' | 'center' = 'right',
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
        textAlign={textAlign}
        type="number"
      />
    </Box>
  )
}

const customActionRender = (
  value: any,
  tableMeta: { rowIndex: any },
  updateValue: any,
  displayData: any[],
  handleDeleteNutrient: (nutrientData: any) => void,
  handleRemoveNutrient: (index: number) => void,
  confirmDialog: boolean,
  setConfirmDialog: (value: boolean) => void,
) => {
  const rowIndex = tableMeta.rowIndex
  const nutrient = displayData[rowIndex]

  return (
    <Box sx={{ minWidth: 100 }}>
      {nutrient?.isEdit ? (
        <>
          <IconButton onClick={() => handleRemoveNutrient(rowIndex)}>
            <RemoveOutlined />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={() => setConfirmDialog(true)}>
            <DeleteIcon />
          </IconButton>
          <ConfirmDialog
            title={'Delete Product Component'}
            open={confirmDialog}
            setOpen={setConfirmDialog}
            children={'Are you sure you want to delete this product component?'}
            onConfirm={() => handleDeleteNutrient(nutrient)}
          />
        </>
      )}
    </Box>
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
  const selectedItems = items.filter(item => {
    return item.name == value
  })
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
        label={'Unit'}
        onEditSave={unitOfMeasurement =>
          handleUOMChange(unitOfMeasurement, rowIndex, displayData)
        }
        isOpen={true}
      />
    </Stack>
  )
}

const customBodyRenderTags = (
  value: any,
  tableMeta: any,
  updateValue: any,
  displayData: any[],
  onEditTag: (selectedRow: any, newValue: Tag[]) => void,
  tagCategoryName: string = 'Crop Year',
) => {
  const rowIndex = tableMeta.rowIndex
  const selectedRow = displayData[rowIndex]
  let Tags: Tag[] = [] //retailerProduct.retailerProductTags?.map(el => el.tag)
  if (tagCategoryName === 'Crop Year') {
    if (selectedRow?.year) Tags.push(selectedRow?.year)
  } else if (tagCategoryName === 'Crop') {
    if (selectedRow?.crop) Tags.push(selectedRow?.crop)
  }
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
        tagCategoryName={tagCategoryName}
        onSelectedTagsChanged={tags => {
          onEditTag(rowIndex, tags)
        }}
        multiple={false}
      />
    </Stack>
  )
}

export const NutrientRemoval: React.FC<NutrientRemovalProps> = ({}) => {
  const displayData = [
    {
      year: {
        id: 13,
        tagName: '2022',
        tagCategoryName: {
          tagCategoryName: 'Crop Year',
        },
        color_index: 0,
      },
      crop: {
        id: 1,
        tagName: 'Corn',
        tagCategoryName: {
          tagCategoryName: 'Crop',
        },
        color_index: 0,
      },
      yield: 220,
      unitOfMeasurementId: 1,
      unitOfMeasurement: {
        id: 1,
        unitName: 'Bushels',
      },
    },
    {
      year: {
        id: 13,
        tagName: '2021',
        tagCategoryName: {
          tagCategoryName: 'Crop Year',
        },
        color_index: 0,
      },
      crop: {
        id: 1,
        tagName: 'Soybeans',
        tagCategoryName: {
          tagCategoryName: 'Crop',
        },
        color_index: 0,
      },
      yield: 60,
      unitOfMeasurementId: 1,
      unitOfMeasurement: {
        id: 1,
        unitName: 'Bushels',
      },
    },
  ]

  const [data, setData] = useCallbackState<any[]>(displayData)
  const [fieldNeeds, setFieldNeeds] = useState<any>({})
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [unitOfMeasurementData, setUnitOfMeasurementData] = useState<any[]>([])
  const [nutrientRemovalRates, setNutrientRemovalRates] = useCallbackState<
    any[]
  >([])
  const {
    data: nutrientRemovalRatesData,
    error: nutrientRemovalRatesError,
    loading: nutrientRemovalRatesLoading,
  } = useQuery(GET_NUTRIENT_REMOVAL_RATES, {
    variables: { companyId: '11111111-1111-1111-1111-111111111111' }, //user?.selectedUserRole?.companyId,
  })

  // const { user } = useUser()
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

  useEffect(() => {
    setNutrientRemovalRates(
      nutrientRemovalRatesData?.getNutrientRemovalRates?.nutrientRemovalRates,
    )
  }, [nutrientRemovalRatesLoading, nutrientRemovalRatesData])

  useEffect(() => {
    calculateFieldNeeds()
  }, [nutrientRemovalRates])

  useEffect(() => {
    calculateFieldNeeds()
  }, [])

  const calculateFieldNeeds = (fieldNeeds: any = data) => {
    const fieldNeedsData: any = {}
    for (let nutrientRemovalRate of nutrientRemovalRates) {
      fieldNeedsData[nutrientRemovalRate.nutrient.tagName] =
        fieldNeedsData[nutrientRemovalRate.nutrient.tagName] || 0
      for (let curr of fieldNeeds) {
        if (!curr.crop || !curr.yield || !curr.unitOfMeasurement || !curr.year)
          return
        if (curr.crop.tagName === nutrientRemovalRate.crop.tagName) {
          fieldNeedsData[nutrientRemovalRate.nutrient.tagName] +=
            curr.yield * nutrientRemovalRate.removalRateValue
        }
      }
    }
    setFieldNeeds(fieldNeedsData)
  }

  const handleAddRowFooter = (newRow: any) => {
    console.log('newRow', newRow)
    setData([...data, {}])
  }

  const onYearValueEdit = (index: any, newValue: Tag[]) => {
    console.log(index, newValue)
    setData(
      prev => {
        return prev.map((el, i) => {
          if (i === index) {
            return {
              ...el,
              year: newValue[0],
            }
          }
          return el
        })
      },
      newVal => {
        console.log(newVal)
        calculateFieldNeeds(newVal)
      },
    )
  }

  const onCropValueTag = (index: any, newValue: Tag[]) => {
    setData(
      prev => {
        return prev.map((el, i) => {
          if (i === index) {
            return {
              ...el,
              crop: newValue[0],
            }
          }
          return el
        })
      },
      newVal => {
        console.log(newVal)
        calculateFieldNeeds(newVal)
      },
    )
  }

  const onYieldValueEdit = (value: any, index: number, data: any) => {
    setData(
      prev => {
        return prev.map((el, i) => {
          if (i === index) {
            return {
              ...el,
              yield: value,
            }
          }
          return el
        })
      },
      newVal => {
        console.log(newVal)
        calculateFieldNeeds(newVal)
      },
    )
  }

  const onUnitOfMeasurementEdit = (unit: any, index: number, data: any) => {
    if (unit.length === 0) return
    setData(
      prev => {
        return prev.map((el, i) => {
          if (i === index) {
            return {
              ...el,
              unitOfMeasurement: {
                id: unit[0].id,
                unitName: unit[0].name,
              },
            }
          }
          return el
        })
      },
      newVal => {
        console.log(newVal)
        calculateFieldNeeds(newVal)
      },
    )
  }

  const handleDeleteNutrient = (nutrientData: any) => {
    console.log('nutrientData', nutrientData)
  }

  const handleRemoveNutrient = (index: number) => {
    console.log('index', index)
    setData(
      prev => {
        return prev.filter((el, i) => i !== index)
      },
      newVal => {
        calculateFieldNeeds(newVal)
      },
    )
  }

  const columns: Column[] = [
    {
      name: 'year',
      label: 'Year',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) =>
          customBodyRenderTags(
            value,
            tableMeta,
            updateValue,
            data,
            onYearValueEdit,
            'Crop Year',
          ),
      },
    },
    {
      name: 'crop.tagName',
      label: 'Crop',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customBodyRenderTags(
            value,
            tableMeta,
            updateValue,
            data,
            onCropValueTag,
            'Crop',
          ),
      },
    },
    {
      name: 'yield',
      label: 'Yield',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customTextFieldRender(
            value,
            tableMeta,
            updateValue,
            onYieldValueEdit,
            data,
          ),
      },
    },
    {
      name: 'unitOfMeasurement.unitName',
      label: 'Unit',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customUnitOfMeasurementRender(
            value,
            tableMeta,
            updateValue,
            unitOfMeasurementData,
            onUnitOfMeasurementEdit,
            displayData,
          ),
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
            data,
            handleDeleteNutrient,
            handleRemoveNutrient,
            confirmDialog,
            setConfirmDialog,
          ),
      },
    },
  ]

  const options: MUIDataTableOptions = {
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
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" fontWeight={700}>
          <CalculateOutlined /> Nutrient Removal Calculator
        </Typography>
      </Breadcrumbs>

      <Box position="relative">
        <MUIDataTable
          title={`Nutrient Removal Calculator`}
          data={data}
          columns={columns}
          options={options}
        />
        <Backdrop
          open={false}
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Box position="relative">
        <NutrientFieldNeeds fieldNeeds={fieldNeeds} />
      </Box>
    </div>
  )
}
