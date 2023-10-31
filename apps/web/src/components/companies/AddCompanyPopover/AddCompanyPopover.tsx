import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { ADD_COMPANY } from '../../../graphql/mutations'
import { GET_COMPANIES } from '../../../graphql/companies/queries'
import { useUser } from '../../../contexts/UserContext'

const AddCompanyPopover = ({
  onClose,
  refetch,
}: {
  onClose: (companyName: string) => void
  refetch: () => void
}) => {
  const { user } = useUser()

  const [companyName, setCompanyName] = useState('')
  const [addError, setAddError] = useState('')

  const [addCompany] = useMutation(ADD_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  })

  const onSave = async () => {
    try {
      await addCompany({
        variables: {
          input: {
            name: companyName,
            parentCompanyId: user?.selectedUserRole?.company?.id,
          },
        },
      })
      setCompanyName('')
      onClose(companyName)
      refetch()
    } catch (error: any) {
      if (error.graphQLErrors) {
        const gqlError = error.graphQLErrors[0]
        console.log('GqlError=', gqlError)
        setAddError(error.message)
      } else {
        setAddError('An unknown error occurred.')
      }
    }
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Company</DialogTitle>
      <DialogContent>
        <Typography>
          Parent Company: {user?.selectedUserRole?.company?.name}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Company Name"
          type="text"
          fullWidth
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          error={Boolean(addError)}
          helperText={addError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose('')}>Cancel</Button>
        <Button onClick={onSave} disabled={!companyName.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCompanyPopover
