import fs from 'fs'
import path from 'path'
import * as shapefile from 'shapefile'
import { featureCollection } from '@turf/helpers'

async function convertShapefileToGeoJSON(
  shapefilePath: string,
): Promise<GeoJSON.FeatureCollection> {
  const features: GeoJSON.Feature[] = []

  await shapefile.open(shapefilePath).then((source) =>
    source
      .read()
      .then(function log(result): any {
        console.log(result)
        if (result.done) return
        features.push(result.value)
        return source.read().then(log)
      })
      .catch((error) => {
        console.log(error)
      }),
  )

  return featureCollection(features)
}

// Usage example:
const shapefilePath = 'shape file path example.shp'

const filePath = path.resolve(shapefilePath)

/*
convertShapefileToGeoJSON(filePath)
  .then((geoJSON) => {
    console.log(JSON.stringify(geoJSON, null, 2))
  })
  .catch((error) => {
    console.error('Error converting shapefile to GeoJSON:', error)
  })
*/
export default convertShapefileToGeoJSON
