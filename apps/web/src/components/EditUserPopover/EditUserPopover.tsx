// EditUserPopover.tsx
import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { TextField } from '@mui/material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
interface EditUserPopoverProps {
  selectedUser: any
  setSelectedUser: (user: any) => void
  onCloseEdit: () => void
  refetch: () => void
}

const EditUserPopover: React.FC<EditUserPopoverProps> = ({
  selectedUser,
  setSelectedUser,
  onCloseEdit,
  refetch,
}) => {
  {
    /* Edit User Popover */
  }
  return (
    <Dialog open={selectedUser !== null} onClose={onCloseEdit}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          variant="outlined"
          value={selectedUser?.username || ''}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, username: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={selectedUser?.email || ''}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, email: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseEdit} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {}} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserPopover
