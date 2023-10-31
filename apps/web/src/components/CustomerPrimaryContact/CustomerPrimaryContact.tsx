import { Typography, Stack } from '@mui/material'
import UserAvatar from '../users/UserAvatar/UserAvatar'
import { RoleTypes, UserRole } from '../../graphql/generated/graphql'

interface CustomerPrimaryContactProp {
  role?: UserRole
}

export const CustomerPrimaryContact: React.FC<CustomerPrimaryContactProp> = ({
  role,
}) => {
  if (!role?.roles?.find(r => r === RoleTypes.Contact)) {
    return <></>
  }

  const user = role.user

  let initial = (user?.firstName ?? ' ')[0].trim()

  if (!initial) {
    initial = (user?.email ?? ' ')[0].trim()
  }

  return (
    <>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <UserAvatar
          initial={initial}
          avatarUrl={user?.userSettings?.avatarUrl ?? undefined}
          size={28}
          useVariant={true}
        />
        <Typography variant="body2">{user?.firstName}</Typography>
        <Typography variant="body2">{user?.lastName}</Typography>
      </Stack>
    </>
  )
}
