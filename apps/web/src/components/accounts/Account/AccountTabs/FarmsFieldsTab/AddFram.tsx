import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import AddressForm from '../../../../shared/address/AddressForm/AddressForm'
import { CREATE_FARM } from '../../../../../graphql/mutations'
import { callSnackBar } from '../../../../../utilities/callSnackBar'
import { Address } from '../../../../../types/sharedTypes'

interface AddCustomerProps {
  customerId: string | undefined
  providerCompanyId: string | undefined
  onSave: () => void
  setIsOpenModal: (el: boolean) => void
}

export const AddFram: React.FC<AddCustomerProps> = ({
  customerId,
  providerCompanyId,
  setIsOpenModal,
  onSave,
}) => {
  const [farmName, setFarmName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [latitude, setLatitude] = useState<number>(0.0)
  const [longitude, setLongitude] = useState<number>(0.0)
  const [address, setAddress] = useState<Address>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const [createFarm] = useMutation(CREATE_FARM)

  const handleAddressChange = (e: any, name: string) => {
    setAddress((prevAddress: typeof address) => ({
      ...prevAddress,
      [name]: e.target.value,
    }))
  }

  const handleCreateFarm = async () => {
    const input = {
      farmName: farmName.trim(),
      // latitude: latitude,
      // longitude: longitude,
      notes: notes.trim(),
      customerId: customerId,
      providerCompanyId: providerCompanyId,
      address,
    }

    console.log('input', input)

    setSaving(true)
    try {
      const { data } = await createFarm({
        variables: {
          input,
        },
      })
      console.log(data)
      if (data.createCustomer.success) {
        onSave()
        setIsOpenModal(false)
        return
      }
    } catch (e) {
      console.error(e)
      callSnackBar('Error Message 1', 'error')
      setSaving(false)
      setError('Error creating company')
    }
  }

  const succeddLocation = (position: any) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }
  const errorLocation = () => {
    console.error('Error get coords')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succeddLocation, errorLocation, {})
  }, [])

  return (
    <Stack direction="row" spacing={2}>
      <Stack maxWidth={500} spacing={2}>
        {/* {error ?? <Typography>{error}</Typography>} */}
        <Typography
          variant="subtitle1"
          noWrap
          component="div"
          color="text.secondary"
          fontWeight={'bold'}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Farm
        </Typography>
        <TextField
          sx={{ width: 1, maxWidth: 500 }}
          id="outlined-basic"
          label="Farm Name"
          name="given-farm"
          variant="outlined"
          autoComplete="given-farm"
          value={farmName}
          onChange={e => {
            setFarmName(e.target.value)
          }}
          required
          size="small"
        />
        <Divider />
        <Typography
          variant="subtitle1"
          noWrap
          component="div"
          color="text.secondary"
          fontWeight={'bold'}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Address
        </Typography>
        {/* <AddressForm
          address={address}
          handleAddressChange={handleAddressChange}
        /> */}
        <Divider />
        <Typography
          variant="subtitle1"
          noWrap
          component="div"
          color="text.secondary"
          fontWeight={'bold'}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Notes
        </Typography>
        <TextField
          multiline
          rows={4}
          value={notes}
          onChange={e => {
            setNotes(e.target.value)
          }}
        />
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          sx={{ paddingY: 1 }}
        >
          <Stack direction={'row'} spacing={2}>
            {saving && (
              <Box sx={{ paddingX: 2 }}>
                <CircularProgress size={18} />
              </Box>
            )}
            <Button
              variant="contained"
              disabled={saving || !farmName.trim()}
              onClick={handleCreateFarm}
            >
              Save and Close
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}
