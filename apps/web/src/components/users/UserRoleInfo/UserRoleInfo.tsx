import React from 'react'
import { useUser } from '../../../contexts/UserContext'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { initial } from 'lodash'
import UserAvatar from '../UserAvatar/UserAvatar'
import { Link } from 'react-router-dom'

const UserRoleInfo = () => {
  const { user } = useUser()

  return (
    <div>
      <Box>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/userprofile">
            <ListItemIcon>
              <Box paddingRight={2}>
                <UserAvatar
                  size={32}
                  initial={user?.displayName.toUpperCase()[0] ?? ''}
                  avatarUrl={user?.userSettings?.avatarUrl ?? ''}
                />
              </Box>
            </ListItemIcon>
            <Stack>
              <ListItemText
                primary={
                  user?.displayName ?? `${user?.firstName} ${user?.lastName}`
                }
                secondary={user?.selectedUserRole?.company?.name}
                primaryTypographyProps={{ noWrap: true }}
              />
              <ListItemText
                secondary={user?.selectedUserRole?.rolesInfo[0].name}
                primaryTypographyProps={{ noWrap: true }}
              />
            </Stack>
          </ListItemButton>
        </ListItem>
      </Box>
    </div>
  )
}

export default UserRoleInfo
