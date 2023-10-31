import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
  editProfilePublicClient,
  passwordResetPublicClient,
} from '../../../msalConfig'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { Password as PasswordIcon } from '@phosphor-icons/react'
import { Login, Logout, PersonAdd, Settings } from '@mui/icons-material'
import { createAvatar } from '@dicebear/core'
import { bottts, lorelei, openPeeps, pixelArt } from '@dicebear/collection'
import { useUser } from '../../../contexts/UserContext'
import {
  SignOut as SignOutIcon,
  UserCircleGear as UserCircleGearIcon,
  Wrench as WrenchIcon,
} from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import UserAvatar from '../../users/UserAvatar/UserAvatar'
import { useSwitchUserRole } from '../../../hooks/useSwitchUserRole'

const SignInButton = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  return (
    <button className="button button--primary" onClick={handleLogin}>
      <Login className="h-6 w-6 text-logo-color" />
      <span>Login</span>
    </button>
  )
}

const ProfileMenu: React.FC = ({}) => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false)
  const [initial, setInitial] = useState<string>('')
  const { instance, accounts } = useMsal()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user } = useUser()
  const { switchRole } = useSwitchUserRole()

  const isAuthenticated = useIsAuthenticated()

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: 'Zoe',
      backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
      skinColor: ['c0aede'],
      hair: ['variant04'],
    }).toDataUriSync()
  }, [])

  useEffect(() => {
    setInitial(user?.displayName.toUpperCase()[0] ?? '')
  }, [user])

  useEffect(() => {
    const checkTfpClaim = async () => {
      if (accounts.length > 0) {
        const account = accounts[0]
        const idTokenClaims = account.idTokenClaims as any
        const iss = idTokenClaims?.iss || ''
        const idp = idTokenClaims?.idp || ''
        const authority = `https://${
          import.meta.env.VITE_APP_TENANT_NAME
        }.b2clogin.com`

        console.log('Authority', authority, 'Account', account, 'idp', idp)
        if (String(idp).startsWith('local') || !idp) {
          setShowEditProfile(true)
        } else {
          setShowEditProfile(false)
        }
      }
    }

    checkTfpClaim()
  }, [accounts])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    editProfilePublicClient.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  const passwordResetClick = (event: React.MouseEvent<HTMLElement>) => {
    passwordResetPublicClient.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  const dropDownMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 260,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton selected component={Link} to="/userprofile">
              <ListItemIcon>
                <UserAvatar
                  initial={initial}
                  avatarUrl={user?.userSettings?.avatarUrl ?? ''}
                />
              </ListItemIcon>
              <Stack>
                <ListItemText
                  primary={
                    user?.displayName ?? `${user?.firstName} ${user?.lastName}`
                  }
                  secondary={user?.selectedUserRole?.company?.name}
                  primaryTypographyProps={{ noWrap: true }}
                />
                <Stack direction="column" spacing={0}>
                  {user?.selectedUserRole?.rolesInfo.map(
                    (roleDisplayName, index) => (
                      <Typography
                        key={roleDisplayName.name}
                        variant="caption"
                        color="text.secondary"
                      >
                        {roleDisplayName.name}
                      </Typography>
                    ),
                  ) ?? ''}
                </Stack>
              </Stack>
            </ListItemButton>
          </ListItem>
        )}

        {isAuthenticated &&
          // Enumerate through all the roles and display the role name under each company
          user?.userRoles?.map((userRole, index) => {
            if (userRole.companyId == user?.selectedUserRole?.companyId) {
              return null
            }

            return (
              <div key={userRole.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => switchRole?.(userRole.id)}>
                    <ListItemIcon>
                      <UserAvatar
                        initial={initial}
                        avatarUrl={user?.userSettings?.avatarUrl ?? ''}
                      />
                    </ListItemIcon>
                    <Stack>
                      <ListItemText
                        primary={
                          user?.displayName ??
                          `${user?.firstName} ${user?.lastName}`
                        }
                        secondary={userRole.company?.name}
                        primaryTypographyProps={{ noWrap: true }}
                      />
                      <Stack direction="column" spacing={0}>
                        {userRole.rolesInfo.map((roleDisplayName, index) => (
                          <Typography
                            key={roleDisplayName.name}
                            variant="caption"
                            color="text.secondary"
                          >
                            {roleDisplayName.name}
                          </Typography>
                        )) ?? ''}
                      </Stack>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              </div>
            )
          })}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WrenchIcon size={24} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/userprofile">
            <ListItemIcon>
              <UserCircleGearIcon size={24} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => instance.logout()}>
            <ListItemIcon>
              <SignOutIcon size={24} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
        {showEditProfile && (
          <Box>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={passwordResetClick}>
                <ListItemIcon>
                  <PasswordIcon size={24} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
      </Menu>
    </>
  )

  if (isAuthenticated) {
    return (
      <div className="relative inline-block">
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatar
              initial={initial}
              avatarUrl={user?.userSettings?.avatarUrl ?? ''}
            />
          </IconButton>
        </Tooltip>
        {dropDownMenu}
      </div>
    )
  }

  return <SignInButton />
}

export default ProfileMenu
