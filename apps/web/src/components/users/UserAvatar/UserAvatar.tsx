import React, { useEffect, useState } from 'react'
import { useUser } from '../../../contexts/UserContext'
import { Avatar, styled } from '@mui/material'

interface UserAvatarProps {
  initial: string
  avatarUrl?: string
  size?: number
  useVariant?: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  initial,
  avatarUrl = undefined,
  size = 32,
  useVariant = false,
}) => {
  const AvatarSecondary = styled(Avatar)(({ theme }) => ({
    backgroundColor: 'transparent',
    borderColor: theme.palette.secondary.main,
    border: `1px solid #00BDD6FF`,
    //backgroundColor: '#B2F7F6',
    color: '#00BDD6FF',
  }))

  if (avatarUrl) {
    return useVariant ? (
      <AvatarSecondary
        sx={{
          width: size,
          height: size,
          backgroundColor: 'transparent',
          color: 'red',
        }}
      >
        <img src={avatarUrl} alt="Avatar" />
      </AvatarSecondary>
    ) : (
      <Avatar
        sx={{
          width: size,
          height: size,
          backgroundColor: 'transparent',
          color: 'red',
        }}
      >
        <img src={avatarUrl} alt="Avatar" />
      </Avatar>
    )
  }

  return useVariant ? (
    <AvatarSecondary
      sx={{
        width: size,
        height: size,
      }}
    >
      {initial.toUpperCase()}
    </AvatarSecondary>
  ) : (
    <Avatar
      sx={{
        width: size,
        height: size,
      }}
    >
      {initial.toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar
