import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import NewAvatarPicker from '../../components/AvatarPicker/NewAvatarPicker'
import SectionHeadingToolBar from '../../components/shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { useMutation, useQuery } from '@apollo/client'
import AddressForm from '../../components/shared/address/AddressForm/AddressForm'
import {
  UserInfoDocument,
  User,
  UserRole,
  AddressType,
  PhoneNumberType,
  SwitchUserRoleDocument,
} from '../../graphql/generated/graphql'
import { UPDATE_USER_PROFILE } from '../../graphql/mutations'
import { useUser } from '../../contexts/UserContext'
import { TabPanel } from '../../components/shared/TabPanel/TabPanel'
import { CategorizedAddress } from '../../types/sharedTypes'

const UserProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>()
  const [selectedTab, setSelectedTab] = React.useState(0)

  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(
    undefined,
  )
  const [address, setAddress] = useState<CategorizedAddress>({
    addressType: AddressType.Billing,
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })
  const [refreshing, setRefreshing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE)
  const [switchUserRole] = useMutation(SwitchUserRoleDocument)

  const { setUser } = useUser()

  function initializeUserProfile(usr: User | undefined) {
    if (!usr) {
      return
    }

    console.log('initializeUserProfile', usr)
    setUserProfile(usr)
    setFirstName(usr.firstName ?? '')
    setLastName(usr.lastName ?? '')
    setAvatarUrl(usr.userSettings?.avatarUrl ?? '')
    setSelectedRoleId(usr.selectedUserRoleId ?? '')

    if (usr.userAddresses.length > 0) {
      const firstAddress = usr.userAddresses[0]

      const addr: CategorizedAddress = {
        addressId: firstAddress.addressId,
        addressType: firstAddress.addressType,
        address: {
          addressLine1: firstAddress.address.addressLine1,
          addressLine2: firstAddress.address.addressLine2 ?? '',
          city: firstAddress.address.city,
          state: firstAddress.address.state,
          postalCode: firstAddress.address.postalCode,
          country: firstAddress.address.country,
        },
      }

      setAddress(addr)
    }
  }

  const { loading, error, data, refetch } = useQuery(UserInfoDocument, {
    onCompleted: data => {
      console.log(data)
      initializeUserProfile(data.userInfo as User)
    },
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleAvatarChange = (avatar: string) => {
    setAvatarUrl(avatar)
  }

  const handleAddressChange = (categorizedAddress: CategorizedAddress) => {
    console.log('NewAddress', categorizedAddress)
    setAddress(categorizedAddress)
  }

  const handleSelectRole = async (roleId: string) => {
    setSelectedRoleId(roleId)

    try {
      const { data } = await switchUserRole({
        variables: {
          input: { roleId: roleId },
        },
      })

      setUser(data?.switchUserRole.user as User)
    } catch (error) {
      console.error('Error switching role', error)
    }
  }

  const handleRefreshProfile = () => {
    setRefreshing(true)
    refetch()
      .then(data => {
        console.log(data)
        initializeUserProfile(data.data.userInfo as User)
        setUser(data.data.userInfo as User)
        setRefreshing(false)
      })
      .catch(e => {
        console.log('Refresh error')
        setRefreshing(false)
      })
  }

  const handleSaveProfile = async () => {
    console.log('handleSaveProfile', address)

    const userAddress = {
      ...address,
    }

    const avatarData = {
      avatarData: avatarUrl,
    }

    const updatedUser = {
      username: firstName,
      firstName,
      lastName,
    }

    const phoneNumber = userProfile?.userPhoneNumbers[0]

    const userPhoneNumber = {
      phoneNumber: phoneNumber?.phoneNumber?.mainNumber ?? '',
      phoneNumberType: phoneNumber?.phoneNumberType || PhoneNumberType.Work,
      phoneNumberId: phoneNumber?.phoneNumberId,
    }

    const settings = userProfile?.userSettings

    const userSettings = {
      avatarUrl: settings?.avatarUrl,
      //avatarFallbackImage: settings?.avatarFallbackImage,
      darkMode: settings?.darkMode ?? false,
      selectedUserRoleId: selectedRoleId,
      extendedProperties: JSON.stringify(settings?.extendedProperties),
    }

    setSaving(true)
    setRefreshing(true)

    console.log('Address', address)
    const { data } = await updateUserProfile({
      variables: {
        user: updatedUser,
        userAddress: userAddress,
        userPhoneNumber: userPhoneNumber,
        avatarData: avatarData,
        userSettings: userSettings,
      },
    })

    //setUser(savedUser)
    console.log(data)
    setSaving(false)
    setRefreshing(false)
  }

  return (
    <>
      <Container fixed maxWidth={false} sx={{ minHeight: 300 }}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Box
              flexGrow={1}
              padding={2}
              display="flex"
              justifyContent="center"
            >
              <Paper sx={{ padding: 2, minWidth: '200px' }}>
                <Stack
                  spacing={2}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <NewAvatarPicker
                    url={avatarUrl}
                    onAvatarChange={handleAvatarChange}
                  />
                  <Typography
                    className="customColor"
                    fontWeight={'bold'}
                    sx={{}}
                  >
                    {firstName}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </Grid>
          <Grid item sm={12} md={9}>
            <Paper>
              <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                  <Tab label="General" sx={{ textTransform: 'none' }} />
                  <Tab label="Notifications" sx={{ textTransform: 'none' }} />
                  <Tab label="Settings" sx={{ textTransform: 'none' }} />
                </Tabs>
              </Box>
              <TabPanel value={selectedTab} index={0}>
                <Box padding={2}>
                  <SectionHeadingToolBar
                    title={'Profile'}
                    loading={loading || refreshing}
                    hasAddButton={false}
                    //hasRefreshButton={false}
                    onRefreshButtonClicked={handleRefreshProfile}
                  />

                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        sx={{ width: 1, maxWidth: 500 }}
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
                        size="small"
                      />
                      <TextField
                        sx={{ width: 1, maxWidth: 500 }}
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
                        size="small"
                      />
                    </Stack>

                    <Box sx={{ marginBottom: 2 }}></Box>
                    <AddressForm
                      categorizedAddress={address}
                      onAddressChange={handleAddressChange}
                    />
                  </Stack>
                </Box>
                <Box
                  padding={2}
                  sx={{
                    width: '100%',
                  }}
                >
                  <SectionHeadingToolBar
                    title={'Assigned Roles'}
                    loading={false}
                    hasAddButton={false}
                    hasRefreshButton={false}
                  />
                  <Box padding={1}>
                    <Grid container>
                      {userProfile?.userRoles?.map(
                        (role: UserRole, index: number) => {
                          return (
                            <Grid item sm={6} md={4} key={role.id}>
                              <Button
                                onClick={() => handleSelectRole(role.id)}
                                sx={{ borderRadius: 3 }}
                              >
                                <Paper
                                  elevation={
                                    role.id === selectedRoleId ? 12 : 1
                                  }
                                  sx={{
                                    borderRadius: 3,
                                  }}
                                >
                                  <Box
                                    borderColor={'lightgray'}
                                    borderRadius={3}
                                    minWidth={180}
                                    minHeight={180}
                                    justifyItems={'center'}
                                    padding={2}
                                  >
                                    <Stack spacing={2}>
                                      <Typography
                                        color="text.secondary"
                                        fontWeight={'bold'}
                                      >
                                        {role.company?.name}
                                      </Typography>
                                      {role.rolesInfo.map(
                                        (roleDisplayName, index) => {
                                          return (
                                            <Typography
                                              key={roleDisplayName.value}
                                              variant="caption"
                                              color="text.secondary"
                                              fontWeight={'bold'}
                                            >
                                              {roleDisplayName.name}
                                            </Typography>
                                          )
                                        },
                                      )}
                                    </Stack>
                                  </Box>
                                </Paper>
                              </Button>
                            </Grid>
                          )
                        },
                      )}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  padding={1}
                  flexGrow={1}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="outlined"
                    disabled={refreshing || loading || saving}
                    onClick={handleSaveProfile}
                    sx={{ minWidth: '100px' }}
                  >
                    {saving ? 'SAVING...' : 'SAVE'}
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <>
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: '500px',
                      bgcolor: 'background.paper',
                    }}
                  ></Box>
                </>
              </TabPanel>
              <TabPanel value={selectedTab} index={2}>
                <>
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: '500px',
                      bgcolor: 'background.paper',
                    }}
                  ></Box>
                </>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfilePage
