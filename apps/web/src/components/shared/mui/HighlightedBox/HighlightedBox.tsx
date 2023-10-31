import { Box, lighten, styled } from '@mui/material'

export const HighlightedBox = styled(Box)(({ theme }) => ({
  backgroundColor: lighten(theme.palette.action.hover, 0.2),
  padding: 2,
  paddingY: 3,
  border: 0,
}))
