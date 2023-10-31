import { Button, IconButton, IconProps, Stack, Typography } from '@mui/material'
import React, { ComponentType } from 'react'
import {
  SortAscending as SortAscendingIcon,
  SortDescending as SortDescendingIcon,
  Placeholder as PlaceholderIcon,
} from '@phosphor-icons/react'
import { SortDirection } from '../types/ZenTableColumn'

export type ColumnHeaderProps = {
  icon?: ComponentType<IconProps> // Icon component
  name: string // Column name
  isSorted?: boolean // If this column is currently sorted
  sortDirection?: SortDirection // The current sort direction of the column
  sortable?: boolean // If this column is sortable
  onSort?: () => void // Callback when the header is clicked for sorting
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  icon,
  name,
  sortable,
  isSorted,
  sortDirection,
  onSort,
}) => {
  const IconComponent = icon || (() => null)

  const handleSortClick = () => {
    onSort?.()
  }

  const endIcon = isSorted ? (
    sortDirection === SortDirection.ASC ? (
      <SortAscendingIcon size={24} />
    ) : (
      <SortDescendingIcon size={24} />
    )
  ) : (
    <PlaceholderIcon opacity={0} size={24} />
  )

  return (
    <Button
      onClick={sortable ? handleSortClick : undefined}
      startIcon={<IconComponent sx={{ fontSize: 18 }} />}
      endIcon={endIcon}
      sx={{ width: '100%' }}
    >
      <Typography variant={'body2'} color="text.secondary">
        {name}
      </Typography>
    </Button>
  )
}

export default ColumnHeader
