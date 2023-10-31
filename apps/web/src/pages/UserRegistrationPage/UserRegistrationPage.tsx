// UserRegistration.tsx
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  debounce,
  useMediaQuery,
} from '@mui/material'
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material'

import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useMutation, useQuery } from '@apollo/client'
import NewAvatarPicker from '../../components/AvatarPicker/NewAvatarPicker'
import { useMsal } from '@azure/msal-react'
import { useThemeMode } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { REGISTER_USER } from '../../graphql/mutations'
import { GET_COMPANIES } from '../../graphql/companies/queries'

const UserRegistrationPage: React.FC = () => {
  const [name, setName] = useState<string | undefined>('')

  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)

  const { theme, toggleTheme } = useThemeMode()
  const navigate = useNavigate()

  const isDarkMode = theme.palette.mode === 'dark'

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const { setUser } = useUser()

  const [addError, setAddError] = useState('')

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: data => {
      // Check the shape of data and update this path accordingly.
      // Assuming that data.registerUser returns the user.
      const registeredUser = data.registerUserWithCompany

      console.log('Registered User', registeredUser)
      // Update the user in UserProvider
      //setUser(transformedUser)

      console.log(
        'User registered and context updated. Navigating to /userhome',
      )
      navigate('/userhome')
    },
    onError: error => {
      console.error('An error occurred: ', error)
      if (error.graphQLErrors) {
        const gqlError = error.graphQLErrors[0]
        console.log('GqlError=', gqlError)
        setAddError(error.message)
      } else {
        setAddError('An unknown error occurred.')
      }
    },
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send the registration data to your backend for further processing

    let userInput = {
      companyName,
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
      avatarUrl,
      darkMode: isDarkMode,
    }

    try {
      await registerUser({
        variables: {
          input: userInput,
        },
      })

      console.log('Navigating to /')
      navigate('/userhome')
      //refetch()
    } catch (error: any) {
      if (error.graphQLErrors) {
        const gqlError = error.graphQLErrors[0]
        console.log('GqlError=', gqlError)
        setAddError(error.message)
      } else {
        setAddError('An unknown error occurred.')
      }
    }
  }

  const { instance, accounts } = useMsal()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const { data, loading, error } = useQuery(GET_COMPANIES, {
    variables: { page: 1, perPage: 50, searchTerm: debouncedSearchTerm },
    skip: debouncedSearchTerm.length < 4, // Skip the query if searchTerm has less than 4 characters
  })

  useEffect(() => {
    if (!!accounts && accounts.length > 0) {
      setContactEmail(accounts[0].username)
      setName(accounts[0].name)
    }
  }, [accounts])

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

  const handleAvatarChange = (avatar: string) => {
    console.log('New avatar:', avatar)
    setAvatarUrl(avatar)
  }

  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }

  const handleAddress1Change = (e: any) => {
    setAddress1(e.target.value)
  }

  const handleAddress2Change = (e: any) => {
    setAddress2(e.target.value)
  }

  const handleCityChange = (e: any) => {
    setCity(e.target.value)
  }

  const handleStateChange = (e: any) => {
    setState(e.target.value)
  }

  const handlePostalCodeChange = (e: any) => {
    setPostalCode(e.target.value)
  }

  const handleCountryChange = (e: any) => {
    setCountry(e.target.value)
  }

  return (
    <Container fixed maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Profile</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction={'row'} spacing={2}>
            <NewAvatarPicker onAvatarChange={handleAvatarChange} />
            <Stack direction={'column'} spacing={2} width={'100%'}>
              <Typography variant="h6">
                {!!accounts && accounts[0].username}
              </Typography>
              <TextField
                sx={{ margin: 1, width: 1 }}
                id="outlined-basic"
                label="Name"
                name="Username"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                size="small"
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Company Info</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <form autoComplete="on">
            <Stack spacing={2}>
              <Autocomplete
                size="small"
                freeSolo
                options={data?.getCompanies.companies || []}
                getOptionLabel={(option: any) => option.name}
                onInputChange={(event, value) => {
                  setSearchTerm(value)
                  setCompanyName(value)
                }}
                inputValue={companyName}
                onChange={(event, value) =>
                  setCompanyName(value ? value.name : '')
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField {...params} label="Company name" />
                )}
                loading={loading}
              />

              <TextField
                sx={{ margin: 1, width: 1 }}
                id="outlined-basic"
                label="Address Line 1"
                name="address"
                variant="outlined"
                size="small"
                value={address1}
                onChange={handleAddress1Change}
              />
              <TextField
                sx={{ margin: 1, width: 1 }}
                id="outlined-basic"
                label="Address Line 2"
                name="address-line2"
                variant="outlined"
                size="small"
                value={address2}
                onChange={handleAddress2Change}
              />
              <TextField
                sx={{ margin: 1, width: 1 }}
                id="outlined-basic"
                label="City"
                name="address-level2"
                variant="outlined"
                size="small"
                value={city}
                onChange={handleCityChange}
              />
            </Stack>
            <Grid container spacing={2} paddingTop={2}>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: 1 }}
                  id="outlined-basic"
                  label="State"
                  name="address-level1"
                  variant="outlined"
                  size="small"
                  value={state}
                  onChange={handleStateChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: 1 }}
                  id="outlined-basic"
                  label="Postal Code / Zip"
                  name="postal-code"
                  variant="outlined"
                  size="small"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: 1 }}
                  id="outlined-basic"
                  label="Country"
                  name="country"
                  variant="outlined"
                  size="small"
                  value={country}
                  onChange={handleCountryChange}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Settings</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControlLabel
            control={
              <Checkbox
                value={isDarkMode}
                onClick={toggleTheme}
                icon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              />
            }
            label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            REGISTER
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserRegistrationPage
