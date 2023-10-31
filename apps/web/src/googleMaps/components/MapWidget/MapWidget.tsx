import React, { FunctionComponent, useState, useCallback } from 'react'

import { GoogleMapsProvider } from '../GoogleMapsProvider/GoogleMapsProvider'
import MapCanvas from '../MapCanvas/MapCanvas'
import PlacesAutocompleteService from '../PlacesAutocompleteService/PlacesAutocompleteService'
import { Box, Typography } from '@mui/material'
import MapDrawingManager from '../MapDrawingManager/MapDrawingManager'
import {
  FeatureCollection,
  Polygon,
  GeoJsonProperties,
  Geometry,
} from 'geojson'

const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY

const mapOptions = {
  center: { lat: 44.96724343, lng: -103.77155637 },
  zoom: 14,
  disableDefaultUI: true,
  zoomControl: true,
  scaleControl: true,
  mapTypeId: 'satellite', //  'satellite', //google.maps.MapTypeId.SATELLITE, //
}

interface MapWidgetProps {
  fieldBoundaries?: FeatureCollection<Geometry, GeoJsonProperties>
  onUpdate: (
    updatedBoundaries: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void
}

const MapWidget: React.FC<MapWidgetProps> = props => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)

  const mapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMapContainer(node)
    },
    [],
  )

  const { fieldBoundaries, onUpdate } = props

  return (
    <GoogleMapsProvider
      apiKey={apiKey}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
      // Add the places library
      libraries={['places', 'drawing', 'marker']}
    >
      <React.StrictMode>
        <Box
          id="map-container"
          flexGrow={1}
          width="100%"
          height="100%"
          minWidth={400}
          minHeight={400}
          padding={1}
          sx={{ position: 'relative' }}
        >
          <MapCanvas ref={mapRef} />
          <Box
            padding={2}
            sx={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '100%',
              zIndex: 1000,
            }}
          >
            <PlacesAutocompleteService />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '80px',
              left: '20px',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: 0,
              elevation: 4,
              boxShadow: 4,
              borderRadius: 1,
            }}
          >
            <MapDrawingManager
              fieldBoundaries={fieldBoundaries}
              onUpdate={onUpdate}
            />
          </Box>
        </Box>
      </React.StrictMode>
    </GoogleMapsProvider>
  )
}

export default MapWidget
