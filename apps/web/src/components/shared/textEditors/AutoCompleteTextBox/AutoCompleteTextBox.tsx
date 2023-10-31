import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react'
import TagChip from '../../TagChip/TagChip'
import { ChipSelect } from '../../selects/ChipSelect/ChipSelect'
import ManufacturerProductAutocomplete from '../../../manufacturers/ManufacturerProductAutocomplete/ManufacturerProductAutocomplete'
import { ManufactureInputState } from '../../../../types/productTypes'

export interface AutoCompleteTextBoxProps {
  selectedItems: string
  onEditSave: (newValue: string) => void
  label?: string
  isLabel?: boolean
  setManufacturerProducts?: (el: any) => void
}

/** AutoCompleteTextBox */
export const AutoCompleteTextBox: React.FC<AutoCompleteTextBoxProps> = ({
  selectedItems: value = '',
  onEditSave,
  label,
  isLabel = true,
  setManufacturerProducts,
}) => {
  const [editing, setEditing] = useState(false)
  // const [editedValue, setEditedValue] = useState<any[]>(value)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string>(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputData, setInputData] = useState<ManufactureInputState[] | []>([
    {
      value: '',
      inputValue: '',
      options: [],
      totalCount: 0,
      isSelectOption: false,
    },
  ])

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }
  }, [editing])

  const handleEditStart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)

    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    onEditSave(selectedItems)
    setEditing(false)
  }

  const handleManufacturerProductChange = (value: any, id: any) => {
    console.log('handleManufacturerProductChange', value, id)
    onEditSave(value)
  }

  return (
    <>
      <Box
        flexGrow={1}
        onClick={handleEditStart}
        sx={{ cursor: 'pointer', padding: 1 }}
        maxWidth={300}
        onMouseEnter={() => setShowEdit(true)}
        onMouseLeave={() => setShowEdit(false)}
      >
        <Stack direction="row" spacing={1}>
          <Box display={'flex'} flexGrow={1} sx={{ overflow: 'hidden' }}>
            <Typography noWrap component="div">
              {value}
            </Typography>
          </Box>
          <IconButton hidden={showEdit} aria-label="edit" size="small">
            <PencilSimpleIcon
              visibility={showEdit ? 'visible' : 'hidden'}
              fontSize="inherit"
            />
          </IconButton>
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditSave}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ padding: 0, border: '1px solid green' }}
        MenuListProps={{ sx: { padding: 0 } }}
        slotProps={{
          paper: {
            sx: {
              padding: 0,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent', // Override hover color here
              },
            },
          },
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            backgroundColor: 'transparent',
            minWidth: 300,
            maxWidth: 500,
            paddingTop: 0,
            paddingX: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Box sx={{ paddingTop: 0 }}>
              <Paper elevation={5}>
                <ManufacturerProductAutocomplete
                  index={0}
                  onChange={(value, id) =>
                    handleManufacturerProductChange(value, id)
                  }
                  inputData={inputData}
                  setInputData={setInputData}
                  label={label}
                  isLabel={isLabel}
                  setManufacturerProducts={setManufacturerProducts}
                />
                {/* <ChipSelect
                  // name='items'
                  inputRef={inputRef}
                  label={label}
                  showAsMuiSelect={false}
                  allAvailableItems={items}
                  selectedItems={selectedItems}
                  onEditSave={setSelectedItems}
                  isMultiple={isMultiple}
                /> */}
              </Paper>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </>
  )
}
