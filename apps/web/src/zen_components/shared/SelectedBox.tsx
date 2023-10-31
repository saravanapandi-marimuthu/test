import { Box, styled } from '@mui/material'

export const SelectedBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  border: `1px solid ${theme.palette.divider}`,
  padding: 5,
  boxShadow: 'none',
}))
