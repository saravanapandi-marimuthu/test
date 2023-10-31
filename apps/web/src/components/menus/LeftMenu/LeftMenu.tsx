import {
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Inventory,
} from '@mui/icons-material'
import {
  Divider,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useThemeMode } from '../../../contexts/ThemeContext'
import { useUser } from '../../../contexts/UserContext'
import LeftMenuMapper from '../LeftMenuMapper/LeftMenuMapper'
import UserLeftMenu from '../UserLeftMenu/UserLeftMenu'
import { SquaresFour as SquaresFourIcon } from '@phosphor-icons/react'
import { NavLink, useNavigate } from 'react-router-dom'
import horizenLogo from '../../../assets/horizen-logo-mini.png'

const RoleContextMenu: FunctionComponent<{}> = props => {
  const { loading } = useUser()

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <LeftMenuMapper />
      <UserLeftMenu />
    </>
  )
}

const LeftMenu: FunctionComponent<{ onClick: () => void }> = props => {
  const { theme, toggleTheme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'
  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: 'calc(100vh - 150px)',
          position: 'relative',
          padding: 0,
        }}
      >
        {/* Top Section */}

        <Box
          sx={{
            flexGrow: 0,
          }}
        >
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === '/'}
                onClick={() => navigate('/')}
              >
                <ListItemIcon>
                  <SquaresFourIcon size={24} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">Dashboard</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Middle Section */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          <List
            sx={{
              width: '100%',
              position: 'relative',
              overflowY: 'auto',
              maxHeight: '100%',
              '&::-webkit-scrollbar': {
                // for Chrome, Safari, and newer versions of Opera
                width: '0px',
                background: 'transparent',
              },
              '& scrollbarWidth': 'none', // for Firefox
              '& msOverflowStyle': 'none', // for Internet Explorer
            }}
          >
            <RoleContextMenu />
          </List>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            flexGrow: 0,
            overflow: 'hidden',
            minHeight: '100px',
          }}
        >
          <Stack
            direction="column"
            alignItems="stretch"
            spacing={0}
            padding={0}
          >
            <Box sx={{ paddingX: 2 }}>
              <Divider />
            </Box>
            <List disablePadding>
              <ListItem onClick={toggleTheme} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {isDarkMode ? (
                      <LightModeIcon fontSize="medium" />
                    ) : (
                      <DarkModeIcon fontSize="medium" />
                    )}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ noWrap: true }}>
                    {isDarkMode ? (
                      <Typography variant="body2">Light Mode</Typography>
                    ) : (
                      <Typography variant="body2">Dark Mode</Typography>
                    )}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <List disablePadding>
              <ListItem
                disablePadding
                alignItems="center"
                sx={{ padding: 1.5, paddingBottom: 3 }}
              >
                <NavLink to={'/'}>
                  <img
                    src={horizenLogo}
                    style={{ width: '32px' }}
                    alt="horizen logo"
                  />
                </NavLink>
              </ListItem>
            </List>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default LeftMenu
