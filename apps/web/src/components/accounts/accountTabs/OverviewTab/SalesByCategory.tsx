import { Box, Typography } from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { PriceChange } from '../../../shared/PriceChange/PriceChange'

export const SalesByCategory: React.FC<any> = ({ data, maxLength }) => {
  const [displayData, setDisplayData] = useState([])

  const columns = [
    {
      name: 'category',
      label: 'Category',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>{data?.[rowIndex]?.category}</Box>
        },
      },
    },
    {
      name: 'salesYTD',
      label: 'Sales YTD',
      options: {
        filter: false,
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>${data?.[rowIndex]?.sales}</Box>
        },
      },
    },
    {
      name: 'chg',
      label: '% Chg YOY',
      options: {
        filter: false,
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <PriceChange price={Number(data?.[rowIndex]?.chg)} />
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'multiselect',
    responsive: 'standard',
    serverSide: true,
    filter: false,
    search: false,
    viewColumns: false,
    pagination: false,
    count: 10,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    download: false,
    print: false,
    searchAlwaysOpen: false,
    selectableRowsHeader: false,
    selectableRows: undefined,
  }

  useEffect(() => {
    if (data.length > maxLength) {
      data.length = maxLength
    }
    setDisplayData(data)
  }, [maxLength, displayData])

  return (
    <Box
      sx={{
        borderRadius: '6px',
        boxShadow: 2,
        padding: '14px 27px 32px 18px',
      }}
    >
      <Typography sx={{ fontWeight: 700, marginBottom: '16px' }}>
        Sales By Category
      </Typography>
      <MUIDataTable
        title={''}
        data={displayData}
        columns={columns}
        options={options}
      />
    </Box>
  )
}
