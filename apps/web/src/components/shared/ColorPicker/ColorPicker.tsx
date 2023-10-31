import React from 'react'
import { Box, Grid, Menu, MenuItem, Typography } from '@mui/material'
import { TAG_COLORS } from '../../../constants'
import { Check as CheckIcon } from '@phosphor-icons/react'
import { useThemeMode } from '../../../contexts/ThemeContext'

interface Props {
  anchorEl: HTMLElement | null
  handleClose: (colorIndex: number | undefined) => void
  selectedColorIndex: number | null
}

const ColorPicker = ({ anchorEl, handleClose, selectedColorIndex }: Props) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => handleClose(undefined)}
      sx={{ minWidth: 500 }}
    >
      {TAG_COLORS.map((color, index) => (
        <MenuItem
          key={color.name}
          onClick={() => handleClose(index)}
          sx={{ width: 200 }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <Box
                width={20}
                height={20}
                bgcolor={isDarkMode ? color.dark : color.light}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{color.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              {selectedColorIndex === index && <CheckIcon size={18} />}
              {/* Check mark */}
            </Grid>
          </Grid>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default ColorPicker
