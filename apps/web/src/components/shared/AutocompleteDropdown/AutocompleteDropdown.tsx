import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { debounce } from 'lodash'

interface Autocomplete {
  id: string
  name: string
}

export interface AutocompleteDropdownProps {
  title?: string
  isRequired?: boolean
  onSelect: (autocomplete: Autocomplete[]) => void
  data: Autocomplete[]
  loading: boolean
  setDebouncedSearchTerm: (searchTerm: string) => void
  isMultiple?: boolean
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  title = 'Search',
  isRequired = false,
  onSelect,
  data,
  loading,
  setDebouncedSearchTerm,
  isMultiple = false,
}) => {
  const [selected, setSelected] = useState<Autocomplete | null>(null)
  const [autoCompleteError, setAutocompleteError] = useState<string | null>(
    null,
  )

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const debouncedUpdate = debounce(
      searchValue => setDebouncedSearchTerm(searchValue),
      500,
    )
    if (searchTerm.length >= 4) {
      debouncedUpdate(searchTerm)
    } else {
      setDebouncedSearchTerm('') // Clear the search results if searchTerm has less than 4 characters
    }
  }, [searchTerm])

  const handleChange = (event: any, value: any) => {
    onSelect(value)
  }
  return (
    <Autocomplete
      multiple={isMultiple}
      options={data || []}
      getOptionLabel={(option: Autocomplete) => option.name}
      onInputChange={(event, value) => setSearchTerm(value)}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          label={title}
          error={!!autoCompleteError}
          helperText={autoCompleteError}
          size="small"
          required={isRequired}
          onChange={e => {
            if (isRequired && !e.target.value) {
              setAutocompleteError('Please select a value')
            } else {
              setAutocompleteError(null)
            }
          }}
        />
      )}
      loading={loading}
    />
  )
}
