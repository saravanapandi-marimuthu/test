import { Button, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { debounce } from 'lodash'
import { useUser } from '../../../contexts/UserContext'
import { callSnackBar } from '../../../utilities/callSnackBar'
import { AutoCompleteWithPagination } from '../../shared/Inputs/AutocompleteWithPagination'
import {
  CompanyRelationshipDirection,
  CompanyRelationshipType,
  LinkCompaniesDocument,
  LinkCompaniesInput,
  RelatedCompaniesDocument,
} from '../../../graphql/generated/graphql'

interface SearchInput {
  inputValue: string
  value: string | null
  options: any[]
  page: number
  rowsPerPage: number
  searchTerm: string
  minSymbols: number
  totalCount: number
  isSelectOption: boolean
}

export interface LinkCompaniesProps {
  autoCompleteLabel: string
  companyId: string
  retailerRelationshipType: CompanyRelationshipType
  relationshipType: CompanyRelationshipType
  relationshipDirection: CompanyRelationshipDirection
  handleOnCompleted: () => void
}

export const LinkCompanies: React.FC<LinkCompaniesProps> = ({
  autoCompleteLabel,
  companyId,
  retailerRelationshipType,
  relationshipType,
  relationshipDirection,
  handleOnCompleted,
}) => {
  const [input, setInput] = useState<SearchInput>({
    inputValue: '',
    value: null,
    options: [],
    page: 0,
    rowsPerPage: 10,
    searchTerm: '',
    minSymbols: 4,
    totalCount: 0,
    isSelectOption: false,
  })
  const [relatedCompanyId, setRelatedCompanyId] = useState<string | null>(null)
  const { user } = useUser()

  const [getRelatedCompanies, { loading, data, refetch }] = useLazyQuery(
    RelatedCompaniesDocument,
    {
      variables: {
        input: {
          companyId: user?.selectedUserRole?.companyId,
          companyRelationshipType: retailerRelationshipType,
          page: input.page,
          pageSize: input.rowsPerPage,
          searchTerm: input.searchTerm,
          sortBy: '',
          //filters: [],
          //tagFilters: [],
        },
      },
      onCompleted: data => {
        const searchOptions = data.relatedCompanies?.items.map((ent, ind) => {
          return {
            companyName: ent.company.name,
            customerCompanyId: ent.company.id,
          }
        })
        setInput({
          ...input,
          options: searchOptions as any[],
          totalCount: data.relatedCompanies?.totalCount ?? 0,
        })
      },
      onError: error => {
        console.log(error)
        callSnackBar('Enterprise getting error', 'error')
      },
    },
  )

  const [linkCompanies, { loading: loadLink }] = useMutation(
    LinkCompaniesDocument,
    {
      onCompleted: data => {
        callSnackBar('Link Account to Enterprise', 'success')
        handleOnCompleted()
      },
      onError: error => {
        callSnackBar(error.message, 'error')
      },
    },
  )

  const handleChangePage = (page: number) => {
    setInput({ ...input, page: page })
  }

  const handleChangeInputData = (
    value: string,
    index: number,
    reason: string,
  ) => {
    // debugger
    setInput({
      ...input,
      inputValue: value,
    })
  }
  const onChange = (value: any, index: number, reason: string) => {
    setInput({
      ...input,
      value: reason === 'clear' ? null : value,
      inputValue: reason === 'clear' ? '' : input.inputValue,
    })
    setRelatedCompanyId(value.customerCompanyId)
  }

  const optionAutoComplete = {
    index: 0,
    loading: loading,
    name: 'companyName',
    label: autoCompleteLabel,
    inputValue: input.inputValue,
    value: input.value,
    handleChangeInputData: handleChangeInputData,
    handleChangePage: handleChangePage,
    onChange: onChange,
    options: input.options,
    totalCount: input.totalCount,
    rowsPerPage: input.rowsPerPage,
    page: input.page,
  }

  const handleLinkAccountToEnterprise = async () => {
    try {
      const input: LinkCompaniesInput = {
        primaryCompanyId: companyId,
        relatedCompanyId: relatedCompanyId,
        relationshipType: relationshipType,
        tagLinks: [],
      }

      await linkCompanies({
        variables: {
          input: input,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (input.inputValue.length > input.minSymbols - 1) {
      const debouncedHandleSearch = debounce(() => {
        setInput({ ...input, searchTerm: input.inputValue })
      }, 800)

      if (!input?.value) {
        //if selected - don't get data
        debouncedHandleSearch()
        getRelatedCompanies()
      }

      // Cleanup
      return () => {
        debouncedHandleSearch.cancel()
      }
    }
  }, [input.inputValue])

  return (
    <Stack spacing={2}>
      <AutoCompleteWithPagination optionAutoComplete={optionAutoComplete} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        {loadLink && <CircularProgress size={18} />}
        <Button
          variant="contained"
          onClick={handleLinkAccountToEnterprise}
          disabled={loadLink}
        >
          Link
        </Button>
      </Stack>
    </Stack>
  )
}
