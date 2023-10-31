import React, { useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import FieldMap, { Location } from '../FieldMap/FieldMap'

const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY

interface FieldMapWrapperProps {
  fieldBoundaries: GeoJSON.FeatureCollection<GeoJSON.Polygon> | undefined
  center: Location
  onUpdate: (
    updatedBoundaries: GeoJSON.FeatureCollection<GeoJSON.Polygon>,
  ) => void
}

const FieldMapWrapper: React.FC<FieldMapWrapperProps> = ({
  fieldBoundaries,
  center,
  onUpdate,
}) => {
  return (
    <Wrapper apiKey={apiKey} libraries={['drawing', 'marker']}>
      <FieldMap
        fieldBoundaries={fieldBoundaries}
        onUpdate={onUpdate}
        center={center}
      />
    </Wrapper>
  )
}

export default FieldMapWrapper
