import React, { useState, useEffect, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
import Autocomplete from '@mui/material/Autocomplete'
import {
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  Tooltip,
  CircularProgress,
  Box,
  Pagination,
  Divider,
  List,
} from '@mui/material'
import { debounce } from 'lodash'
import { ManufactureInputState } from '../../../types/productTypes'
import { useUser } from '../../../contexts/UserContext'
import { X } from '@phosphor-icons/react'
import { callSnackBar } from '../../../utilities/callSnackBar'
import { backgroundColor } from '../../../contexts/ThemeContext'
import {
  ManufacturerProduct,
  ManufacturerProductsDocument,
} from '../../../graphql/generated/graphql'

const ManufacturerProductAutocomplete: React.FC<{
  index: number
  minSymbols?: number
  inputData: ManufactureInputState[]
  setInputData: (el: any) => void
  onChange: (newValue: number, index: number) => void
  quantityEditProducts?: number | null
  disabledOptions?: any[]
  isLabel?: boolean
  label?: string
  setManufacturerProducts?: (el: any) => void
}> = ({
  index,
  onChange,
  inputData = [],
  setInputData,
  quantityEditProducts = 0,
  disabledOptions = [],
  minSymbols = 4,
  isLabel = true,
  label = 'Product',
  setManufacturerProducts,
}) => {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { user } = useUser()
  const autoComplete = useRef<any>(null)
  const autoCompletePaper = useRef<any>(null)
  let totalIndex = quantityEditProducts ? index - quantityEditProducts : index

  const [getProducts, { loading, data, refetch }] = useLazyQuery(
    ManufacturerProductsDocument,
    {
      variables: {
        input: {
          page,
          pageSize: rowsPerPage,
          searchTerm: searchTerm,
          sortBy: null,
          sortDesc: null,
        },
      },
      onCompleted: data => {
        let resp = inputData.map((el: ManufactureInputState, i: number) => {
          if (i !== totalIndex) return el
          return {
            ...el,
            options: data.manufacturerProducts?.items as ManufacturerProduct[],
            totalCount: data.manufacturerProducts?.totalCount ?? 0,
          }
        })

        setInputData(resp)
      },
      onError: error => {
        console.log(error)
        callSnackBar('Product getting error', 'error')
      },
    },
  )

  const styleWrapperLists = {
    '::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: 'rgba(196, 196, 196, 0.075)',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: backgroundColor,
      borderRadius: '4px',
      boxShadow: 'inset 1px 1px 10px #faf3f3',
    },
  }

  useEffect(() => {
    if (inputData[totalIndex]?.inputValue.length > minSymbols - 1) {
      const debouncedHandleSearch = debounce(() => {
        setSearchTerm(inputData[totalIndex].inputValue)
      }, 800)

      if (!inputData[totalIndex]?.isSelectOption) {
        //if selected - don't get data
        debouncedHandleSearch()
        getProducts()
      }

      // Cleanup
      return () => {
        debouncedHandleSearch.cancel()
      }
    }
  }, [inputData[totalIndex]?.inputValue, page])

  useEffect(() => {
    const onClick = (e: any) => {
      let isPagination = e?.target?.className
        ?.split(' ')
        .includes('MuiPaginationItem-root')

      let outClickComponent =
        autoCompletePaper.current?.contains(e?.target) ||
        autoComplete.current?.contains(e?.target) ||
        isPagination

      if (!outClickComponent) {
        setOpen(false)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!inputData[totalIndex]?.value) {
      onChange(NaN, index)
    }
  }, [inputData[totalIndex]?.value])

  return (
    <Autocomplete
      ref={autoComplete}
      value={inputData[totalIndex]?.value || null}
      open={open}
      inputValue={inputData[totalIndex]?.inputValue || ''}
      noOptionsText={
        inputData[totalIndex]?.inputValue.length > minSymbols - 1
          ? 'No options'
          : `Min ${minSymbols} symbols`
      }
      onOpen={() => {
        setOpen(true)
      }}
      onClose={(e, r) => {
        if (e.type === 'blur') {
          return
        }
        setOpen(false)
      }}
      clearOnBlur={false}
      isOptionEqualToValue={(option: any, value: any) =>
        option.productName === value.productName
      }
      onChange={(event, newValue, r) => {
        let onChangeOption = inputData.map(
          (el: ManufactureInputState, i: number) => {
            if (i !== totalIndex) return el
            return {
              ...el,
              options:
                newValue !== inputData[totalIndex]?.value &&
                data?.manufacturerProducts?.items,
              value: newValue,
              inputValue:
                r === 'clear' ? '' : inputData[totalIndex]?.inputValue,
              isSelectOption:
                r === 'selectOption'
                  ? true
                  : inputData[totalIndex]?.isSelectOption,
            }
          },
        )

        setInputData(onChangeOption)
        onChange(newValue?.id ? newValue?.id : NaN, index)
        setManufacturerProducts && setManufacturerProducts(newValue)
      }}
      onInputChange={(e, v, r) => {
        let onChangeInput = inputData.map(
          (el: ManufactureInputState, i: number) => {
            if (i !== totalIndex) return el
            return {
              ...el,
              inputValue: r === 'clear' ? '' : v,
              isSelectOption:
                inputData[totalIndex]?.isSelectOption && r === 'input'
                  ? false
                  : inputData[totalIndex]?.isSelectOption,
            }
          },
        )
        setInputData(onChangeInput)
      }}
      getOptionLabel={option => option.productName}
      getOptionDisabled={option => {
        return loading || disabledOptions.includes(option.id)
      }}
      options={
        inputData[totalIndex]?.inputValue.length > minSymbols - 1
          ? inputData[totalIndex].options
          : []
      }
      loading={loading}
      filterOptions={options => options}
      componentsProps={{
        popper: {
          sx: {
            zIndex: 1302,
          },
        },
        paper: {
          sx: {
            border: '1px solid lightgray',
            width: '500px',
          },
        },
      }}
      sx={{
        width: '300px',
      }}
      ListboxComponent={(props: any) => {
        return (
          <Box ref={autoCompletePaper}>
            <List
              {...props}
              onClick={() => setOpen(false)}
              sx={styleWrapperLists}
            />
            <Divider />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                p: 2,
              }}
            >
              <Pagination
                count={Math.ceil(
                  inputData[totalIndex]?.totalCount / rowsPerPage,
                )}
                defaultPage={page + 1}
                boundaryCount={2}
                onChange={(e, p) => {
                  setPage(p - 1)
                }}
                size={'small'}
                disabled={loading}
              />
            </Stack>
          </Box>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={isLabel ? label : ''}
          value={inputData[totalIndex]?.inputValue || ''}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Card sx={{ width: '100%', position: 'relative' }}>
            <CardContent>
              <Stack direction="column" spacing={0}>
                <Tooltip
                  title={`${option.productName} by ${option.manufacturerName}`}
                >
                  <Typography
                    sx={{
                      width: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {`${option.productName} by ${option.manufacturerName}`}
                  </Typography>
                </Tooltip>
                <Typography>{option.commonName}</Typography>
                {!option.isUs && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                    sx={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    <X size={12} color="#b41a1a" weight="bold" />
                    <Typography sx={{ fontSize: '12px' }}>
                      Not available in US
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </li>
      )}
    />
  )
}

export default ManufacturerProductAutocomplete
