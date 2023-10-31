import React from 'react'
import {
  Box,
  Container,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material'
import { OverridableTypeMap } from '@mui/material/OverridableComponent'
import { useThemeMode } from '../../../contexts/ThemeContext'
import {
  ArrowsInSimple,
  ArrowsOutSimple,
  Minus,
  X,
} from '@phosphor-icons/react'
import { SizeModal } from '../../../types/types'

interface ResizeModal extends SizeModal {
  children?: React.ReactNode
  open: boolean
  handleClose(): void
  handleMin(): void
  handleReg(): void
  handleMax(): void
}

export const ResizeModal: React.FC<ResizeModal> = ({
  children,
  open,
  stateModal,
  handleClose,
  handleMin,
  handleReg,
  handleMax,
}) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  const styleContainer = {
    position: 'absolute',
    top: stateModal === 'max' ? '16px' : '50%',
    left: '50%',
    transform:
      stateModal === 'max' ? 'translate(-50%, 0%)' : 'translate(-50%, -50%)',
    width: stateModal === 'max' ? `calc(100% - 32px)` : `708px`,
    height: stateModal === 'max' ? `calc(100% - 90px)` : '733px',
    borderRadius: '6px',
    boxShadow: '0px 4px 9px #171a1f, 0px 0px 2px #171a1f',
    background: isDarkMode ? 'black' : '#fff',
    padding: '13px 11px 50px 26px',
    transition: '0.5s',
  }

  const styleHeaderModal = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styleContainer}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography>TITLE #9999</Typography>
          <Box sx={styleHeaderModal}>
            <Tooltip title="Minimize">
              <IconButton onClick={handleMin}>
                <Minus size={15} weight="thin" />
              </IconButton>
            </Tooltip>
            {stateModal !== 'max' ? (
              <Tooltip title="Maximize">
                <IconButton onClick={handleMax}>
                  <ArrowsOutSimple size={16} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Restore down">
                <IconButton onClick={handleReg}>
                  <ArrowsInSimple size={16} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <X size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {children}
      </Box>
    </Modal>
  )
}
