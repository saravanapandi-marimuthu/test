import { lighten, styled } from '@mui/material'

export const LassoContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: '50px',
  paddingTop: '100px',
  //backgroundColor: 'lightgray',
  //backgroundColor: lighten(theme.palette.action.hover, 0.5),
}))
