import { Delete } from '@mui/icons-material'
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useState } from 'react'
import { UserRole } from '../../../graphql/generated/graphql'

const UserRoles = ({ roles }: { roles: UserRole[] }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    console.log('Test')
    setExpanded(!expanded)
  }

  const handleDeleteRole = (roleId: string) => {
    console.log(`Delete role with ID: ${roleId}`)
    // Implement role deletion logic here
  }

  return (
    <div>
      <Container>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 'sm', alignContent: 'center' }}
        >
          <Table style={{ maxWidth: '300' }} aria-label="User roles table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: '10px' }}>Company</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role: UserRole) => (
                <TableRow key={role.id}>
                  <TableCell
                    component="th"
                    sx={{ padding: '10px' }}
                    scope="row"
                  >
                    {role.company?.name}
                  </TableCell>
                  <TableCell>{role.rolesInfo[0].name}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default UserRoles
