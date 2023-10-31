// src/convertKmlToGeoJSON.ts
/*
  Cartographic file downloaded from
  https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html
*/

import fs from 'fs'
import path from 'path'
import { kml } from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'

const kmlFilePath = path.resolve(
  __dirname,
  '../data/cb_2021_us_aiannh_500k.kml',
)

const geoJSONFilePath = path.resolve(__dirname, '../data/us-states.json')

const kmlContent = fs.readFileSync(kmlFilePath, 'utf8')
const kmlDocument = new DOMParser().parseFromString(kmlContent, 'text/xml')
const geoJSON = kml(kmlDocument)

fs.writeFileSync(geoJSONFilePath, JSON.stringify(geoJSON), 'utf8')
