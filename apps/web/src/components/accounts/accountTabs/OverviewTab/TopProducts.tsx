import React from 'react'
import { Box, Typography } from '@mui/material'
import { gap, useThemeMode } from '../../../../contexts/ThemeContext'
import ReactEcharts from 'echarts-for-react'
import { grey } from '@mui/material/colors'

export const TopProducts: React.FC<any> = ({ data }) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  const yAxisData = data?.map((el: any) => {
    return el.name
  })
  const xAxisData = data?.map((el: any) => {
    return el.amount
  })

  const option = {
    grid: {
      top: 10,
      bottom: 0,
      left: 0,
      right: 0,
    },
    xAxis: {
      show: false,
      axisLabel: {
        formatter: '$ {value}',
        align: 'center',
      },
    },
    yAxis: {
      inverse: true,
      type: 'category',
      data: yAxisData,
      max: 2,
      axisLabel: {
        verticalAlign: 'bottom',
        align: 'left',
        inside: true,
        lineHeight: 50,
        margin: 0,
        fontSize: '14px',
        color: isDarkMode ? grey[50] : grey[900],
      },
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        barMaxWidth: 30,
        itemStyle: {
          color: '#00bdd6',
        },
        type: 'bar',
        data: xAxisData,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'left',
          align: 'left',
          verticalAlign: 'middle',
          distance: -5,
          color: isDarkMode ? grey[50] : grey[900],
          valueAnimation: true,
          formatter: '${c}',
          fontSize: 14,
        },
      },
    ],
  }

  return (
    <Box
      sx={{
        borderRadius: '6px',
        boxShadow: 2,
        padding: '14px 27px 32px 18px',
      }}
    >
      <Typography sx={{ fontWeight: 700, marginBottom: '16px' }}>
        Top Products
      </Typography>
      {data.length ? (
        <ReactEcharts
          option={option}
          style={{
            height: '175px',
          }}
        />
      ) : (
        <Typography>No products</Typography>
      )}
    </Box>
  )
}
