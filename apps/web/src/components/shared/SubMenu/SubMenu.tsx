import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'

const SubMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  )
  const [thirdLevelAnchorEl, setThirdLevelAnchorEl] =
    useState<null | HTMLElement>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSubMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSubMenuAnchorEl(event.currentTarget)
  }

  const handleThirdLevelOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThirdLevelAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSubMenuAnchorEl(null)
    setThirdLevelAnchorEl(null)
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
        <MenuItem onClick={handleSubMenuOpen}>Product</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(['Service'])}>
          Service
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleThirdLevelOpen}>Chemical</MenuItem>
      </Menu>
      <Menu
        anchorEl={thirdLevelAnchorEl}
        open={Boolean(thirdLevelAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem
          onClick={() =>
            handleMenuItemClick(['Product', 'Chemical', 'Herbicide'])
          }
        >
          Herbicide
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick(['Product', 'Chemical', 'Fungicide'])
          }
        >
          Fungicide
        </MenuItem>
      </Menu>
    </div>
  )
}

export default SubMenu
