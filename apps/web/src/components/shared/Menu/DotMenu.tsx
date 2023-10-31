import { IconButton, Menu, MenuItem } from '@mui/material'
import { DotsThreeVertical } from '@phosphor-icons/react'
import React from 'react'

interface DotMenu {
  handleClick: (al: any) => void
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: (al: any) => void
  dataItemsMenu: any
}

export const DotMenu: React.FC<DotMenu> = ({
  handleClick,
  anchorEl,
  open,
  handleClose,
  dataItemsMenu,
}) => {
  const styleMenu = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 4px rgba(151, 151, 151, 0.096))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }

  return (
    <>
      <IconButton aria-label="menu" onClick={handleClick}>
        <DotsThreeVertical size={24} color="#565d6d" weight="bold" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: styleMenu,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {dataItemsMenu.map((el: any, ind: number) => {
          return (
            <MenuItem key={ind} onClick={el.onClick}>
              {el.children()}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
