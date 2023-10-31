import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  styled,
} from '@mui/material'

interface ListItemCustom {
  icon: React.ReactNode
  name: string
  description: string
  loading: boolean
  href?: string | boolean
  type?: string | boolean
}

export const ListItemCustom: React.FC<ListItemCustom> = ({
  icon,
  name = '',
  description = '',
  loading,
  href = '',
  type = '',

}) => {
  const Link = styled('a')({
    color: '#1091F4FF',
    textDecoration: 'none',
  })

  return (
    <ListItem sx={{ padding: 0, display: 'flex', gap: '8px' }}>
      <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
      <ListItemText
        sx={{ color: '#6F7787FF', textWrap: 'nowrap', minWidth: 'auto' }}

        primary={
          loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : name
        }
      />
      <ListItemText
        sx={{ textAlign: 'right', minWidth: 'auto' }}

        primary={
          loading ? (
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          ) : href ? (
            <Link href={`${type}:${href}`}>{href}</Link>
          ) : (
            description
          )
        }
      />
    </ListItem>
  )
}
