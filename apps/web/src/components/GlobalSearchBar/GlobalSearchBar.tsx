import React from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

const GlobalSearchBar = () => {
  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for Customer, Orders and Invoices"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  )
}

export default GlobalSearchBar
