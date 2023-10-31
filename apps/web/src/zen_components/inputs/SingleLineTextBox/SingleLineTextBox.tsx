import React, { useState, useEffect, useRef } from 'react'
import { Box, Popover, Stack, Typography, TextField } from '@mui/material'

import { HoverBox } from '../../shared/HoverBox'

type SingleLineTextBoxProps = {
  value: string
  type?: 'string' | 'number'
  textAlign?: 'left' | 'center' | 'right'
  onChange: (updatedText: string) => void
  width?: string | number
  enabled?: boolean
  showAsMuiSelect?: boolean
  muiTitle?: string
  hintText?: string
}

const SingleLineTextBox: React.FC<SingleLineTextBoxProps> = ({
  value,
  type = 'string',
  textAlign = 'left',
  onChange,
  width = '100%',
  enabled = true,
  showAsMuiSelect = false,
  muiTitle = '',
  hintText = '',
}) => {
  const [editing, setEditing] = useState(false)

  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)

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

    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    setEditing(false)
  }

  const handleMenuItemClick = (value: string) => {
    onChange(value)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEditSave()
    }
  }

  return (
    <>
      {showAsMuiSelect ? (
        <TextField
          fullWidth
          inputProps={{ style: { textAlign: textAlign } }}
          size="small"
          variant="outlined"
          value={value}
          type={type}
          onChange={event => handleMenuItemClick(event.target.value as string)}
          label={value ? muiTitle : hintText}
        />
      ) : enabled ? (
        <HoverBox
          width={'100%'}
          padding={0.5}
          ref={hoverBoxRef}
          onClick={handleEditStart}
        >
          <Typography
            variant="body1"
            width={width}
            sx={{ textAlign: textAlign, minWidth: '100%' }}
          >
            {value ?? hintText}
          </Typography>
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
          <Box sx={{ overflow: 'auto' }}>
            <TextField
              inputRef={inputRef}
              type={type}
              fullWidth
              inputProps={{ style: { textAlign: textAlign } }}
              size="small"
              variant="outlined"
              value={value}
              onKeyUp={handleKeyPress}
              onChange={event =>
                handleMenuItemClick(event.target.value as string)
              }
            />
          </Box>
        </Stack>
      </Popover>
    </>
  )
}

export default SingleLineTextBox
