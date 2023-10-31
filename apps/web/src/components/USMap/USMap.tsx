// USMap.tsx
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import usStatesData from '../../assets/us-states.json'

echarts.registerMap('USA', usStatesData as any)

interface USMapProps {
  stateFlags: { [key: string]: number }
}

type StateValue = {
  [key: string]: number
}

const USMap: React.FC<USMapProps> = props => {
  const { stateFlags } = props
  const chartRef = useRef<HTMLDivElement>(null)

  const defaultStateValues = usStatesData.features.map((feature: any) => ({
    name: feature.properties.name,
    value: 0,
  }))

  const customStateValues = Object.entries(stateFlags).map(([name, value]) => ({
    name: name,
    value: value,
  }))

  const mergedStateValues: StateValue = [
    ...defaultStateValues,
    ...customStateValues,
  ].reduce((acc: StateValue, curr) => {
    acc[curr.name] = curr.value
    return acc
  }, {})

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current)

      const option: echarts.EChartsOption = {
        title: {
          text: 'State Availability',
          //subtext: 'Data from www.census.gov',
          left: 'right',
          textStyle: {
            color: `gray`,
          },
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params: any) {
            const valueMap = {
              0: 'Not Available',
              1: 'Yes',
              2: 'No',
            }
            return (
              params.name +
              '<br/>' +
              (valueMap[params.value as keyof typeof valueMap] ||
                'Not Available')
            )
          },
        },
        visualMap: [
          {
            type: 'piecewise',
            pieces: [
              { min: 0, max: 0, label: 'Not Available', color: 'lightgray' },
              { min: 1, max: 1, label: 'Yes', color: 'green' },
              { min: 2, max: 2, label: 'No', color: 'orange' },
            ],
            textStyle: {
              color: 'gray',
            },
            orient: 'horizontal',
            left: 'center',
            bottom: 10,
            itemGap: 20,

            itemWidth: 20,
            itemHeight: 10,
          },
        ],
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'USA',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
              label: {
                show: true,
              },
            },
            data: Object.entries(mergedStateValues).map(([name, value]) => ({
              name: name,
              value: value,
            })),
          },
        ],
      }

      chartInstance.setOption(option)
    }

    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current)
      }
    }
  }, [chartRef, stateFlags])

  return (
    <div className="w-full md:w-1/2 min-w-fit mx-auto my-4 rounded-lg shadow-lg">
      <div ref={chartRef} className="w-full h-96" />
    </div>
  )
}

export default USMap
