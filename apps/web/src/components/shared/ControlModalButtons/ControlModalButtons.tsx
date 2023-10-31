import { Box, Button } from '@mui/material'
import React from 'react'
import {
  ADD_MODAL_DATA,
  EDIT_MODAL_DATA,
  LANG_BOTTOM_MODAL,
} from '../../../constants'
import { useAppContext } from '../../../contexts/AppContext'

export const ControlModalButtons: React.FC = () => {
  const {
    dataFlexModal = [],
    setDataFlexModal = () => {},
    flexModal = {},
    setFlexModal = () => {},
  } = useAppContext()

  return (
    <Box
      padding={4}
      sx={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          if (dataFlexModal.length < LANG_BOTTOM_MODAL) {
            setDataFlexModal([ADD_MODAL_DATA, ...dataFlexModal])
            setFlexModal({ id: ADD_MODAL_DATA.id, stateModal: 'reg' })
          }
        }}
      >
        Add +
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          if (
            dataFlexModal &&
            dataFlexModal.length < LANG_BOTTOM_MODAL &&
            setDataFlexModal
          ) {
            setDataFlexModal([EDIT_MODAL_DATA, ...dataFlexModal])
            setFlexModal &&
              setFlexModal({ id: EDIT_MODAL_DATA.id, stateModal: 'reg' })
          }
        }}
      >
        Edit
      </Button>
    </Box>
  )
}
