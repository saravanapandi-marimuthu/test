// EditCompanyPopover.tsx
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
interface EditCompanyPopoverProps {
  selectedCompany: any
  setSelectedCompany: (company: any) => void
  onCloseEdit: () => void
  refetch: () => void
}

const EditCompanyPopover: React.FC<EditCompanyPopoverProps> = ({
  selectedCompany,
  setSelectedCompany,
  onCloseEdit,
  refetch,
}) => {
  {
    /* Edit Company Popover */
  }
  return (
    <Dialog open={selectedCompany !== null} onClose={onCloseEdit}>
      <DialogTitle>Edit Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Company name"
          fullWidth
          variant="outlined"
          value={selectedCompany?.name || ''}
          onChange={(e) =>
            setSelectedCompany({ ...selectedCompany, name: e.target.value })
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

export default EditCompanyPopover
