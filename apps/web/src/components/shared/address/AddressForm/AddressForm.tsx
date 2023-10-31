// AddressForm.tsx
import React, { useEffect, useRef } from 'react'
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
} from '@mui/material'
import { CategorizedAddress } from '../../../../types/sharedTypes'
import { US_STATES } from '../../../../constants/states'
import { StyledTextField } from '../../mui/StyledTextField/StyledTextField'
import { set } from 'lodash'
import { AddressType } from '../../../../graphql/generated/graphql'

export interface AddressFormProps {
  categorizedAddress: CategorizedAddress
  enableAddressType?: boolean
  defaultAddressType?: AddressType
  enableRequiredFields?: boolean
  onAddressChange: (address: CategorizedAddress) => void
}

const AddressForm: React.FC<AddressFormProps> = (props: AddressFormProps) => {
  const {
    categorizedAddress,
    defaultAddressType,
    enableAddressType,
    enableRequiredFields,
    onAddressChange,
  } = props

  const [addressId, setAddressId] = React.useState<number | undefined>()
  const [addressLine1, setAddressLine1] = React.useState<string>('')
  const [addressLine2, setAddressLine2] = React.useState<string>('')
  const [city, setCity] = React.useState<string>('')
  const [state, setState] = React.useState<string>('')
  const [postalCode, setPostalCode] = React.useState<string>('')
  const [country, setCountry] = React.useState<string>('USA')

  const [addressType, setAddressType] = React.useState<AddressType>(
    AddressType.Billing,
  )

  useEffect(() => {
    if (categorizedAddress) {
      setAddressId(categorizedAddress.addressId)
      setAddressType(categorizedAddress.addressType ?? AddressType.Billing)

      if (categorizedAddress.address) {
        setAddressLine1(categorizedAddress.address.addressLine1)
        setAddressLine2(categorizedAddress.address.addressLine2 ?? '')
        setCity(categorizedAddress.address.city)
        setState(categorizedAddress.address.state || '')
        setPostalCode(categorizedAddress.address.postalCode)
        setCountry(categorizedAddress.address.country)
      }
    } else {
      setAddressType(defaultAddressType ?? AddressType.Billing)
    }
  }, [categorizedAddress])

  if (!categorizedAddress) {
    return <></>
  }

  const handleAddressChange = (newValue: string, fieldName: string) => {
    console.log('handleAddressChange', newValue, fieldName)
    onAddressChange({
      addressId: addressId,
      addressType: addressType,
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        [fieldName]: newValue,
      },
    })
  }

  const handleStateChange = (event: SelectChangeEvent) => {
    const newAddress = {
      ...categorizedAddress.address,
      state: event.target.value,
    }

    onAddressChange({
      addressType: addressType,
      address: newAddress,
    })
  }

  return (
    <form autoComplete="on">
      <Box sx={{ marginTop: 1 }}>
        <StyledTextField
          label="Address"
          required={enableRequiredFields}
          value={addressLine1}
          onChange={e => {
            setAddressLine1(e.target.value)
            handleAddressChange(e.target.value, 'addressLine1')
          }}
        />
      </Box>

      <Box sx={{ marginTop: 1 }}>
        <StyledTextField
          label="Address Line 2 (optional)"
          value={addressLine2}
          onChange={e => {
            setAddressLine2(e.target.value)
            handleAddressChange(e.target.value, 'addressLine2')
          }}
        />
      </Box>

      <Grid container direction="row" sx={{ marginTop: 1 }}>
        <Grid item sx={{ flex: 1 }}>
          <Grid container direction={'column'}>
            <Grid item sx={{ marginBottom: 1 }}>
              <StyledTextField
                label="City"
                required={enableRequiredFields}
                value={city}
                onChange={e => {
                  setCity(e.target.value)
                  handleAddressChange(e.target.value, 'city')
                }}
              />
            </Grid>

            <Grid item>
              <StyledTextField
                label="Zip"
                required
                value={postalCode}
                onChange={e => {
                  console.log('postalCode', e.target.value)
                  setPostalCode(e.target.value)
                  handleAddressChange(e.target.value, 'postalCode')
                }}
                onBlur={e => {
                  console.log('postalCode Blur', e.target.value)
                  setPostalCode(e.target.value)
                  handleAddressChange(e.target.value, 'postalCode')
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/** Divider */}
        <Grid item sx={{ marginLeft: 1, marginRight: 1 }} />

        <Grid item sx={{ flex: 1 }}>
          <Grid container direction={'column'}>
            <Grid
              item
              sx={{
                marginBottom: 1,
              }}
            >
              <FormControl sx={{ flex: 1, display: 'flex' }}>
                <InputLabel id="state-province-selector-label">
                  State/Province
                </InputLabel>
                <Select
                  labelId="state-province-selector-label"
                  required={enableRequiredFields}
                  value={state}
                  fullWidth
                  size="small"
                  sx={{ borderRadius: '4px' }}
                  onChange={(e: SelectChangeEvent) => {
                    console.log('state', e.target)
                    setState(e.target.value)
                    handleAddressChange(e.target.value, 'state')
                  }}
                  input={<OutlinedInput label="State/Province" />}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflowY: 'auto',
                      },
                    },
                  }}
                >
                  <MenuItem selected={!state} value="Select State"></MenuItem>
                  {Object.keys(US_STATES).map((key, index) => {
                    return (
                      <MenuItem key={`SelectItem-${index}`} value={key}>
                        {US_STATES[key as keyof typeof US_STATES]}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <StyledTextField
                //label="Country/Region"
                required
                disabled
                value={country}
                onChange={e => {
                  setCountry(e.target.value)
                  handleAddressChange(e.target.value, 'country')
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddressForm
