import React, { useRef } from 'react'
import {
  Box,
  Checkbox,
  Container,
  Divider,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material'
import ZenTable from '../../zen_components/table/ZenTable/ZenTable'
import ColumnHeader from '../../zen_components/table/ColumnHeader/ColumnHeader'

import { Hash as HashIcon, Basket as BasketIcon } from '@phosphor-icons/react'
import { ZenTableColumn } from '../../zen_components/table/types/ZenTableColumn'
import { ZenTableOptions } from '../../zen_components/table/types/ZenTableOptions'
import { RowActionMenuProps } from '../../zen_components/table/types/RowActionMenu'
import { TagPicker } from '../../components/shared/TagPicker/TagPicker'
import { Tag } from '../../graphql/generated/graphql'
import { Stack } from '@phosphor-icons/react/dist/ssr'
import UomPicker from '../../zen_components/selectors/UomPicker/UomPicker'
import PackagePicker from '../../zen_components/selectors/PackagePicker/PackagePicker'
import EnumPicker from '../../zen_components/selectors/EnumPicker/EnumPicker'
import { set } from 'lodash'
import SingleLineTextBox from '../../zen_components/inputs/SingleLineTextBox/SingleLineTextBox'

const columns: ZenTableColumn<any>[] = [
  {
    name: 'id',
    label: 'Id',
    sortable: true,
    HeaderComponent: props => (
      <ColumnHeader icon={HashIcon} name={'Id'} {...props} />
    ),
    CellComponent: ({ rowData }) => (
      <SingleLineTextBox
        value={rowData.text}
        onChange={function (newValue: string): void {
          console.log('SingleLineTextBox', newValue)
        }}
      />
    ),
  },
  {
    name: 'uom',
    label: 'uom',
    HeaderComponent: props => (
      <ColumnHeader icon={HashIcon} name={'UoM'} {...props} />
    ),
    CellComponent: ({ rowData }) => (
      <UomPicker
        selectedUomId={rowData.uom}
        onChange={function (newSelectedUomId: number): void {
          console.log('UomPicker', newSelectedUomId)
        }}
      />
    ),
  },

  {
    name: 'package',
    label: 'Package',
    HeaderComponent: props => (
      <ColumnHeader icon={BasketIcon} name={'Package'} {...props} />
    ),
    CellComponent: ({ rowData }) => (
      <PackagePicker
        selectedPackageId={rowData.package}
        onChange={function (newSelectedPackageId: number): void {
          console.log('PackagePicker', newSelectedPackageId)
          // rowData.package = newSelectedPackageId
        }}
      />
    ),
  },
  {
    name: 'text',
    label: 'Text Column',
    sortable: true,
    HeaderComponent: props => (
      <ColumnHeader icon={HashIcon} name={'Tag'} {...props} />
    ),
    CellComponent: ({ rowData }) => (
      <TagPicker
        enableTitle={false}
        showAsMuiSelect={false}
        selectedTags={rowData.tags}
        onSelectedTagsChanged={function (tags: Tag[]): void {
          rowData.tags = tags
        }}
        tagCategoryName={'Crop'}
      />
    ),
  },
]

const data = [
  {
    id: 'One-1',
    uom: 1,
    tags: [{ name: 'Corn', tagCategory: { name: 'Crop' } }],
    text: 'Row 1',
    package: 1,
  },
  {
    id: 'One-2',
    uom: 2,
    tags: [{ name: 'Soybeans', tagCategory: { name: 'Crop' } }],
    text: 'Row 2',
    package: 2,
  },
  {
    id: 'One-3',
    uom: 3,
    tags: [{ name: 'Wheat', tagCategory: { name: 'Crop' } }],
    text: 'Row 3',
    package: 3,
  },
  {
    id: 'One-4',
    uom: 4,
    tags: [{ name: 'Sorghum', tagCategory: { name: 'Crop' } }],
    text: 'Row 4',
    package: 4,
  },
  {
    id: 'One-5',
    uom: 5,
    tags: [{ name: 'Corn', tagCategory: { name: 'Crop' } }],
    text: 'Row 5',
    package: 5,
  },
]

const MyCustomMenu: React.FC<RowActionMenuProps<any>> = ({
  rowData,
  actions,
  showMenu,
  onCloseMenu,
  anchorEl,
}) => {
  const handleClose = () => {
    console.log('handleClose')
    onCloseMenu()
  }

  const callAction = (name: string, data: any) => {
    const action = actions?.find(action => action.label === name)
    if (action) {
      action.action(data)
    }

    onCloseMenu()
  }

  return (
    <Popover
      anchorEl={anchorEl}
      open={showMenu}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              backgroundColor: 'background.paper',
            },
          },
        },
      }}
    >
      <Box padding={1}>
        {
          <Typography variant="body2" color="text.secondary">
            Row Action {rowData['id']}
          </Typography>
        }
        <MenuItem onClick={() => callAction('Test Action', 'test')}>
          Custom Action
        </MenuItem>
        <Divider />
        <Typography variant="caption">{rowData['id']}</Typography>
      </Box>
    </Popover>
  )
}

const testAction = (data: string) => {
  console.log('testAction', data)
}

const options: ZenTableOptions<any> = {
  pageSize: 10,
  currentPage: 0,
  searchFilter: '',
  rowContextMenuEnabled: true,
  lassoSelectEnabled: true,
  rowReorderEnabled: true,
  rowActionMenu: MyCustomMenu,
  rowActions: [
    {
      label: 'Test Action',
      action: testAction,
    },
  ],
}

export const ForTestPage: React.FC = () => {
  const [enumValue, setEnumValue] = React.useState('')
  return (
    <>
      <Box sx={{}}>
        {/* <ZenTable data={sampleData} /> */}
        <ZenTable
          columns={columns}
          data={data}
          idField={'id'}
          options={options}
        />
      </Box>

      <Box
        padding={1}
        sx={{ height: '100px', width: '300px', border: '1px solid red' }}
      >
        <EnumPicker
          width={'300px'}
          queryType={'retailOrderTypes'}
          selectedEnum={enumValue}
          onChange={function (newSelectedEnum: string): void {
            console.log('EnumPicker', newSelectedEnum)
            setEnumValue(newSelectedEnum)
          }}
          showAsMuiSelect={true}
          muiTitle={'Order Type'}
          hintText={'Select an Order Type'}
          allowNone={true}
        />
      </Box>
    </>
  )
}
