import React from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import FieldMapTestComponent from '../../Maps/FieldMapTestComponent/FieldMapTestComponent'
import FieldMapWrapper from '../../Maps/FieldMapWrapper/FieldMapWrapper'
import { FeatureCollection, Polygon, GeoJsonProperties } from 'geojson'

export const EnterpriseField: React.FC<any> = ({
  name,
  location,
  currentCrop,
  area,
  fieldMap,
}) => {
  console.log(fieldMap)

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: 600, mb: 2 }} variant="h6">
              {name}
            </Typography>
            <Typography>
              <b>Location:</b> {`${location.latitude}, ${location.longitude}`}
            </Typography>
            <Typography>
              <b>Current Crop:</b> {currentCrop}
            </Typography>
            <Typography>
              <b>Area:</b> {area}
            </Typography>
          </Box>
          <Box sx={{ width: '200px', height: '150px' }}>
            <FieldMapWrapper
              fieldBoundaries={fieldMap}
              center={{ lat: location.latitude, lng: location.longitude }}
              onUpdate={function (
                updatedBoundaries: FeatureCollection<
                  Polygon,
                  GeoJsonProperties
                >,
              ): void {
                console.log('Test')
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
