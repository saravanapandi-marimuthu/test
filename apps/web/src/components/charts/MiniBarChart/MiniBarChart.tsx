import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import usStatesData from '../../../assets/us-states.json'
import { Box, Stack, Typography } from '@mui/material'

import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
} from '@phosphor-icons/react'

echarts.registerMap('USA', usStatesData as any)

interface DataPoint {
  key: string
  value: number
}

interface MiniBarChartProp {
  title: string
  subTitle?: string
  backgroundColor: string
  barColor: string
  isPositiveTrend?: boolean
  yoyChange: string
  chartData: DataPoint[]
}

const MiniBarChart: React.FC<MiniBarChartProp> = ({
  title,
  subTitle,
  backgroundColor,
  barColor,
  isPositiveTrend = false,
  yoyChange,
  chartData,
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current)

      const option = {
        title: {
          show: false,
          text: '',
          //subtext: 'Data from www.census.gov',
          left: 'right',
          textStyle: {
            color: `gray`,
          },
        },
        xAxis: {
          show: false,
          type: 'category',
          data: chartData.map(dataPoint => dataPoint.key),
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: chartData.map(dataPoint => dataPoint.value),
            type: 'bar',
            itemStyle: {
              color: `${barColor}`,
            },
          },
        ],
      }

      chartInstance.setOption(option as any)
    }

    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current)
      }
    }
  }, [chartRef])

  return (
    <Box
      borderRadius={2}
      padding={2}
      sx={{ minWidth: 270, background: backgroundColor }}
    >
      <Typography component="div" color="text.secondary">
        {title}
      </Typography>
      <Typography component="div" variant={'h5'}>
        {subTitle}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Box width={130} height={80} padding={1}>
          <div ref={chartRef} className="w-full h-16" />
        </Box>
        <Box
          padding={1}
          display="flex"
          alignItems="flex-end"
          justifyContent="center" // This line can be removed if you do not want to center it horizontally
        >
          <Stack direction="row">
            <Typography>
              {isPositiveTrend ? (
                <ArrowUpIcon color="green" />
              ) : (
                <ArrowDownIcon color="red" />
              )}
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              {yoyChange}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default MiniBarChart
