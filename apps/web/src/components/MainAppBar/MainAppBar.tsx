import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Hidden from '@mui/material/Hidden'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import { Box, InputAdornment, Stack, TextField } from '@mui/material'
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ProfileMenu from '../menus/ProfileMenu/ProfileMenu'
import horizenLogo from '../../assets/horizen-logo-mini.png'
import { NavLink } from 'react-router-dom'
import GlobalSearchBar from '../GlobalSearchBar/GlobalSearchBar'
import PopoverMenu from '../menus/PopoverMenu/PopoverMenu'

function ElevationScroll(props: any) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

function ScrollTop(props: any) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          zIndex: 2000,
          position: 'fixed',
          bottom: theme => theme.spacing(2),
          right: theme => theme.spacing(2),
        }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

const MainAppBar = (props: any) => {
  const { openToggleClicked, drawerToggleClicked } = props

  return (
    <ElevationScroll {...props}>
      <>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: theme => theme.spacing(0, 1),
              ...theme => theme.mixins.toolbar,
              paddingLeft: theme => theme.spacing(2),
              '@media (min-width:900px)': {
                paddingRight: theme => theme.spacing(2),
              },
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Hidden smDown>
                <Stack
                  direction="row"
                  spacing={2}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={openToggleClicked}
                    onMouseOver={drawerToggleClicked}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>

                  <PopoverMenu />
                </Stack>
              </Hidden>
              <Hidden smUp>
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={drawerToggleClicked}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Box>

            <GlobalSearchBar />
            <ProfileMenu />
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" disableGutters />
        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>
    </ElevationScroll>
  )
}

export default MainAppBar
