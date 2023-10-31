import { Button } from '@mui/material'
import { closeSnackbar, VariantType, enqueueSnackbar } from 'notistack'

export const callSnackBar = (text: string, variant: VariantType) => {
  const action = (snackbarId: any) => (
    <Button
      sx={{
        color: '#fff',
      }}
      variant="text"
      onClick={() => {
        closeSnackbar(snackbarId)
      }}
    >
      Close
    </Button>
  )
  const options = {
    variant: variant,
    autoHideDuration: 3500,
    action,
  }

  return enqueueSnackbar(text, options)
}
