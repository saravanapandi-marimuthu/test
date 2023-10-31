import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ArrowDown, ArrowUp, Equals } from '@phosphor-icons/react'
import { gap } from '../../../contexts/ThemeContext'

interface PriceChange {
  price?: number
}

export const PriceChange: React.FC<PriceChange> = ({ price = 0 }) => {
  const arrowType = () => {
    if (price > 0) {
      return <ArrowUp size={22} color="#1DD75BFF" />
    }
    if (price < 0) {
      return <ArrowDown size={22} color="#E05858FF" />
    }
    return <Equals size={22} color="#757575" />
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {arrowType()}
      <Typography>{price > 0 ? `+${price}` : price}%</Typography>
    </Box>
  )
}
