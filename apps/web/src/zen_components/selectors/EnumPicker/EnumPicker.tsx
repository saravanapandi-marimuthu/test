import React, { useState, useEffect, useRef } from 'react'
import {
  MenuItem,
  Box,
  MenuList,
  styled,
  Popover,
  Grid,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Check as CheckIcon } from '@phosphor-icons/react'
import { useQuery } from '@apollo/client'
import {
  ProductCategoriesDocument,
  ProductTypesDocument,
  RetailOrderTypesDocument,
  RoleTypesDocument,
} from '../../../graphql/generated/graphql'
import TagChip from '../../../components/shared/TagChip/TagChip'
import { find } from 'lodash'
import { HoverBox } from '../../shared/HoverBox'
import { SelectedBox } from '../../shared/SelectedBox'

export interface EnumItem {
  value: string
  name: string
  colorIndex: number
}

const QUERY_DOCUMENTS: {
  [key: string]: {
    document: any
    typename: string
  }
} = {
  productCategories: {
    document: ProductCategoriesDocument,
    typename: 'productCategories',
  },
  productTypes: {
    document: ProductTypesDocument,
    typename: 'productTypes',
  },
  roleTypes: {
    document: RoleTypesDocument,
    typename: 'roleTypes',
  },
  retailOrderTypes: {
    document: RetailOrderTypesDocument,
    typename: 'retailOrderTypes',
  },
}

type EnumPickerProps = {
  queryType:
    | 'productCategories'
    | 'productTypes'
    | 'roleTypes'
    | 'retailOrderTypes'
  selectedEnum: string
  onChange: (
    newSelectedEnumValue: string,
    selectedEnum: Partial<EnumItem> | undefined,
  ) => void
  width?: string | number
  enabled?: boolean
  allowNone?: boolean
  showAsMuiSelect?: boolean
  muiTitle?: string
  hintText?: string
}

const EnumPicker: React.FC<EnumPickerProps> = ({
  queryType,
  selectedEnum,
  onChange,
  width = '100%',
  enabled = true,
  allowNone = false,
  showAsMuiSelect = false,
  muiTitle = '',
  hintText = '',
}) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(selectedEnum)
  const [enumItems, setEnumItems] = useState<EnumItem[]>([])

  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)
  const menuItemRefs = useRef<{ [key: number]: HTMLLIElement | null }>({})

  const { loading, error, data } = useQuery(
    QUERY_DOCUMENTS[queryType].document,
    {
      variables: {},

      onCompleted: data => {
        const enums = data?.[QUERY_DOCUMENTS[queryType].typename]
          ?.items as EnumItem[]

        setEnumItems(enums)
      },
    },
  )

  useEffect(() => {
    if (hoverBoxRef.current) {
      setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (hoverBoxRef.current) {
        setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    if (!enabled) {
      return
    }

    setAnchorEl(event.currentTarget)

    setEditedValue(selectedEnum)
    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    const newValue = editedValue ?? 0
    //data.tagsByCategoryName?.items.find(tag => tag.value === newValue)

    onChange(
      newValue,
      enumItems.find(enumItem => enumItem.value === newValue),
    )
    setEditing(false)
  }

  const handleMenuItemClick = (value: string) => {
    setAnchorEl(null)

    setEditedValue(value)

    onChange(
      value,
      enumItems.find(enumItem => enumItem.value === value),
    )
    setEditing(false)
  }

  const findEnumItem = (value: string) => {
    return enumItems.find(unit => String(unit.value) === String(value))
  }

  const colorIndex = findEnumItem(selectedEnum)?.colorIndex ?? 0
  const name = findEnumItem(selectedEnum)?.name ?? ''

  return (
    <>
      {showAsMuiSelect ? (
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={''}
          onClick={handleEditStart}
          label={selectedEnum ? muiTitle : hintText}
          InputProps={{
            startAdornment: selectedEnum && (
              <InputAdornment position="start">
                <TagChip
                  colorIndex={colorIndex}
                  name={name}
                  onDelete={
                    allowNone ? () => handleMenuItemClick('') : undefined
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ArrowDropDownIcon />
                </IconButton>
              </InputAdornment>
            ),
            readOnly: true,
          }}
        />
      ) : enabled ? (
        <HoverBox padding={0.5} ref={hoverBoxRef} onClick={handleEditStart}>
          {selectedEnum && (
            <TagChip
              colorIndex={colorIndex}
              name={name}
              onDelete={allowNone ? () => handleMenuItemClick('') : undefined}
            />
          )}
        </HoverBox>
      ) : (
        <> </>
      )}

      <Popover
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditSave}
        anchorOrigin={
          showAsMuiSelect
            ? { vertical: 'bottom', horizontal: 'left' }
            : { vertical: 'top', horizontal: 'left' }
        }
        transformOrigin={
          showAsMuiSelect
            ? { vertical: 'top', horizontal: 'left' }
            : { vertical: 'top', horizontal: 'left' }
        }
        sx={{
          padding: 0,
          border: '1px solid green',
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
              width: hoverBoxWidth ? `${hoverBoxWidth}px` : 'auto',
              minWidth: 300,
            },
          },
        }}
      >
        <Stack direction="column">
          {!showAsMuiSelect && (
            <SelectedBox onClick={() => setEditing(false)}>
              {selectedEnum ? (
                <TagChip colorIndex={colorIndex} name={name} />
              ) : (
                <Typography
                  padding={1}
                  variant="caption"
                  color="text.secondary"
                >
                  {hintText}
                </Typography>
              )}
            </SelectedBox>
          )}
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            <MenuList dense>
              {enumItems.map(enumItem => {
                return (
                  <MenuItem
                    ref={el => {
                      menuItemRefs.current[enumItem.value] = el
                      if (enumItem.value === selectedEnum && el) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'start',
                        })
                      }
                    }}
                    key={enumItem.name}
                    onClick={() => handleMenuItemClick(enumItem.value)}
                    sx={{
                      backgroundColor:
                        selectedEnum === enumItem.value
                          ? '#f0f0f0'
                          : 'transparent',
                    }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={10}>
                        <TagChip
                          key={enumItem.value}
                          colorIndex={enumItem.colorIndex}
                          name={enumItem.name}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        {/* Check mark */}
                        {selectedEnum === enumItem.value && (
                          <CheckIcon size={18} />
                        )}
                      </Grid>
                    </Grid>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}

export default EnumPicker
