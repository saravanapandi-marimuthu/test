import { Box, Drawer } from '@mui/material'
import React from 'react'
import { FunctionComponent, useState } from 'react'
import Footer from '../../components/shared/Footer/Footer'
import LeftMenu from '../../components/menus/LeftMenu/LeftMenu'
import MainAppBar from '../../components/MainAppBar/MainAppBar'

const drawerWidth = 240

const MobileDrawer: FunctionComponent<{
  container?: () => any
  open: boolean
  onClose: () => void
  children: React.ReactNode
}> = props => {
  return (
    <Drawer
      variant="temporary"
      container={props.container}
      open={props.open}
      onClose={props.onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {props.children}
    </Drawer>
  )
}

const DesktopDrawer: FunctionComponent<{
  open: boolean
  children: React.ReactNode
}> = props => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          transition: theme =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          boxSizing: 'border-box',
          ...(!props.open && {
            overflowX: 'hidden',
            transition: theme =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            width: theme => ({ xs: theme.spacing(7), sm: theme.spacing(9) }),
          }),
        },
      }}
      open={props.open}
    >
      {props.children}
    </Drawer>
  )
}

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => setOpen(!open)
  const drawer = <LeftMenu onClick={toggleDrawer} />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <MainAppBar open={open} onClick={toggleDrawer} />
      <Box
        component="nav"
        aria-label="menu items"
        sx={{
          display: 'flex',
          flexGrow: 1,
          minHeight: 'calc(100vh - 64px)', // Adjust 64px based on your AppBar and Footer height
        }}
      >
        <MobileDrawer open={open} onClose={toggleDrawer}>
          {drawer}
        </MobileDrawer>
        <DesktopDrawer open={open}>{drawer}</DesktopDrawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
          }}
        >
          <Box
            sx={{
              maxHeight: 'calc(100vh - 64px - 56px)', // Adjust 64px for AppBar and 56px for Footer height
              overflowY: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
