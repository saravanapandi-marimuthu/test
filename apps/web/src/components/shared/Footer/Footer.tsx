import { AppBar, Box, Fab, IconButton, Toolbar, styled } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import MoreIcon from '@mui/icons-material/MoreVert'

const Footer = () => {
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  })

  return (
    <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <StyledFab color="secondary" aria-label="add">
          <AddIcon />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }}>
          <div className="container mx-auto text-center text-xs">
            <p>
              &copy; {new Date().getFullYear()} Horizen Ag Inc. All rights
              reserved.
            </p>
          </div>
        </Box>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
