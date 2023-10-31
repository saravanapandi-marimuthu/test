import { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  lighten,
  styled,
} from '@mui/material'
import ReactPhoneInput from 'react-phone-input-material-ui'
import { useMutation, useQuery } from '@apollo/client'
import { CategorizedAddress } from '../../../types/sharedTypes'
import { useUser } from '../../../contexts/UserContext'
import { callSnackBar } from '../../../utilities/callSnackBar'
import { StyledTextField } from '../../shared/mui/StyledTextField/StyledTextField'
import EmailField from '../../shared/EmailField/EmailField'
import { HighlightedBox } from '../../shared/mui/HighlightedBox/HighlightedBox'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import AddressForm from '../../shared/address/AddressForm/AddressForm'
import { CREATE_COMPANY } from '../../../graphql/companies/mutations'
import { AddressType, Tag } from '../../../graphql/generated/graphql'

interface AddSubsidiaryCompanyProps {
  parentCompanyName: string
  parentCompanyId: string
  entryType: string
  labelMessage: string
  successAndError: string[]
  onClose: () => void
  refetch: () => void
}

const AddSubsidiaryCompany = ({
  parentCompanyName,
  parentCompanyId,
  entryType,
  labelMessage,
  successAndError,
  onClose,
  refetch,
}: AddSubsidiaryCompanyProps) => {
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<Tag[]>([])

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

  const { user } = useUser()
  const [createSubsidiaryCompany] = useMutation(CREATE_COMPANY)

  const handleOnChange = (value: any) => {
    setPhoneNumber(value)
  }

  const handleAddressChange = (categorizedAddress: CategorizedAddress) => {
    setAddress(categorizedAddress)
  }

  const handleCreateSubsidiaryCompany = async () => {
    const input = {
      companyName,
      companyTypeName: entryType,
      parentCompanyId: parentCompanyId,

      companyAddress: address,
      companyPhoneNumber: {
        phoneNumberType: 'WORK',
        phoneNumber,
      },
      contactPerson: {
        firstName,
        lastName,
        email,
      },
      companyTags: tags.map((tag: any) => {
        return {
          tagName: tag.tagName,
          tagCategoryName: tag.tagCategory.tagCategoryName,
        }
      }),

      companyNotes: notes,
    }

    setSaving(true)
    try {
      const { data } = await createSubsidiaryCompany({
        variables: {
          input,
        },
      })
      await refetch()
      callSnackBar(successAndError[0], 'success')
      onClose()
    } catch (error) {
      callSnackBar('error', 'error')
      setSaving(false)
      setError(successAndError[1])
    }
  }

  return (
    <Box width={'100%'} justifyContent={'center'} padding={0} height={'100%'}>
      <Stack direction="column" padding={0}>
        <Box
          sx={{
            maxHeight: 660,
            width: '100%',
            overflowY: 'auto',
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <StyledTextField
              sx={{ width: 1, maxWidth: '100%' }}
              id="outlined-basic"
              label={labelMessage}
              name="company"
              autoComplete="company"
              variant="outlined"
              value={companyName}
              required
              onChange={e => {
                setCompanyName(e.target.value)
              }}
            />
            <Typography
              variant="subtitle1"
              component="div"
              color="text.secondary"
              fontWeight={'bold'}
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Primary Contact
            </Typography>
            <form autoComplete="on">
              <Stack direction={'row'} spacing={2}>
                <StyledTextField
                  id="outlined-basic"
                  label="First Name"
                  name="given-name"
                  variant="outlined"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={e => {
                    setFirstName(e.target.value)
                  }}
                  required
                />
                <StyledTextField
                  sx={{ borderRadius: '4px' }}
                  id="outlined-basic"
                  label="Last Name"
                  name="family-name"
                  autoComplete="family-name"
                  variant="outlined"
                  value={lastName}
                  required
                  onChange={e => {
                    setLastName(e.target.value)
                  }}
                />
              </Stack>
            </form>
            <form autoComplete="on">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <EmailField
                    label="Email"
                    value={email}
                    onChange={value => {
                      setEmail(value)
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReactPhoneInput
                    value={phoneNumber}
                    onChange={handleOnChange}
                    component={StyledTextField}
                  />
                </Grid>
              </Grid>
            </form>
            <TagPicker
              selectedTags={tags}
              onSelectedTagsChanged={tags => setTags(tags)}
              tagCategoryName={'Product Type'}
              enableTitle={false}
              multiple={false}
            />
            <Typography
              variant="subtitle1"
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
            <AddressForm
              categorizedAddress={address}
              defaultAddressType={AddressType.Billing}
              onAddressChange={handleAddressChange}
            />
            <Typography
              variant="subtitle1"
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
            <StyledTextField
              multiline
              rows={4}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </Stack>
        </Box>
        <HighlightedBox
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          sx={{
            padding: 2,
            paddingY: 3,
          }}
        >
          <Stack direction={'row'} spacing={2}>
            {saving && (
              <Box sx={{ paddingX: 2 }}>
                <CircularProgress size={18} />
              </Box>
            )}
            <Button
              variant="contained"
              disabled={saving || !firstName || !email || !companyName}
              onClick={handleCreateSubsidiaryCompany}
            >
              Save and Close
            </Button>
          </Stack>
        </HighlightedBox>
      </Stack>
    </Box>
  )
}

export default AddSubsidiaryCompany
