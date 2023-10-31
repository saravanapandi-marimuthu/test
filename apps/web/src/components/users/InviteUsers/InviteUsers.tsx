import {
  Box,
  Stack,
  TextField,
  Divider,
  Button,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import { CompanySearchBox } from '../../companies/CompanySearchBox/CompanySearchBox'
import { RolesSelect } from '../RolesSelect/RolesSelect'
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material'
import { INVITE_USERS } from '../../../graphql/mutations'
import { useMutation } from '@apollo/client'

const InviteUsers = () => {
  const [emails, setEmails] = useState([{ id: 0, email: '' }])
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>()
  const [selectedRole, setSelectedRole] = useState<string | undefined>()

  const [emailErrors, setEmailErrors] = useState([''])
  const [inviteUsers] = useMutation(INVITE_USERS)

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (index: number, newEmail: string) => {
    setEmails(
      emails.map((item, i) =>
        i === index ? { ...item, email: newEmail } : item,
      ),
    )

    if (!validateEmail(newEmail)) {
      setEmailErrors(
        emailErrors.map((error, i) =>
          i === index ? 'Please enter a valid email address' : error,
        ),
      )
    } else {
      setEmailErrors(emailErrors.map((error, i) => (i === index ? '' : error)))
    }
  }

  const handleAddEmailField = () => {
    setEmails([...emails, { id: Date.now(), email: '' }])
    setEmailErrors([...emailErrors, ''])
  }

  const handleDeleteEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index))
    setEmailErrors(emailErrors.filter((_, i) => i !== index))
  }

  const handleInviteUsers = async (event: any) => {
    event.stopPropagation()
    /*
    emails: [String!]!
    companyId: String!
    roleId: String!
*/
    const { data } = await inviteUsers({
      variables: {
        input: {
          emails: emails.map(email => email.email),
          companyId: selectedCompany,
          roleId: selectedRole,
        },
      },
    })

    console.log(data)
  }

  return (
    <>
      <Box sx={{ width: '500px', paddingX: 2, paddingTop: 12 }}>
        <Stack spacing={2}>
          {emails.map((item, index) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Enter email"
                  variant="outlined"
                  value={item.email}
                  error={!!emailErrors[index]}
                  helperText={emailErrors[index]}
                  required
                  sx={{ width: '420px' }}
                  onChange={e => handleEmailChange(index, e.target.value)}
                />
                {index !== 0 && (
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleDeleteEmail(index)}
                    aria-label="delete email"
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                {index === 0 && (
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleAddEmailField}
                    aria-label="add email"
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Stack>
            </Box>
          ))}

          <CompanySearchBox
            isRequired={true}
            onCompanySelect={company => setSelectedCompany(company?.id)}
          />

          <RolesSelect onRoleSelect={role => setSelectedRole(role?.id)} />
          <Divider />
          <Box sx={{ alignContent: 'flex-end', textAlign: 'right' }}>
            <Button
              variant="contained"
              disabled={
                !selectedCompany ||
                !selectedRole ||
                emailErrors.some(e => e !== '')
              }
              onClick={handleInviteUsers}
            >
              {emails.length === 1 ? 'Send Invite' : 'Send Invites'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default InviteUsers
