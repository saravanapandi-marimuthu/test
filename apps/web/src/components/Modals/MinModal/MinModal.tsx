import React, { useState } from 'react'
import { DataFlexModal } from '../../../types/types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { ArrowsOutSimple, X } from '@phosphor-icons/react'
import { useThemeMode } from '../../../contexts/ThemeContext'

export const MinModal: React.FC<{
  el: DataFlexModal
  closeMinModal: (el: DataFlexModal) => void
  resizeMinModal: (el: DataFlexModal) => void
}> = ({ el, closeMinModal, resizeMinModal }) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'
  const styleMinModal = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '11px 9px 6px 24px',
    width: '236px',
    borderRadius: '6px',
    border: '1px solid #BDC1CAFF',
    boxShadow: '0px 4px 9px #171a1f, 0px 0px 2px #171a1f',
    background: isDarkMode ? 'black' : '#fff',
  }

  const styleMinControls = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  return (
    <Box sx={styleMinModal} key={el.id}>
      <Tooltip title={el.title}>
        <Typography
          sx={{
            maxWidth: '155px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '20px',
            textOverflow: 'ellipsis',
          }}
        >
          {el.title}
        </Typography>
      </Tooltip>
      <Box sx={styleMinControls}>
        <Tooltip title="Expand">
          <IconButton onClick={() => resizeMinModal(el)}>
            <ArrowsOutSimple size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton onClick={() => closeMinModal(el)}>
            <X size={16} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
