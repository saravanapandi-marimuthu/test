import React, { ReactNode, useState } from 'react'
import { AppBar, CssBaseline, Hidden, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'

import MainAppBar from '../../components/MainAppBar/MainAppBar'
import SideDrawer from '../../components/shared/SideDrawer/SideDrawer'
import Footer from '../../components/shared/Footer/Footer'
import { useThemeMode } from '../../contexts/ThemeContext'

interface UserLayoutProps {
  children: ReactNode
}

const PrimaryUserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [sideDrawOpen, setSideDrawOpen] = useState(false)
  const { collapsedMenu, toggleCollapsedMenu } = useThemeMode()

  const { theme } = useThemeMode()

  const onSideOpen = (e: any) => {
    toggleCollapsedMenu()
  }
  const onDrawOpen = (e: any) => {
    console.log('onDrawOpen')
    setSideDrawOpen(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        padding: 0,
      }}
    >
      <CssBaseline />
      <MainAppBar
        openToggleClicked={onSideOpen}
        drawerToggleClicked={onDrawOpen}
      />
      <SideDrawer
        openSidebar={!collapsedMenu}
        drawSidebar={sideDrawOpen}
        open={function (): void {
          setSideDrawOpen(true)
        }}
        close={function (): void {
          setSideDrawOpen(false)
        }}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          pt: 12,
          px: 2,
        }}
      >
        <CssBaseline />

        {children}
        <Box sx={{ marginTop: 8 }} />
      </Box>
      <Hidden smDown>
        <AppBar
          position="fixed"
          color="default"
          sx={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar>
            <Box display={'flex'} justifyContent={'right'} width={'100%'}>
              {import.meta.env.VITE_ENVIRONMENT !== 'prod' && (
                <Typography
                  variant="body2"
                  color={'InfoText'}
                  style={{ color: theme.palette.warning.main }}
                >
                  {import.meta.env.VITE_ENVIRONMENT}
                </Typography>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden smUp>
        <Footer />
      </Hidden>
    </Box>
  )
}

export default PrimaryUserLayout
