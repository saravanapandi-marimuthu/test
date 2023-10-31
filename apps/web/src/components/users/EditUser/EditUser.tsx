import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_USER_BY_USER_ID } from '../../../graphql/queries'
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stack,
  Snackbar,
  Alert,
  AlertColor,
  useTheme,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ADD_USER_ROLE, DELETE_USER_ROLE } from '../../../graphql/mutations'
import { RolesSelect } from '../RolesSelect/RolesSelect'
import { CompanySearchBox } from '../../companies/CompanySearchBox/CompanySearchBox'
import { callSnackBar } from '../../../utilities/callSnackBar'

const EditUser = ({ userId }: { userId: string }) => {
  const [selectedRole, setSelectedRole] = useState<string | undefined>()
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>()

  const theme = useTheme()

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_USER_ID, {
    variables: { userId },
  })

  const [addUserRole] = useMutation(ADD_USER_ROLE)
  const [deleteUserRole] = useMutation(DELETE_USER_ROLE)

  useEffect(() => {
    refetch()
  }, [userId, refetch])

  const handleAddRole = async () => {
    console.log(
      `userId: ${userId} selectedRole: ${selectedRole} selectedCompany: ${selectedCompany}`,
    )

    if (selectedRole && selectedCompany) {
      try {
        await addUserRole({
          variables: {
            input: {
              userId: userId,
              companyId: selectedCompany,
              roleId: selectedRole,
            },
          },
        })
        refetch()
        callSnackBar('Role added successfully!', 'success')
      } catch (err: any) {
        callSnackBar(`Failed to add role: ${err.message}`, 'error')
      }
    } else {
      console.error('Role and company need to be selected')
    }
  }

  const handleDeleteRole = async (roleId: string, companyId: string) => {
    console.log(
      `userId: ${userId} selectedRole: ${roleId} selectedCompany: ${companyId}`,
    )
    try {
      await deleteUserRole({
        variables: {
          input: {
            userId: userId,
            companyId: companyId,
            roleId: roleId,
          },
        },
      })
      refetch()
      callSnackBar('Role deleted successfully!', 'success')
    } catch (err: any) {
      callSnackBar(`Failed to delete role: ${err.message}`, 'error')
    }
  }

  if (loading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Box paddingTop={20}>
      {data?.getUserByUserId ? (
        <Paper elevation={3} sx={{ width: '500px', p: 2 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" color="primary">
              {data.getUserByUserId.firstName} {data.getUserByUserId.lastName}
            </Typography>
            <Typography variant="body1">
              {data.getUserByUserId.email}
            </Typography>

            {/* Roles */}
            <List>
              {data.getUserByUserId.userRoles.map((userRole: any) => (
                <div key={userRole.roleId}>
                  <ListItem>
                    <ListItemText
                      primary={`Company: ${userRole.company.companyName}`}
                      secondary={`Role: ${userRole.role.roleName}`}
                    />
                    <ListItemIcon>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDeleteRole(userRole.roleId, userRole.companyId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                  <Divider component="li" />
                </div>
              ))}
            </List>

            {/* Add Role */}
            <Box display="block" gap={2} alignItems="center">
              <Stack direction="column" gap={2}>
                <CompanySearchBox
                  isRequired={true}
                  onCompanySelect={company => setSelectedCompany(company?.id)}
                />
                <Stack direction="row" gap={2} justifyContent="flex-end">
                  <RolesSelect
                    onRoleSelect={role => setSelectedRole(role?.id)}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRole}
                    sx={{ width: '150px' }}
                  >
                    Add Role
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h5" color="textSecondary">
          User not found
        </Typography>
      )}
    </Box>
  )
}

export default EditUser
