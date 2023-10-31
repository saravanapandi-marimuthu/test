import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  CircularProgress,
  Backdrop,
  Box,
  IconButton,
  Dialog,
  Button,
  Grid,
  Alert,
  TextField,
  Typography,
} from '@mui/material'
import { Discount as TagsIcon } from '@mui/icons-material'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import {
  DownloadSimple as DownloadSimpleIcon,
  BookmarkSimple as BookmarkSimpleIcon,
} from '@phosphor-icons/react'
import { debounce } from 'lodash'
import { DELETE_WAREHOUSES } from '../../../graphql/mutations'
import {
  DeleteWarehouseData,
  DeleteWarehouseError,
} from '../../../types/warehouseLocationsTypes'
import { useUser } from '../../../contexts/UserContext'
import ReactPhoneInput from 'react-phone-input-material-ui'
import { parsePhoneNumber } from 'libphonenumber-js'
import { Column } from '../../../types/types'
import { useNavigate } from 'react-router-dom'
import {
  AddressType,
  WarehousesDocument,
  Warehouse,
  PhoneNumberType,
  CreateWarehouseDocument,
  WarehousesQuery,
} from '../../../graphql/generated/graphql'
import { callSnackBar } from '../../../utilities/callSnackBar'
import { CategorizedAddress } from '../../../types/sharedTypes'
import AddressForm from '../../shared/address/AddressForm/AddressForm'
import { StyledTextField } from '../../shared/mui/StyledTextField/StyledTextField'

const CompanyWarehouseLocations = () => {
  const navigate = useNavigate()

  // ========= Internal State ================ //
  const [page, setPage] = useState(0)
  const [pageSize, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [sortBy, setSort] = useState('')
  const [filters, setFilters] = useState([])
  const [displayData, setDisplayData] = useState<Warehouse[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isManualRefetching, setIsManualRefetching] = useState(false)
  const { user } = useUser()
  // ========================================= //

  // ========= Query Locations ==================== //
  const [displayTableError, setDisplayTableError] = useState<
    string | undefined
  >(undefined)
  const { loading, error, data, refetch } = useQuery<WarehousesQuery>(
    WarehousesDocument,
    {
      variables: {
        input: {
          page,
          pageSize,
          searchTerm,
          sortBy,
          // filters,
          retailerCompanyId: user?.selectedUserRole?.companyId,
        },
      },
    },
  )

  useEffect(() => {
    console.log('FILTERS:', filters)
    refetch()
  }, [page, pageSize, searchTerm, sortBy, filters, refetch])

  // set screen metadata
  useEffect(() => {
    if (!loading) {
      if (error) {
        setDisplayTableError('An unexpected error occurred with the request')
      }
      // else if (data) {
      // if (data.error) {
      //   switch (data.error) {
      //     case GetWarehousesForCompanyError.INVALID_COMPANY_ID:
      //       setDisplayTableError('Invalid company ID')
      //       break
      //     default:
      //       setDisplayTableError('An unexpected error has occurred')
      //       break
      //   }
      // }
      //  else {
      //   setDisplayData(data.getWarehousesForCompany.warehouses ?? [])
      //   setTotalCount(data.getWarehousesForCompany.totalCount ?? 0)
      // }
      setDisplayData(data?.warehouses?.items as Warehouse[])
      setTotalCount(data?.warehouses?.totalCount ?? 0)
    }
  }, [loading, data])

  const handleRefresh = async () => {
    setIsManualRefetching(true)
    await refetch()
    setIsManualRefetching(false)
  }
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

  // ======== Location Editor ================ //
  const [isEditing, setIsEditing] = useState(false)
  const [editorWarehouseName, setEditorWarehouseName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState<CategorizedAddress>({
    addressType: AddressType.Billing,
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA',
    },
  })

  const [editorNotes, setEditorNotes] = useState('')
  const [displayEditorError, setDisplayEditorError] = useState<
    string | undefined
  >(undefined)

  const [createWarehouse] = useMutation(CreateWarehouseDocument)

  const canSaveLocation = useMemo(() => {
    return editorWarehouseName !== '' && phoneNumber !== ''
  }, [editorWarehouseName, phoneNumber])

  const handleBeginCreating = () => {
    setEditorWarehouseName('')
    setEditorNotes('')
    setDisplayEditorError(undefined)
    setIsEditing(true)
  }

  const handleOnChange = (value: any) => {
    setPhoneNumber(value)
  }

  const handleAddressChange = (categorizedAddress: CategorizedAddress) => {
    setAddress(categorizedAddress)
  }

  const handleConfirmLocationCreation = async () => {
    try {
      await createWarehouse({
        variables: {
          input: {
            retailerCompanyId: user?.selectedUserRole?.companyId,
            name: editorWarehouseName,
            notes: editorNotes,
            addresses: [
              {
                addressType: address.addressType,
                address: address.address,
              },
            ],
            phoneNumbers: [
              {
                phoneNumberType: PhoneNumberType.Work,
                phoneNumber: {
                  mainNumber: String(phoneNumber),
                  extension: '132',
                },
              },
            ],
          },
        },
      })
      setIsEditing(false)
      setPhoneNumber('')
      setEditorWarehouseName('')
      setAddress({
        addressType: AddressType.Billing,
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'USA',
        },
      })
      await refetch()
      callSnackBar('Success', 'success')
    } catch (error) {
      callSnackBar('error', 'error')
    }
  }

  // ========================================= //

  // ========= Delete Location =============== //
  const [confirmDelete, setConfirmDelete] = useState(false) //used to ensure user wants to delete location
  const [deletedIDs, setDeletedIDs] = useState<number[]>([])
  const [displayDeleteError, setDisplayDeleteError] = useState<
    string | undefined
  >(undefined)

  const [
    deleteLocations,
    {
      called: calledDelete,
      loading: deleting,
      error: deleteError,
      data: deleteData,
    },
  ] = useMutation<DeleteWarehouseData>(DELETE_WAREHOUSES)
  const handleBeginDelete = (ids: number[]) => {
    setDisplayDeleteError(undefined)
    setDeletedIDs(ids)
    setConfirmDelete(true)
  }
  const handleConfirmDelete = () => {
    deleteLocations({
      variables: {
        input: {
          warehouseIds: deletedIDs,
          providerCompanyId: user?.selectedUserRole?.companyId,
        },
      },
    })
  }

  useEffect(() => {
    if (calledDelete && !deleting) {
      if (deleteError) {
        console.error(deleteError)
        setDisplayDeleteError(
          'An unexpected error has occurred with the request',
        )
      } else if (deleteData) {
        if (deleteData.deleteWarehouses.error) {
          switch (deleteData.deleteWarehouses.error) {
            case DeleteWarehouseError.INVALID_COMPANY_ID:
              setDisplayDeleteError('Invalid Company ID specified in request')
              break
            case DeleteWarehouseError.INVALID_WAREHOUSE_ID:
              setDisplayDeleteError('Invalid Warehouse ID specified in request')
              break
            default:
              setDisplayDeleteError('An unexpected error has occurred')
              break
          }
        } else {
          setConfirmDelete(false)
          setDeletedIDs([])
          handleRefresh()
        }
      }
    }
  }, [deleting])

  // ========================================= //

  if (error) return <p>Error {error.message}</p>

  // ========= Data Formatting =============== //
  const columns: Column[] = [
    {
      name: 'warehouseName',
      label: 'Warehouse Name',
      options: {
        sortThirdClickReset: true,
        filterType: 'multiselect',
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          return (
            <Box>
              <Button
                variant="text"
                onClick={() => {
                  navigate(`/warehouses/${displayData[rowIndex].id}`)
                }}
              >
                {displayData[rowIndex].name}
              </Button>
            </Box>
          )
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        sort: true,
        filter: true,

        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex
          const addressInfo =
            displayData[rowIndex].warehouseAddresses?.find(ad =>
              [AddressType.Billing, AddressType.Physical].includes(
                ad.addressType,
              ),
            )?.address ?? undefined

          return (
            <Box>{`${addressInfo?.addressLine1}, ${addressInfo?.city}, ${addressInfo?.state} ${addressInfo?.postalCode}`}</Box>
          )
        },
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone',
      options: {
        sort: false,
        filter: false,

        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          return (
            <Box>
              {parsePhoneNumber(
                displayData[rowIndex].warehousePhoneNumbers?.[0].phoneNumber
                  .mainNumber ?? '',
                'US',
              ).formatNational()}
            </Box>
          )
        },
      },
    },
    {
      name: 'notes',
      label: 'Notes',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'tags',
      label: 'TBD',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          return (
            <Box>
              <TagsIcon />
            </Box>
          )
        },
        filter: false,
        sort: false,
      },
    },
  ]

  const options: MUIDataTableOptions = {
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: pageSize,
    page: page,
    rowsPerPageOptions: [10, 25, 50],
    count: totalCount,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    filter: false,
    download: false,
    print: false,
    searchAlwaysOpen: false,
    selectableRows: 'multiple',
    onRowsDelete: rowsDeleted => {
      const deletedIDs = rowsDeleted.data
        .map(row => displayData[row.dataIndex].id ?? -1)
        .filter(id => id !== -1)

      handleBeginDelete(deletedIDs)

      return false
    },
  }
  // ========================================= //

  return (
    <div>
      <Dialog
        sx={{ minWidth: '50%' }}
        fullWidth
        open={isEditing}
        onClose={() => {
          setIsEditing(false)
        }}
      >
        {/* {isEditing && (
          <Box
            sx={{
              zIndex: 100,
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        )} */}

        {displayEditorError && (
          <Alert
            onClose={() => {
              setDisplayEditorError(undefined)
            }}
            severity="error"
          >
            {displayEditorError}
          </Alert>
        )}

        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Typography
            variant="h4"
            noWrap
            component="div"
            color="text.primary"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
            }}
          >
            Add New Warehouse
          </Typography>

          <Grid container direction="row" sx={{ marginTop: 3 }}>
            <Grid item>
              <Grid container direction={'column'}>
                <Grid item sx={{ marginBottom: 1 }}>
                  <TextField
                    label="Warehouse Name"
                    value={editorWarehouseName}
                    required
                    onChange={e => {
                      setEditorWarehouseName(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item>
                  <ReactPhoneInput
                    value={phoneNumber}
                    onChange={handleOnChange}
                    component={StyledTextField}
                    label="Phone"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button>Select Tags</Button>
            </Grid>
          </Grid>

          <AddressForm
            categorizedAddress={address}
            defaultAddressType={AddressType.Billing}
            onAddressChange={handleAddressChange}
          />

          <Box sx={{ marginTop: 1 }}>
            <TextField
              label="Notes"
              value={editorNotes}
              fullWidth
              multiline={true}
              rows={4}
              onChange={e => {
                setEditorNotes(e.target.value)
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{ marginBottom: 2, paddingRight: 3 }}
          alignItems={'center'}
          justifyContent={'flex-end'}
          display={'flex'}
          flexDirection={'row'}
        >
          <Button
            variant="contained"
            disabled={!canSaveLocation}
            onClick={() => handleConfirmLocationCreation()}
          >
            Save
          </Button>
        </Box>
      </Dialog>

      <Dialog
        open={confirmDelete}
        onClose={() => {
          if (!deleting) {
            setDeletedIDs([])
            setConfirmDelete(false)
          }
        }}
      >
        {deleting && (
          <Box
            sx={{
              zIndex: 100,
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        )}

        {displayDeleteError && (
          <Alert
            onClose={() => {
              setDisplayDeleteError(undefined)
            }}
            severity="error"
          >
            {displayDeleteError}
          </Alert>
        )}
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 3,
          }}
          textAlign={'center'}
        >
          <Typography variant="h6">
            Are you sure you want to delete these warehouses?
          </Typography>
          <Typography variant="subtitle1">
            This action cannot be undone.
          </Typography>

          <Grid
            container
            justifyContent={'space-around'}
            direction="row"
            sx={{ marginTop: 3 }}
          >
            <Grid item sx={{ flex: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setDeletedIDs([])
                  setConfirmDelete(false)
                }}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item sx={{ flex: 1 }}>
              <Button
                variant="contained"
                disabled={deleting}
                onClick={() => {
                  handleConfirmDelete()
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

      {displayTableError && (
        <Alert
          onClose={() => {
            setDisplayTableError(undefined)
          }}
          severity="error"
        >
          {displayTableError}
        </Alert>
      )}
      <SectionHeadingToolBar
        title={'Warehouses'}
        loading={loading}
        hasAddButton={true}
        hasRefreshButton={true}
        onRefreshButtonClicked={handleRefresh}
        onAddButtonClicked={handleBeginCreating}
        middleComponent={
          <>
            <Box paddingX={2}>
              <IconButton>
                <BookmarkSimpleIcon size={18} />
              </IconButton>
              <IconButton>
                <DownloadSimpleIcon size={18} />
              </IconButton>
            </Box>
          </>
        }
      />
      <Box position="relative">
        <MUIDataTable
          title={''}
          data={displayData}
          columns={columns}
          options={options}
        />
        <Backdrop
          open={loading || isManualRefetching}
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </div>
  )
}

export default CompanyWarehouseLocations
