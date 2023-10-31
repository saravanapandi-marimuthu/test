import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { backgroundColor, gap } from '../../../../contexts/ThemeContext'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { DotMenu } from '../../../shared/Menu/DotMenu'

export const RecentActivity: React.FC<any> = ({ data }) => {
  const [displayData, setDisplayData] = useState([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const maxLengthTable = 10
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const dataItemsMenu = [
    {
      children: () => {
        return <Typography>Item menu 1</Typography>
      },
      onClick: (e: any) => {
        console.log(e.target.outerText)
      },
    },
    {
      children: () => {
        return <Typography>Item menu 2</Typography>
      },
      onClick: (e: any) => {
        console.log(e.target.outerText)
      },
    },
    {
      children: () => {
        return <Typography>Item menu 3</Typography>
      },
      onClick: (e: any) => {
        console.log(e.target.outerText)
      },
    },
  ]

  const columns = [
    {
      name: 'item',
      label: 'Item',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>{data?.[rowIndex]?.item}</Box>
        },
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: false,
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>{data?.[rowIndex]?.date}</Box>
        },
      },
    },
    {
      name: 'salesperson',
      label: 'Salesperson',
      options: {
        filter: false,
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>{data?.[rowIndex]?.salesperson}</Box>
        },
      },
    },
    {
      name: 'amount',
      label: '$',
      options: {
        filter: false,
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>{`$ ${data?.[rowIndex]?.amount}`}</Box>
        },
      },
    },
    {
      name: '',
      label: '',
      options: {
        filter: false,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          return (
            <DotMenu
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              dataItemsMenu={dataItemsMenu}
            />
          )
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
    if (data.length > maxLengthTable) {
      data.length = maxLengthTable
    }
    setDisplayData(data)
  }, [maxLengthTable, displayData])

  return (
    <Box
      sx={{
        width: `calc(50% - ${gap} / 2)`,
        borderRadius: '6px',
        boxShadow: 2,
        padding: '20px 17px 20px 24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontWeight: 700, marginBottom: '11px' }}>
          Recent Activity
        </Typography>
        <Button sx={{ color: backgroundColor }} variant="text">
          View more
        </Button>
      </Box>
      <MUIDataTable
        title={''}
        data={displayData}
        columns={columns}
        options={options}
      />
    </Box>
  )
}
