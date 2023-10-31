import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { GET_AVAILABLE_ROLES } from '../../../graphql/queries'

interface Role {
  id: string
  roleName: string
}

export interface RolesSelectProps {
  title?: String
  onRoleSelect: (role: Role | null) => void
}

export const RolesSelect: React.FC<RolesSelectProps> = ({
  title = 'Select Role',
  onRoleSelect,
}) => {
  const { data, loading, error } = useQuery(GET_AVAILABLE_ROLES, {})

  useEffect(() => {
    console.log(data)
  }, [data])

  if (error) return <div>Error: {error.message}</div>

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      options={data?.getAvailableRoles || []}
      getOptionLabel={(option: Role) => option.roleName}
      onChange={(event, value) => onRoleSelect(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => <TextField {...params} label={title} />}
      loading={loading}
    />
  )
}
