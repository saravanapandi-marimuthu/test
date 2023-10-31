import React, { ReactElement } from 'react'
import {
  Box,
  Divider,
  Hidden,
  Drawer,
  SwipeableDrawer,
  Theme,
  Typography,
} from '@mui/material'
import LeftMenu from '../../menus/LeftMenu/LeftMenu'

const drawerWidth = 350

interface SidebarProps {
  openSidebar: boolean
  drawSidebar: boolean
  open: () => void
  close: () => void
}

const SideDrawer: React.FC<SidebarProps> = ({
  openSidebar,
  drawSidebar,
  open,
  close,
}): ReactElement => {
  const drawerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 15 && !drawSidebar) {
        open()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [drawSidebar, open])

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!drawerRef.current) return

      const rect = drawerRef.current.getBoundingClientRect()
      if (e.clientX > rect.width) {
        close()
      }
    }

    document.addEventListener('mousemove', handleGlobalMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [close])

  const menuRender = (forceOpen: boolean) => (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        width: forceOpen || openSidebar ? drawerWidth : 0,
        overflow: forceOpen || openSidebar ? 'initial' : 'hidden',
        transition: (theme: Theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '@media (min-width:600px)': {
          width: (theme: Theme) =>
            forceOpen || openSidebar ? drawerWidth : theme.spacing(7) + 1,
        },
      }}
    >
      <Box
        flexGrow={0}
        sx={{
          paddingTop: 10,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <LeftMenu
          onClick={() => {
            console.log('test')
          }}
        />
      </Box>
    </Box>
  )

  return (
    <>
      {/* Left menu for desktop */}
      <Hidden smDown>
        {openSidebar && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              overflow: openSidebar ? 'initial' : 'hidden',
              transition: (theme: Theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              '@media (min-width:600px)': {
                width: (theme: Theme) =>
                  openSidebar ? drawerWidth : theme.spacing(7) + 1,
              },
            }}
          >
            <Box sx={{ paddingTop: '80px', overflow: 'hidden' }}>
              {menuRender(false)}
            </Box>
          </Drawer>
        )}
        {!openSidebar && (
          <SwipeableDrawer
            ref={drawerRef}
            anchor="left"
            open={drawSidebar}
            onClose={close}
            onOpen={open}
            onMouseLeave={close}
            ModalProps={{
              BackdropProps: {
                invisible: true,
              },
            }}
            sx={{
              width: drawerWidth,
              top: '100px',
              marginBottom: '50px',
              '& .MuiPaper-root': {
                top: '70px',
                height: 'calc(100vh - 100px)',
                overflowY: 'auto',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
              },
            }}
          >
            {menuRender(true)}
          </SwipeableDrawer>
        )}
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          anchor="left"
          open={drawSidebar}
          onClose={close}
          onOpen={open}
          sx={{ width: drawerWidth }}
        >
          {menuRender(true)}
        </SwipeableDrawer>
      </Hidden>
    </>
  )
}

export default SideDrawer
