import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from 'mui-datatables'
import {
  Link as MuiLink,
  CircularProgress,
  Backdrop,
  Box,
  IconButton,
  Button,
  TextField,
  Toolbar,
  Typography,
  Collapse,
  Menu,
  MenuItem,
  Stack,
  Slide,
} from '@mui/material'
import {
  Add,
  ArrowDropDown,
  Edit as EditIcon,
  ExpandMore,
  Filter,
  FilterList,
  Refresh,
  Search,
  Discount as TagsIcon,
} from '@mui/icons-material'
import { debounce } from 'lodash'
import { useUser } from '../../../../contexts/UserContext'
import TagChip from '../../../shared/TagChip/TagChip'
import { useParams } from 'react-router-dom'
import { AccountEnterpriseItemsData } from '../../../../types/enterpriseItems/enterpriseItemsTypes'
import { GET_ACCOUNT_ENTERPRISE_ITEMS } from '../../../../graphql/enterpriseItems/queries'
import { Field } from '../../../../types/enterpriseItems/field/fieldTypes'
import AddField from '../../../enterprises/AddField/AddField'
import { CompanyServiceTypes } from '../../../../graphql/generated/graphql'

interface TableCategoryProps {
  categoryTitle: string
  data: any[]
  columns: MUIDataTableColumn[]
  onManualRefresh: () => void
  loading?: boolean
  onClickAdd: () => void
}

const TableCategory = ({
  categoryTitle,
  data,
  columns,
  onManualRefresh,
  loading = false,
  onClickAdd,
}: TableCategoryProps) => {
  const [expanded, setExpanded] = useState(true)

  const options: MUIDataTableOptions = {
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: 1,
    page: 1,
    rowsPerPageOptions: [10, 25, 50],
    count: 1,
    fixedHeader: true,
    search: false,
    viewColumns: false,
    draggableColumns: { enabled: true },
    filter: false,
    download: false,
    print: false,
    searchAlwaysOpen: false,
    selectableRows: 'multiple',
  }

  return (
    <Box marginBottom={5}>
      <Toolbar
        sx={{
          boxShadow: 0,
        }}
      >
        <IconButton onClick={() => setExpanded(!expanded)}>
          <ArrowDropDown
            sx={{
              transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: '0.2s',
            }}
          />
        </IconButton>
        <Typography variant="h6">{categoryTitle}</Typography>

        <Box
          display={'flex'}
          alignItems={'flex-end'}
          justifyContent={'flex-end'}
          flexGrow={1}
        >
          <IconButton disabled={!expanded || loading} onClick={onClickAdd}>
            <Add />
          </IconButton>

          {loading ? (
            <Box sx={{ paddingX: 1 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <IconButton disabled={!expanded} onClick={onManualRefresh}>
              <Refresh />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      <Collapse in={expanded}>
        <MUIDataTable
          title={''}
          data={data}
          columns={columns}
          options={options}
        />
      </Collapse>
    </Box>
  )
}

const LocationsTab = () => {
  // ========= Internal State ================ //
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const { user } = useUser()
  const { id, companyName } = useParams()

  const [fields, setFields] = useState<Field[]>([])
  // ========================================= //

  // ======= create/add menu ================= //
  const createNewLocationMenuAnchorRef = useRef<HTMLButtonElement>(null)
  const addExistingLocationMenuAnchorRef = useRef<HTMLButtonElement>(null)
  const [openNewLocationMenu, setOpenNewLocationMenu] = useState(false)
  const [openAddExistingLocationMenu, setOpenAddExistingLocationMenu] =
    useState(false)

  // ========================================= //

  // ========= Modal State =================== //
  const [openAddNewFieldModal, setOpenAddNewFieldModal] = useState(false)

  // ========================================= //

  // ========== Query ======================== //
  const { loading, data, error, refetch } =
    useQuery<AccountEnterpriseItemsData>(GET_ACCOUNT_ENTERPRISE_ITEMS, {
      variables: {
        input: {
          companyId: user?.selectedUserRole?.companyId ?? '',
          accountId: id ?? '',
        },
      },
    })

  // ========================================= //

  // ========= Search ======================== //
  useEffect(() => {
    const debouncedHandleSearch = debounce(() => {
      setSearchTerm(localSearchTerm)
      setPage(0)
    }, 200)

    debouncedHandleSearch()

    // Cleanup
    return () => {
      debouncedHandleSearch.cancel()
    }
  }, [localSearchTerm])
  // ========================================= //

  useEffect(() => {
    console.log('data', data)
    if (!data?.getAccountEnterpriseItems) return

    const fields = data?.getAccountEnterpriseItems.map(
      accountEnterpriseItem => accountEnterpriseItem.field,
    )

    setFields(fields ?? [])
  }, [data])

  return (
    <>
      {!openAddNewFieldModal ? (
        <Box>
          <Slide
            in={!openAddNewFieldModal}
            direction="left"
            mountOnEnter
            unmountOnExit
          >
            <Stack direction="column" spacing={1}>
              <Box visibility={openAddNewFieldModal ? 'hidden' : 'visible'}>
                <Toolbar
                  sx={{
                    boxShadow: 0,
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    placeholder="Farm Name, Field name, Shipping..."
                    fullWidth
                    sx={{ maxWidth: '400px' }}
                    InputProps={{ endAdornment: <Search color="action" /> }}
                  />

                  <Box>
                    <IconButton>
                      <FilterList />
                    </IconButton>
                  </Box>

                  <Box
                    display={'flex'}
                    alignItems={'flex-end'}
                    justifyContent={'flex-end'}
                    flexGrow={1}
                  >
                    <Button
                      variant="outlined"
                      ref={addExistingLocationMenuAnchorRef}
                      onClick={() => setOpenAddExistingLocationMenu(true)}
                    >
                      <Add /> Add Existing
                    </Button>

                    <Menu
                      anchorEl={addExistingLocationMenuAnchorRef.current}
                      open={openAddExistingLocationMenu}
                      onClose={() => setOpenAddExistingLocationMenu(false)}
                    >
                      <MenuItem
                        onClick={() => setOpenAddExistingLocationMenu(false)}
                      >
                        Field
                      </MenuItem>
                      <MenuItem
                        onClick={() => setOpenAddExistingLocationMenu(false)}
                      >
                        Shipping Location
                      </MenuItem>
                      <MenuItem
                        onClick={() => setOpenAddExistingLocationMenu(false)}
                      >
                        Tank
                      </MenuItem>
                    </Menu>

                    <Button
                      variant="contained"
                      sx={{ marginLeft: 1 }}
                      ref={createNewLocationMenuAnchorRef}
                      onClick={() => setOpenNewLocationMenu(true)}
                    >
                      New <ExpandMore />
                    </Button>

                    <Menu
                      anchorEl={createNewLocationMenuAnchorRef.current}
                      open={openNewLocationMenu}
                      onClose={() => setOpenNewLocationMenu(false)}
                    >
                      <MenuItem
                        onClick={() => {
                          setOpenNewLocationMenu(false)
                          setOpenAddNewFieldModal(true)
                        }}
                      >
                        Field
                      </MenuItem>
                      <MenuItem onClick={() => setOpenNewLocationMenu(false)}>
                        Shipping Location
                      </MenuItem>
                      <MenuItem onClick={() => setOpenNewLocationMenu(false)}>
                        Tank
                      </MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
                <Box position="relative">
                  <TableCategory
                    loading={loading}
                    categoryTitle={'Fields'}
                    data={fields ?? []}
                    columns={[
                      {
                        name: 'fieldName',
                        label: 'Field',
                        options: {
                          customBodyRender: (
                            value: any,
                            tableMeta: { rowIndex: any },
                          ) => {
                            const rowIndex = tableMeta.rowIndex

                            return (
                              <Typography>
                                {fields[rowIndex].fieldName}
                              </Typography>
                            )
                          },
                        },
                      },
                      {
                        name: 'address',
                        label: 'Address',
                      },
                      {
                        name: 'acres',
                        label: 'Acres',
                        options: {
                          customBodyRender: (
                            value: any,
                            tableMeta: { rowIndex: any },
                          ) => {
                            console.log('######## fields', fields)
                            const rowIndex = tableMeta.rowIndex

                            const activeFieldVersion = fields[
                              rowIndex
                            ]?.fieldVersions?.find(
                              fieldVersion => fieldVersion.active,
                            )

                            return <>{activeFieldVersion?.estimatedArea}</>

                            return <Typography></Typography>
                          },
                        },
                      },
                      {
                        name: 'crop',
                        label: 'Crop',
                        options: {
                          customBodyRender: (
                            value: any,
                            tableMeta: { rowIndex: any },
                          ) => {
                            const rowIndex = tableMeta.rowIndex

                            // Get list of tags from field.fieldTags where tagCategoryName === 'Crop'
                            const cropTags =
                              fields[rowIndex].fieldTags?.filter(
                                fieldTag =>
                                  fieldTag?.tag?.tagCategory?.name === 'Crop',
                              ) ?? []

                            const activeFieldVersion = fields[
                              rowIndex
                            ]?.fieldVersions?.find(
                              fieldVersion => fieldVersion.active,
                            )

                            console.log(
                              'activeFieldVersion',
                              activeFieldVersion,
                            )
                            return (
                              <div>
                                <Stack direction="row" spacing={1}>
                                  {cropTags.map(cropTag => (
                                    <TagChip
                                      colorIndex={cropTag?.tag?.colorIndex ?? 0}
                                      name={cropTag?.tag?.name ?? ''}
                                    />
                                  ))}
                                </Stack>
                              </div>
                            )
                          },
                        },
                      },
                      {
                        name: 'enterprise',
                        label: 'Enterprise',
                        options: {
                          customBodyRender: (
                            value: any,
                            tableMeta: { rowIndex: any },
                          ) => {
                            const rowIndex = tableMeta.rowIndex

                            return (
                              <Typography>
                                {fields[rowIndex].company?.companyName}
                              </Typography>
                            )
                          },
                        },
                      },
                      { name: 'notes', label: 'Notes' },
                    ]}
                    onManualRefresh={() => {
                      refetch()
                    }}
                    onClickAdd={() => setOpenAddNewFieldModal(true)}
                  />

                  <TableCategory
                    categoryTitle={'Shipping Locations'}
                    data={[]}
                    columns={[{ name: 'debug' }]}
                    onManualRefresh={() => {}}
                    onClickAdd={() => {}}
                  />

                  <TableCategory
                    categoryTitle={'Tanks'}
                    data={[]}
                    columns={[{ name: 'debug' }]}
                    onManualRefresh={() => {}}
                    onClickAdd={() => {}}
                  />
                </Box>
              </Box>
            </Stack>
          </Slide>
          {/* Editors */}
        </Box>
      ) : (
        <Box>
          <Slide
            in={openAddNewFieldModal}
            direction="left"
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <AddField
                accountCompany={{
                  companyId: id ?? '',
                  companyName: companyName ?? '',
                  companyType: CompanyServiceTypes.Account,
                }}
                onCanceled={() => setOpenAddNewFieldModal(false)}
              />
            </Box>
          </Slide>
        </Box>
      )}
    </>
  )
}

export default LocationsTab
