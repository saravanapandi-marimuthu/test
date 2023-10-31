import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { debounce } from 'lodash'
import {
  GET_COMPANIES,
  GET_SUBSIDIARY_COMPANIES,
} from '../../../graphql/companies/queries'

interface Company {
  id: string
  companyName: string
}

export interface CompanySearchBoxProps {
  title?: string
  isRequired?: boolean
  onCompanySelect: (company: Company | null) => void
  selectedCompanyVal?: Company
  parentCompanyId?: string
}

export const CompanySearchBox: React.FC<CompanySearchBoxProps> = ({
  title = 'Search Company',
  isRequired = false,
  onCompanySelect,
  selectedCompanyVal,
  parentCompanyId = '',
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    id: '',
    companyName: '',
  })
  const [companyError, setCompanyError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const { data, loading, error } = useQuery(
    parentCompanyId ? GET_SUBSIDIARY_COMPANIES : GET_COMPANIES,
    {
      variables: {
        page: 0,
        perPage: 50,
        searchTerm: debouncedSearchTerm,
        parentCompanyId,
      },
      skip: debouncedSearchTerm.length < 4, // Skip the query if searchTerm has less than 4 characters
    },
  )

  useEffect(() => {
    setSelectedCompany(selectedCompanyVal || { id: '', companyName: '' })
  }, [selectedCompanyVal])

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

  // if (error) return <div>Error: {error.message}</div>

  return (
    <Autocomplete
      value={selectedCompany}
      options={
        (parentCompanyId
          ? data?.getSubsidiaryCompanies.companies
          : data?.getCompanies.companies) || []
      }
      getOptionLabel={(option: Company) => option.companyName}
      onInputChange={(event, value) => setSearchTerm(value)}
      onChange={(event, value) => {
        setSelectedCompany(value || { id: '', companyName: '' })
        onCompanySelect(value)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          label={title}
          error={!!companyError}
          helperText={companyError}
          size="small"
          required={isRequired}
          onChange={e => {
            if (isRequired && !e.target.value) {
              setCompanyError('Please select a company')
            } else {
              setCompanyError(null)
            }
          }}
        />
      )}
      loading={loading}
    />
  )
}
