import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'

const FlatTreeMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (items: string[]) => {
    setSelectedItems(items)
    handleClose()
  }

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" onClick={handleClick}>
          Selected Items:
        </Typography>
        {selectedItems.map((item, index) => (
          <Chip key={index} label={item} />
        ))}
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick(['Product'])}>
          Product
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(['Product', 'Chemical'])}
          style={{ paddingLeft: 30 }}
        >
          Chemical
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick(['Product', 'Chemical', 'Herbicide'])
          }
          style={{ paddingLeft: 60 }}
        >
          Herbicide
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(['Product', 'Seed'])}
          style={{ paddingLeft: 30 }}
        >
          Seed
        </MenuItem>
      </Menu>
    </div>
  )
}

export default FlatTreeMenu
