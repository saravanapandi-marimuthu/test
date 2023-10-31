import { TableCell, styled } from '@mui/material'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.selected .checkbox-wrapper .MuiCheckbox-root': {
    visibility: 'visible',
  },
  '&:hover .checkbox-wrapper .MuiCheckbox-root': {
    visibility: 'visible',
  },
  paddingTop: 0,
  paddingBottom: 0,
}))
