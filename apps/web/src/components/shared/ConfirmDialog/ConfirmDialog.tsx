import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  DialogContentText,
} from '@mui/material'
import { Close } from '@mui/icons-material'

interface ConfirmDialogProps {
  title: string
  children: string
  open: boolean
  setOpen: (open: boolean) => void
  onConfirm: () => void
}
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'Are you sure?',
  children = 'Are you sure you want to do this?',
  open,
  setOpen,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      // maxWidth="sm"
      // fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>{children}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setOpen(false)
            onConfirm()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
