import React, { useState } from 'react'
import img from '../../../assets/map.png'
import { Box } from '@mui/material'

export const FieldMapComponent: React.FC = () => {
  return (
    <Box sx={{ width: 'auto', height: '150px' }}>
      <img
        src={img}
        alt="map"
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
      />
    </Box>
  )
}
