import { TextField } from '@mui/material'
import styled from '@emotion/styled'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '4px',
  },
}))

StyledTextField.defaultProps = {
  fullWidth: true,
  size: 'small',
}
