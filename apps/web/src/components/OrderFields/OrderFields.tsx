import React, { useState, useEffect } from 'react'
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from 'mui-datatables'
import {
  Box,
  Toolbar,
  IconButton,
  Collapse,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material'
import { Add, ArrowDropDown, Refresh } from '@mui/icons-material'
import TagChip from '../shared/TagChip/TagChip'
import { MultiSelect } from '../shared/MultiSelect/MultiSelect'
import { AutocompleteDropdown } from '../shared/AutocompleteDropdown/AutocompleteDropdown'
import { GET_FIELDS_FOR_COMPANY } from '../../graphql/enterpriseItems/queries'
import { useQuery } from '@apollo/client'
import SingleLineTextBox from '../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

export interface OrderFieldsProps {
  data: any[]
  enterpriseId: string
}

const customeTextFieldRender = (
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

const customTableBodyFooterRender = (
  options: any,
  displayData: any,
  handleAddRowFooter: any,
) => {
  const activeFieldVersion = displayData[0]?.fieldVersions?.find(
    (fieldVersion: any) => fieldVersion.active,
  )?.estimatedArea
  const totalAcres = displayData.reduce((acc: number, curr: any) => {
    const activeFieldVersion = curr?.fieldVersions?.find(
      (fieldVersion: any) => fieldVersion.active,
    )
    acc = acc + activeFieldVersion?.estimatedArea
    return acc
  }, 0)
  const totalBillable = displayData.reduce((acc: number, curr: any) => {
    acc = acc + curr.billable || 0
    return acc
  }, 0)
  return (
    <tr>
      <td></td>
      <td>
        <Typography
          variant={'body1'}
          fontWeight={700}
          padding={1}
          textAlign={'right'}
        >
          Total
        </Typography>
      </td>
      <td>
        <Typography
          textAlign={'right'}
          variant={'body1'}
          padding={1}
          fontWeight={700}
        >
          {totalAcres.toFixed(2)}
        </Typography>
      </td>
      <td>
        <Typography
          variant={'body1'}
          fontWeight={700}
          padding={1}
          // marginRight={5}
          textAlign={'right'}
        >
          {totalBillable.toFixed(2)}
        </Typography>
      </td>
    </tr>
  )
}

export const OrderFields = ({ data, enterpriseId }: OrderFieldsProps) => {
  const [expanded, setExpanded] = useState(true)
  const [displayData, setDisplayData] = useState<any[]>([])
  const [searchField, setSearchField] = useState<string>('')
  const [fields, setFields] = useState<any[]>([])
  const [enterpriseIdState, setEnterpriseIdState] =
    useState<string>(enterpriseId)

  const {
    data: fieldsData,
    loading,
    error,
  } = useQuery(GET_FIELDS_FOR_COMPANY, {
    variables: {
      input: {
        companyId: enterpriseId,
      },
    },
    // skip: searchField.length < 4, // Skip the query if searchTerm has less than 4 characters
  })

  useEffect(() => {
    setEnterpriseIdState(enterpriseId)
  }, [enterpriseId])

  useEffect(() => {
    const fields = fieldsData?.getFieldsForCompany.map((field: any) => {
      console.log('field', field)
      return {
        id: field?.field?.id,
        name: field.field?.fieldName,
      }
    })
    setFields(fields)
  }, [fieldsData])

  useEffect(() => {
    setDisplayData(data)
  }, [data])

  const handleAddRowFooter = () => {
    console.log('handleAddRowFooter')
  }

  const handleFieldChange = (value: any) => {
    let fields = value.map((field: any) => {
      return fieldsData?.getFieldsForCompany.find(
        (fieldData: any) => fieldData.field.id === field.id,
      ).field
    })
    setDisplayData(fields)
  }

  const columns: MUIDataTableColumn[] = [
    {
      name: 'fieldName',
      label: 'Field',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          return <Typography>{displayData[rowIndex].fieldName}</Typography>
        },
      },
    },
    {
      name: 'crop',
      label: 'Crop',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          // Get list of tags from field.fieldTags where tagCategoryName === 'Crop'
          const cropTags =
            displayData[rowIndex].fieldTags?.filter(
              (fieldTag: any) =>
                fieldTag?.tag?.tagCategory?.tagCategoryName === 'Crop',
            ) ?? []

          const activeFieldVersion = displayData[rowIndex]?.fieldVersions?.find(
            (fieldVersion: any) => fieldVersion.active,
          )

          console.log('activeFieldVersion', activeFieldVersion)
          return (
            <div>
              <Stack direction="row" spacing={1}>
                {cropTags.map((cropTag: any) => (
                  <TagChip
                    colorIndex={cropTag?.tag?.colorIndex ?? 0}
                    name={cropTag?.tag?.tagName ?? ''}
                  />
                ))}
              </Stack>
            </div>
          )
        },
      },
    },
    {
      name: 'acres',
      label: 'Acres',
      options: {
        setCellHeaderProps: () => {
          return { align: 'right' }
        },
        setCellProps: () => {
          return { align: 'right' }
        },
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          console.log('######## fields', displayData)
          const rowIndex = tableMeta.rowIndex

          const activeFieldVersion = displayData[rowIndex]?.fieldVersions?.find(
            (fieldVersion: any) => fieldVersion.active,
          )

          return (
            <Typography variant="body1" textAlign={'right'}>
              {activeFieldVersion?.estimatedArea}
            </Typography>
          )
        },
      },
    },
    {
      name: 'billable',
      label: 'Billable',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => {
          return { align: 'right' }
        },
        setCellProps: () => {
          return { align: 'right' }
        },
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          customeTextFieldRender(
            value,
            tableMeta,
            updateValue,
            onBillableValueEdit,
            displayData,
          ),
      },
    },
  ]
  const options: MUIDataTableOptions = {
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: 1,
    page: 1,
    rowsPerPageOptions: [10, 25, 50],
    count: 1,
    sort: false,
    fixedHeader: true,
    search: false,
    viewColumns: false,
    filter: false,
    download: false,
    print: false,
    searchAlwaysOpen: false,
    selectableRows: 'none',
    pagination: false,
    customTableBodyFooterRender: options => {
      return customTableBodyFooterRender(
        options,
        displayData,
        handleAddRowFooter,
      )
    },
  }

  const onBillableValueEdit = (value: any, index: number, displayData: any) => {
    setDisplayData(prevState => {
      const newState = [...prevState]
      newState[index].billable = value
      return newState
    })
  }

  return (
    <Box marginBottom={5}>
      <AutocompleteDropdown
        isMultiple={true}
        title={'Add Fields'}
        isRequired={false}
        onSelect={handleFieldChange}
        data={fields}
        loading={false}
        setDebouncedSearchTerm={setSearchField}
      />
      <Collapse in={expanded} sx={{ marginTop: 4 }}>
        <MUIDataTable
          title={''}
          data={displayData}
          columns={columns}
          options={options}
        />
      </Collapse>
    </Box>
  )
}
