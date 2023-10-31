import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Farm } from './Farm'

const dataFieldsTest = [
  {
    id: '123-q',
    name: 'Farm 1',
    notes: 'Lorem ipsum notes',
    address: {
      addressLine1: 'Street 1',
      addressLine2: ' line 2',
      city: 'Kobrin',
      state: 'WF',
      postalCode: '0002',
      country: 'France',
    },
  },
  {
    id: '123-qwerty',
    name: 'Farm 2',
    notes: 'Lorem ipsum notes',
    address: {
      addressLine1: 'Street 2',
      addressLine2: ' line 1',
      city: 'Wroclow',
      state: 'WF',
      postalCode: '2222',
      country: 'Poland',
    },
  },
]

export const FarmFields: React.FC = () => {
  return (
    <Box>
      {dataFieldsTest.map((el: any, ind: number) => {
        return <Farm data={el} key={ind} />
      })}
    </Box>
  )
}
