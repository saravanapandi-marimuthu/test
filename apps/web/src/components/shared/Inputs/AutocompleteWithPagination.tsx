import React, { useEffect, useRef } from 'react'
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
  ListItem,
  ListItemButton,
} from '@mui/material'
import { backgroundColor } from '../../../contexts/ThemeContext'

interface AutoCompleteWithPagination {
  index?: number
  totalCount?: number
  minSymbols?: number
  rowsPerPage?: number
  page?: number
  loading: boolean
  label?: string
  width?: string
  paperWidth?: string
  name: string
  value: any
  inputValue: string
  handleChangeInputData: (value: string, index: number, reason: string) => void
  handleChangePage: (page: number) => void
  onChange: (newValue: number, index: number, reason: string) => void
  disabledOptions?: any[]
  options: any[]
}

export const AutoCompleteWithPagination: React.FC<{
  optionAutoComplete: AutoCompleteWithPagination
}> = ({ optionAutoComplete }) => {
  const {
    index = 0,
    label = 'Product',
    onChange,
    width = '300px',
    paperWidth = '300px',
    inputValue = '',
    name,
    options = [],
    value,
    handleChangeInputData,
    handleChangePage,
    disabledOptions = [],
    minSymbols = 4,
    rowsPerPage = 10,
    loading,
    totalCount = 0,
    page = 0,
  } = optionAutoComplete
  const [open, setOpen] = React.useState(false)
  const autoComplete = useRef<any>(null)
  const autoCompletePaper = useRef<any>(null)

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
    const onClick = (e: any) => {
      let isPagination = e?.target?.className
        .split(' ')
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

  return (
    <Autocomplete
      ref={autoComplete}
      value={value || null}
      open={open}
      inputValue={inputValue}
      noOptionsText={
        inputValue.length > minSymbols - 1
          ? 'No options'
          : `Min ${minSymbols} characters`
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
        option?.[name] === value?.[name]
      }
      onChange={(event, newValue, r) => {
        onChange(newValue, index, r)
      }}
      onInputChange={(e, v, r) => {
        handleChangeInputData(v, index, r)
      }}
      getOptionLabel={option => option?.[name]}
      getOptionDisabled={option => {
        return loading || disabledOptions.includes(option.id)
      }}
      options={inputValue.length > minSymbols - 1 ? options : []}
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
            width: { paperWidth },
          },
        },
      }}
      sx={{
        width: { width },
      }}
      ListboxComponent={(props: any) => {
        return (
          <Box ref={autoCompletePaper}>
            <List
              {...props}
              onClick={() => setOpen(false)}
              //sx={styleWrapperLists}
            />
            <Divider />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                p: 1,
              }}
            >
              <Pagination
                count={Math.ceil(totalCount / rowsPerPage)}
                defaultPage={page + 1}
                boundaryCount={2}
                onChange={(e, p) => {
                  handleChangePage(p - 1)
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
          label={label}
          value={inputValue}
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
          <Tooltip title={option?.[name]}>
            <ListItemButton sx={{ padding: 1 }}>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {option?.[name]}
              </Typography>
            </ListItemButton>
          </Tooltip>
        </li>
      )}
    />
  )
}
