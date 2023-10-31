import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import usStatesData from '../../../assets/us-states.json'
import { Box, Stack, Typography } from '@mui/material'

import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react'

echarts.registerMap('USA', usStatesData as any)
interface SeriesData {
  name: string
  data: number[]
}

interface ChartData {
  labels: string[]
  series: SeriesData[]
}

interface MultiSeriesBarChartProp {
  title: string
  subTitle?: string
  backgroundColor: string
  barColor: string
  isPositiveTrend?: boolean
  yoyChange: string
  chartData: ChartData // change this prop
}

const MultiSeriesBarChart: React.FC<MultiSeriesBarChartProp> = ({
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
          show: true,
          text: title,
          left: 'left',
          textStyle: {
            color: 'gray',
          },
        },
        legend: {
          left: 'right',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: chartData.labels, // use the labels from chartData
        },
        yAxis: {},
        series: chartData.series.map((series, index) => ({
          name: series.name,
          type: 'bar',
          data: series.data,
          itemStyle: {
            color:
              index === 0
                ? 'rgba(15, 145, 244, 1.0)'
                : 'rgba(131, 83, 226, 1.0)',
          },
        })),
      }

      chartInstance.setOption(option as any)
    }

    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current)
      }
    }
  }, [chartRef, chartData])

  return (
    <Box borderRadius={2} padding={2} minHeight={500} sx={{ width: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: 500 }} />
    </Box>
  )
}

export default MultiSeriesBarChart
