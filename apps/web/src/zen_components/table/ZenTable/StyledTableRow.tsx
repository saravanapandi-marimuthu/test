import { TableRow, styled } from '@mui/material'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.selected .checkbox-wrapper .MuiCheckbox-root': {
    visibility: 'visible',
  },

  '&:hover .ZenTable-showOnHover': {
    visibility: 'visible',
  },
  paddingTop: 0,
  paddingBottom: 0,

  '& .MuiTableCell-root': {
    //padding: '0px 16px', // adjust padding values as per your need
  },
}))
