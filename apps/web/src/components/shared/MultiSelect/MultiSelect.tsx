import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from '@mui/material'
import { backgroundColor } from '../../../contexts/ThemeContext'

interface MultiSelectProps {
  label: string
  filterList?: any[]
  onChange?: any
  index?: number
  column?: any
  filterData?: any[]
  onConfirm?: any
}
export const MultiSelect: React.FC<MultiSelectProps> = ({
  label = '',
  filterList = [],
  onChange = () => {},
  index = 0,
  column = {},
  filterData = [],
  onConfirm = () => {},
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: 200,
        OverflowY: 'initial',
      },
    },
    MenuListProps: {
      disablePadding: true,
    },
  }
  const styleWrapperLists = {
    maxHeight: 240,
    overflowY: 'scroll',
    overflowX: 'visible',
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

  return (
    <Box
      sx={{
        display: 'block',
        width: '200px',
      }}
    >
      <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={filterList[index]}
        input={<OutlinedInput label={label} />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{
          width: '100%',
          '.MuiPaper-root': {
            overflow: 'visible',
          },
          '.MuiList-root': {
            overflow: 'visible',
          },
        }}
      >
        <Box sx={styleWrapperLists}>
          {filterData[index].map((name: string, ind: number) => (
            <MenuItem
              key={name}
              value={name}
              selected={filterList[index].indexOf(name) > -1}
              onClick={() => {
                if (filterList[index].includes(name)) {
                  let filterData = filterList[index].filter(
                    (element: any) => element !== name,
                  )
                  onChange(filterData, index, column)
                  return
                }
                filterList[index] = [...filterList[index], name]
                onChange(filterList[index], index, column)
                return
              }}
            >
              <Checkbox checked={filterList[index].indexOf(name) > -1} />
              <Tooltip title={name}>
                <ListItemText
                  primary={name}
                  sx={{
                    '.MuiTypography-root': {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
              </Tooltip>
            </MenuItem>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 1,
            borderTop: '1px solid rgba(139, 139, 139, 0.2)',
          }}
        >
          <Button
            sx={{
              width: '100%',
              borderRadius: 0,
            }}
            variant="contained"
            onClick={() => {
              onConfirm()
              return
            }}
          >
            Apply
          </Button>
        </Box>
      </Select>
    </Box>
  )
}
