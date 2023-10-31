import { styled } from '@mui/material'

export const CheckboxWrapper = styled('div')(({ theme }) => ({
  display: 'inline-block',

  '.MuiCheckbox-root': {
    visibility: 'hidden',
  },

  ':hover .MuiCheckbox-root': {
    visibility: 'visible',
  },

  '.MuiCheckbox-root.Mui-checked': {
    visibility: 'visible',
  },
}))
