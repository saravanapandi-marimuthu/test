import React, { useState } from 'react'
import { Button, Popover, Tooltip, Typography } from '@mui/material'
import { Faders } from '@phosphor-icons/react'

export const ButtonWithPopover: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <Tooltip title="Filter">
          <Faders size={24} />
        </Tooltip>
      </Button>
      <Popover
        sx={{ marginTop: 1}}
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>CUSTOM FILTER</Typography>
      </Popover>
    </>
  )
}
