import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataFlexModal, StateModal } from '../../../types/types'
import { MinModal } from '../MinModal/MinModal'
import { ResizeModal } from '../ResizeModal/ResizeModal'
import { useAppContext } from '../../../contexts/AppContext'

export const ModalAddEdit: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const {
    dataFlexModal = [],
    setDataFlexModal = () => {},
    flexModal = {},
    setFlexModal = () => {},
  } = useAppContext()

  const styleWrapperMinModal = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'fixed',
    bottom: '7px',
    right: '87px',
    zIndex: 1400,
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setDataFlexModal(dataFlexModal.filter(el => el.id !== flexModal.id))
    return setFlexModal({ id: null })
  }

  const resizeMinModal = (el: DataFlexModal) => {
    return setFlexModal({ ...flexModal, id: el.id })
  }

  const closeMinModal = (el: DataFlexModal) => {
    let closeEl = dataFlexModal.filter(elem => elem.id !== el.id)
    return setDataFlexModal(closeEl)
  }

  const handleMin = () => {
    setOpen(false)
    return setFlexModal({ id: null, stateModal: 'min' })
  }

  const handleReg = () => {
    return setFlexModal({ ...flexModal, stateModal: 'reg' })
  }

  const handleMax = () => {
    return setFlexModal({ ...flexModal, stateModal: 'max' })
  }

  useEffect(() => {
    !!flexModal.id && handleOpen()
  }, [open, flexModal.id])

  return (
    <>
      <ResizeModal
        open={open}
        handleClose={handleClose}
        handleMin={handleMin}
        handleReg={handleReg}
        handleMax={handleMax}
        stateModal={flexModal.stateModal}
      >
        <Box>active ID : {flexModal.id}</Box>
      </ResizeModal>

      {dataFlexModal && (
        <Box sx={styleWrapperMinModal}>
          {dataFlexModal.map(el => {
            if (el.id === flexModal.id) {
              return
            }
            return (
              <MinModal
                el={el}
                closeMinModal={closeMinModal}
                resizeMinModal={resizeMinModal}
              />
            )
          })}
        </Box>
      )}
    </>
  )
}
