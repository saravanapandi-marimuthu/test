import { Box, styled } from '@mui/material'

export const HoverBox = styled(Box)(({ theme }) => ({
  display: 'flex', // use flexbox
  alignItems: 'center', // vertical centering
  flexGrow: 1,
  cursor: 'pointer',
  minWidth: 100,
  minHeight: 38,
  border: '1px solid transparent',
  borderRadius: 4,
  '&:hover': {
    // border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.action.hover}`,
  },
  padding: 4,
}))
