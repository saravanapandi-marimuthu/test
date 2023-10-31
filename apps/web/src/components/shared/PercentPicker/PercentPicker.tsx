import React, { useState, useEffect, useRef } from 'react'
import {
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Menu,
  MenuList,
  styled,
} from '@mui/material'

import { Check as CheckIcon } from '@phosphor-icons/react'

const HoverBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  cursor: 'pointer',
  maxWidth: 300,
  border: '1px solid transparent',
  borderRadius: 4,
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`, // replace 'primary.main' with your desired color from the theme
  },
}))

type PercentPickerProps = {
  value: number
  onChange: (newValue: number) => void
  options?: number[]
  width?: string | number
}

const PercentPicker: React.FC<PercentPickerProps> = ({
  value,
  onChange,
  options = [0, 25, 40, 50, 60, 75, 100],
  width = '100%',
}) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hoverBoxRef.current) {
      setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
    }

    // Optionally handle window resize if you expect the HoverBox to resize on window resize:
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
    setAnchorEl(event.currentTarget)

    setEditedValue(value)
    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    const newValue = editedValue ?? 0

    onChange(newValue)
    setEditing(false)
  }

  const handleMenuItemClick = (value: number) => {
    setAnchorEl(null)

    setEditedValue(value)

    onChange(value)
    setEditing(false)
  }

  return (
    <>
      <HoverBox ref={hoverBoxRef} onClick={handleEditStart}>
        <Typography
          variant="body1"
          width={width}
          sx={{
            textAlign: 'right',
            cursor: 'pointer',
            padding: 1,
          }}
        >
          {`${value}%`}
        </Typography>
      </HoverBox>
      <Menu
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditSave}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ padding: 0, border: '1px solid green' }}
        MenuListProps={{
          sx: {
            width: hoverBoxWidth ? `${hoverBoxWidth}px` : 'auto',
            padding: 0,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
            },
          },
        }}
      >
        <MenuItem
          sx={{ paddingTop: 0, paddingX: 1 }}
          onKeyDown={e => e.stopPropagation()}
          focusRipple={false}
        >
          <TextField
            autoFocus
            variant="outlined"
            size="small"
            fullWidth
            value={editedValue}
            type="number"
            onChange={e => setEditedValue(parseFloat(e.target.value) ?? 0)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleEditSave()
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputMode: 'decimal',
              style: { textAlign: 'right', border: 'none' },
            }}
            inputProps={{ style: { textAlign: 'right' } }}
          />
        </MenuItem>
        <MenuList dense>
          {options.map(option => (
            <MenuItem
              key={option}
              onClick={() => handleMenuItemClick(option)}
              sx={{
                backgroundColor: value === option ? '#f0f0f0' : 'transparent',
              }}
            >
              {value === option && (
                <ListItemIcon>
                  <CheckIcon size={18} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={`${option}%`}
                primaryTypographyProps={{ align: 'right' }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default PercentPicker
