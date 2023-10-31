import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { GET_USERS } from '../../../graphql/queries'
import { debounce } from 'lodash'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface User {
  id: string
  username: string
}

export interface UserSearchBoxProps {
  onUserSelect: (user: User | null) => void
}

export const UserSearchBox: React.FC<UserSearchBoxProps> = ({
  onUserSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { page: 1, perPage: 50, searchTerm: debouncedSearchTerm },
  })

  useEffect(() => {
    const debouncedUpdate = debounce(
      searchValue => setDebouncedSearchTerm(searchValue),
      500,
    )
    debouncedUpdate(searchTerm)
  }, [searchTerm])

  if (error) return <div>Error: {error.message}</div>

  return (
    <Autocomplete
      options={data?.getUsers.users || []}
      getOptionLabel={(option: User) => option.username}
      onInputChange={(event, value) => setSearchTerm(value)}
      onChange={(event, value) => onUserSelect(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => <TextField {...params} label="Search user" />}
      loading={loading}
    />
  )
}
