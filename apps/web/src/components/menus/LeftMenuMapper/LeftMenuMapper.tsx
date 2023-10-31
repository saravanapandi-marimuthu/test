import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  CaretUp as CaretUpIcon,
  CaretDown as CaretDownIcon,
} from '@phosphor-icons/react'
import { LEFT_MENUS } from '../../../constants/menus'
import { useUser } from '../../../contexts/UserContext'

const LeftMenuMapper = () => {
  const { leftMenu } = useUser()

  const [sideMenus, setSideMenus] = useState(leftMenu)

  const handleToggle = menuKey => {
    let copySideMenus = [...sideMenus]
    copySideMenus[menuKey].collapseOpen = !copySideMenus[menuKey].collapseOpen
    localStorage.setItem('leftMenu', JSON.stringify(copySideMenus))
    setSideMenus(copySideMenus)
  }
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (route: string) => {
    navigate(route)
  }

  let newSideMenus = LEFT_MENUS.map((menuObj, menuKey) => {
    menuObj.collapseOpen = sideMenus[menuKey].collapseOpen
    return {
      ...menuObj,
    }
  })

  return (
    <>
      {newSideMenus.map((menuObj, menuKey) => {
        return (
          <List key={menuObj.menu} disablePadding>
            <ListItemButton onClick={() => handleToggle(menuKey)}>
              <ListItemIcon>
                <menuObj.icon size={24} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{menuObj.menu}</Typography>
              </ListItemText>
              {menuObj.collapseOpen ? (
                <CaretUpIcon size={24} />
              ) : (
                <CaretDownIcon size={24} />
              )}
            </ListItemButton>
            <Collapse in={menuObj.collapseOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 2 }}>
                {menuObj.subMenus.map((subMenuObj, subMenuKey) => {
                  return (
                    <ListItem key={subMenuObj.name} disablePadding>
                      <ListItemButton
                        selected={location.pathname === subMenuObj.route}
                        onClick={() => handleNavigation(subMenuObj.route)}
                      >
                        <ListItemIcon>
                          <subMenuObj.icon size={subMenuObj.iconSize} />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2">
                            {subMenuObj.name}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </List>
        )
      })}
    </>
  )
}

export default LeftMenuMapper
