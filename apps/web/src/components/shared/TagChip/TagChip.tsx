import React from 'react'
import { Chip, Typography } from '@mui/material'
import { TAG_COLORS } from '../../../constants'
import { useThemeMode } from '../../../contexts/ThemeContext'

type Props =
  | {
      colorIndex: number
      name: string
      onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    }
  | {
      colorIndex: number
      name: string
      onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
      deleteIcon?: React.ReactElement<any, any>
      onDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    }

const TagChip = (props: Props) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'
  const { colorIndex, name, onClick, ...rest } = props

  if (colorIndex >= 0 && colorIndex < TAG_COLORS.length) {
    return (
      <Chip
        label={name}
        onClick={onClick}
        sx={{
          backgroundColor: isDarkMode
            ? TAG_COLORS[colorIndex % TAG_COLORS.length].dark
            : TAG_COLORS[colorIndex % TAG_COLORS.length].light,
          borderRadius: '4px',
          padding: '0px',
          height: '24px',
          minWidth: '50px',
        }}
        onMouseDown={event => {
          event.stopPropagation()
        }}
        {...rest}
      />
    )
  }

  return (
    <Typography>
      Invalid color index. Name: {name} index: {colorIndex}
    </Typography>
  )
}

export default TagChip
