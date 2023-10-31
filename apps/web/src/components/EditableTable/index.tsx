import React, { useEffect, useReducer } from 'react'
import './style.css'
import makeData from './makeData'
import Table from './Table'
import { reducer } from './reducer'
import { Box } from '@mui/material'

export const EditableTable: React.FC<any> = ({
  columns,
  data,
  setData,
  skipReset,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    columns,
    data,
    skipReset,
  })

  useEffect(() => {
    dispatch({ type: 'enable_reset' })
  }, [state.data, state.columns])

  return (
    <Box position="relative">
      <Table
        columns={state.columns}
        data={state.data}
        setData={setData}
        dispatch={dispatch}
        skipReset={state.skipReset}
      />
    </Box>
  )
}
