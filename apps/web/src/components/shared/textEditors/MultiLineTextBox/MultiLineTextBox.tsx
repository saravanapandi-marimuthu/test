import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material'

import { Check as CheckIcon } from '@phosphor-icons/react'

interface MultiLineTextBoxProps {
  value: string | undefined
  onEditSave: (newValue: string | undefined) => void
}

/**
 * This component is a text editor that allows the user to edit the text in a
 * multi-line text box. For example, it is used in the `Note` component to allow the user to
 * edit the note's text.
 */
const MultiLineTextBox: React.FC<MultiLineTextBoxProps> = ({
  value = undefined,
  onEditSave,
}) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    console.log('handleEditStart')
    setAnchorEl(event.currentTarget)

    setEditedValue(value)
    setEditing(true)
  }

  const handleEditCancel = () => {
    setAnchorEl(null)

    setEditing(false)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    onEditSave(editedValue)
    setEditing(false)
  }

  return (
    <>
      <Box
        flexGrow={1}
        onClick={handleEditStart}
        width="100%"
        sx={{ cursor: 'pointer', maxWidth: 500 }}
      >
        <Typography noWrap component="div" style={{ whiteSpace: 'pre-line' }}>
          {value}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditCancel}
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
            <Box sx={{ paddingBottom: 1, paddingRight: 1 }}>
              <Stack direction="row">
                <Box flexGrow={1}>&nbsp;</Box>
                <Button
                  startIcon={<CheckIcon size={18} />}
                  onClick={handleEditSave}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Box>
            <Box sx={{ padding: 1, paddingTop: 0 }}>
              <Paper elevation={5}>
                <TextField
                  inputRef={inputRef}
                  multiline
                  fullWidth
                  minRows={3}
                  maxRows={5}
                  value={editedValue ?? ''}
                  variant="outlined"
                  onKeyDown={e => {
                    e.stopPropagation()
                    //setEditedValue(e.target.)
                  }}
                  onChange={e => setEditedValue(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
              </Paper>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MultiLineTextBox
