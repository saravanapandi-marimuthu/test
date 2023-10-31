import React, { useState } from 'react'
import { GeoJSON } from 'geojson'
import FieldMapWrapper from '../FieldMapWrapper/FieldMapWrapper'

const fieldBoundariesInput: GeoJSON.FeatureCollection<GeoJSON.Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Field 1',
        description: 'This is Field 1.',
        fillColor: '#ff0000',
        fillOpacity: 0.5,
        strokeColor: '#000000',
        strokeWidth: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-122.342078, 47.610785],
            [-122.341628, 47.610321],
            [-122.340947, 47.610877],
            [-122.341397, 47.611341],
            [-122.342078, 47.610785],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Field 2',
        description: 'This is Field 2.',
        fillColor: '#00ff00',
        fillOpacity: 0.5,
        strokeColor: '#000000',
        strokeWidth: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-122.339548, 47.610149],
            [-122.339098, 47.609685],
            [-122.338417, 47.610241],
            [-122.338867, 47.610705],
            [-122.339548, 47.610149],
          ],
        ],
      },
    },
  ],
}

const FieldMapTestComponent: React.FC = () => {
  const [fieldBoundaries, setFieldBoundaries] =
    useState<GeoJSON.FeatureCollection<GeoJSON.Polygon>>(fieldBoundariesInput)

  const handleFieldBoundariesUpdate = (
    updatedBoundaries: GeoJSON.FeatureCollection<GeoJSON.Polygon>,
  ) => {
    console.log('Updated GeoJSON', JSON.stringify(updatedBoundaries))
    setFieldBoundaries(updatedBoundaries)
  }

  return (
    <>
      <div>
        <FieldMapWrapper
          fieldBoundaries={fieldBoundaries}
          onUpdate={handleFieldBoundariesUpdate}
          center={{ lat: 0, lng: 0 }}
        />
      </div>
      <div className="p-20">Test</div>
    </>
  )
}

export default FieldMapTestComponent
