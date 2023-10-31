import { useEffect, useState } from 'react'
import { GeoJSONGeometryType, MouseLocation, PolygonType } from '../types'
import {
  addEventListenersToMarker,
  addEventListenersToPolygon,
  addEventListenersToPolyline,
  getPolygonSettings,
} from '../utilities/overlayItemUtility'

export interface GeoJSONProps {
  map: google.maps.Map | undefined
  geoJson?: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>
  polygons?: google.maps.Polygon[]
  setPolygons?: (polygon: google.maps.Polygon[]) => void
  handlePolygonClick?: (
    polygon: google.maps.Polygon,
    location: MouseLocation,
  ) => void
  polylines?: google.maps.Polyline[]
  setPolylines?: (polyline: google.maps.Polyline[]) => void
  handlePolylineClick?: (
    polygon: google.maps.Polyline,
    location: MouseLocation,
  ) => void
  markers?: google.maps.Marker[]
  setMarkers?: (markers: google.maps.Marker[]) => void
  handleMarkerClick?: (
    polygon: google.maps.Marker,
    location: MouseLocation,
  ) => void
}

const useGeoJSON = (input: GeoJSONProps) => {
  const {
    map,
    geoJson,
    polygons = [],
    setPolygons,
    handlePolygonClick,
    polylines = [],
    setPolylines,
    handlePolylineClick,
    markers = [],
    setMarkers,
    handleMarkerClick,
  } = input
  const [geoJsonState, setGeoJsonState] = useState<
    GeoJSON.FeatureCollection<GeoJSON.GeometryObject> | undefined
  >(geoJson)

  useEffect(() => {
    if (!map) return

    if (!geoJsonState) return

    console.log('Initializing useGeoJSON')
    setGeoJsonState(geoJson)
    populateMapFromGeoJSONState()
  }, [map, geoJsonState])

  const getGeoJSONObjectFromGoogleMapsObject = (
    object: any,
    type: GeoJSONGeometryType,
  ): GeoJSON.Feature<GeoJSON.GeometryObject> | null => {
    console.log('googleMapsObjectToGeoJSON type=', type)

    if (type === GeoJSONGeometryType.POLYGON) {
      const coordinates = object
        .getPath()
        .getArray()
        .map((latLng: google.maps.LatLng) => [latLng.lng(), latLng.lat()])

      return {
        type: 'Feature',
        geometry: {
          type: GeoJSONGeometryType.POLYGON,
          coordinates: [coordinates],
        },
        properties: {
          polygonType: object.get('polygonType'),
          name: object.get('name'),
          description: object.get('description'),
        },
      }
    }

    if (type === GeoJSONGeometryType.LINE_STRING) {
      const coordinates = object
        .getPath()
        .getArray()
        .map((latLng: google.maps.LatLng) => [latLng.lng(), latLng.lat()])

      return {
        type: 'Feature',
        geometry: {
          type: GeoJSONGeometryType.LINE_STRING,
          coordinates: coordinates,
        },
        properties: {
          name: object.get('name'),
          description: object.get('description'),
        },
      }
    }

    if (type === GeoJSONGeometryType.POINT) {
      const position = object.getPosition()
      return {
        type: 'Feature',
        geometry: {
          type: GeoJSONGeometryType.POINT,
          coordinates: [position?.lng() || 0, position?.lat() || 0],
        },
        properties: {
          name: object.get('name'),
          description: object.get('description'),
        },
      }
    }

    return null
  }

  const getGoogleMapsObjectFromGeoJSON = (
    geoJSON: GeoJSON.Feature<GeoJSON.GeometryObject>,
  ) => {
    if (geoJSON.geometry.type === 'Polygon') {
      const polygonType =
        (geoJSON.properties?.polygonType as PolygonType) ?? PolygonType.OUTER

      const polygonSettings = getPolygonSettings(polygonType)

      const polygon = new google.maps.Polygon({
        paths: geoJSON.geometry.coordinates[0].map(
          (coordinate: number[]) =>
            new google.maps.LatLng(coordinate[1], coordinate[0]),
        ),

        ...polygonSettings,
      })

      addEventListenersToPolygon(polygon, handlePolygonClick)

      polygon.set('polygonType', polygonType)
      polygon.set('name', geoJSON.properties?.name)
      polygon.set('description', geoJSON.properties?.description)

      return polygon
    }

    if (geoJSON.geometry.type === 'LineString') {
      const polyline = new google.maps.Polyline({
        path: geoJSON.geometry.coordinates.map(
          (coordinate: number[]) =>
            new google.maps.LatLng(coordinate[1], coordinate[0]),
        ),
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        editable: true,
        draggable: true,
      })

      addEventListenersToPolyline(polyline, handlePolylineClick)

      polyline.set('name', geoJSON.properties?.name)
      polyline.set('description', geoJSON.properties?.description)

      return polyline
    }

    if (geoJSON.geometry.type === 'Point') {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          geoJSON.geometry.coordinates[1],
          geoJSON.geometry.coordinates[0],
        ),
        title: geoJSON.properties?.name,
        draggable: true,
      })

      addEventListenersToMarker(marker, handleMarkerClick)

      marker.set('name', geoJSON.properties?.name)
      marker.set('description', geoJSON.properties?.description)

      return marker
    }

    return null
  }

  const addGeoJSONToMap = (
    geoJSON: GeoJSON.Feature<GeoJSON.GeometryObject>,
  ) => {
    if (!map) return

    if (geoJSON.geometry.type === 'Polygon') {
      const polygon = getGoogleMapsObjectFromGeoJSON(
        geoJSON,
      ) as google.maps.Polygon

      if (polygon) {
        polygon.setMap(map)
        setPolygons?.([...polygons, polygon])
      }
    }

    if (geoJSON.geometry.type === 'LineString') {
      const polyline = getGoogleMapsObjectFromGeoJSON(
        geoJSON,
      ) as google.maps.Polyline

      if (polyline) {
        polyline.setMap(map)
        setPolylines?.([...polylines, polyline])
      }
    }

    if (geoJSON.geometry.type === 'Point') {
      const marker = getGoogleMapsObjectFromGeoJSON(
        geoJSON,
      ) as google.maps.Marker

      if (marker) {
        marker.setMap(map)
        setMarkers?.([...markers, marker])
      }
    }
  }

  const populateMapFromGeoJSONState = () => {
    if (!geoJsonState) return

    const bounds = new google.maps.LatLngBounds()

    geoJsonState.features.forEach((feature: GeoJSON.Feature) => {
      if (feature.geometry.type === 'Polygon') {
        const geom = feature.geometry.coordinates[0]

        geom.forEach(coord => {
          bounds.extend(new google.maps.LatLng(coord[1], coord[0]))
        })
      }

      addGeoJSONToMap(feature)
    })

    // Fit the map to the bounding box
    map?.fitBounds(bounds)
  }

  const getGeoJSONFromMap = () => {
    const geoJSON: GeoJSON.FeatureCollection<GeoJSON.GeometryObject> = {
      type: 'FeatureCollection',
      features: [],
    }

    console.log('polygons count', polygons.length)

    polygons.forEach(polygon => {
      const geoJSONPolygon = getGeoJSONObjectFromGoogleMapsObject(
        polygon,
        GeoJSONGeometryType.POLYGON,
      )

      if (geoJSONPolygon) {
        geoJSON.features.push(geoJSONPolygon)
      }
    })

    console.log('polylines count', polylines.length)

    polylines.forEach(polyline => {
      const geoJSONPolyline = getGeoJSONObjectFromGoogleMapsObject(
        polyline,
        GeoJSONGeometryType.LINE_STRING,
      )

      if (geoJSONPolyline) {
        geoJSON.features.push(geoJSONPolyline)
      }
    })

    console.log('markers count', markers.length)

    markers.forEach(marker => {
      const geoJSONMarker = getGeoJSONObjectFromGoogleMapsObject(
        marker,
        GeoJSONGeometryType.POINT,
      )

      console.log('geoJSONMarker', geoJSONMarker)
      if (geoJSONMarker) {
        geoJSON.features.push(geoJSONMarker)
      }
    })

    //setGeoJsonState(geoJSON)
    return geoJSON
  }

  return { setGeoJsonState, getGeoJSONFromMap }
}

export default useGeoJSON
