import React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Grid, Select } from '@mui/material'
import { Check as CheckIcon, X } from '@phosphor-icons/react'
import TagChip from '../../TagChip/TagChip'

export interface ChipSelectProps {
  label?: string
  inputRef?: any
  selectedItems?: any[]
  onEditSave?: (newValue: any[]) => void
  allAvailableItems: any[]
  isMultiple?: boolean
  showAsMuiSelect?: boolean
  isOpen?: boolean
}

export const ChipSelect: React.FC<ChipSelectProps> = ({
  label = '',
  inputRef,
  selectedItems = [],
  onEditSave = () => {},
  allAvailableItems: items = [],
  isMultiple = false,
  showAsMuiSelect: isLabel = false,
  isOpen = false,
}) => {
  const [open, setOpen] = React.useState(isOpen)
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    console.log(event, value)

    const selectedItemObjects = items.filter(item => item.name === value)
    onEditSave(selectedItemObjects)
  }

  const removeSelectedItem = (name: string) => {
    const newselectedItems = selectedItems.filter(item => item.name !== name)
    onEditSave(newselectedItems)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        {isLabel && <InputLabel id={'multiple-chip-label'}>{label}</InputLabel>}
        <Select
          id="items"
          labelId="multiple-chip-label"
          input={
            isLabel ? (
              <OutlinedInput id="select-multiple-chip" label={label} />
            ) : undefined
          }
          inputRef={inputRef}
          multiple={isMultiple}
          value={selectedItems.map(item => item.name)}
          onChange={handleChange}
          disableUnderline={true}
          variant={isLabel ? 'outlined' : 'standard'}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(item => (
                <TagChip
                  key={item}
                  colorIndex={1}
                  name={item}
                  deleteIcon={<X size={18} />}
                  onDelete={() => removeSelectedItem(item)}
                />
              ))}
            </Box>
          )}
        >
          {items.map(item => (
            <MenuItem key={item.id} value={item.name} autoFocus>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={10}>
                  <TagChip key={item.name} colorIndex={1} name={item.name} />
                </Grid>
                <Grid item xs={2}>
                  {selectedItems.some(
                    selectedItem => selectedItem.id === item.id,
                  ) && <CheckIcon size={18} />}
                  {/* Check mark */}
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
