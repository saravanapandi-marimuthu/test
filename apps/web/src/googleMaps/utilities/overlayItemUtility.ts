import { POLYGON_COLORS } from '../../constants'
import { MouseLocation, PolygonType } from '../types'

export const getPolygonSettings = (
  polygonType: PolygonType,
): google.maps.PolygonOptions => {
  const colorIndex = polygonType === PolygonType.OUTER ? 0 : 1

  return {
    editable: true,
    draggable: true,
    fillColor: POLYGON_COLORS[colorIndex].fillColor,
    strokeColor: POLYGON_COLORS[colorIndex].strokeColor,
    zIndex: colorIndex + 1,
  }
}

export const addEventListenersToPolygon = (
  polygon: google.maps.Polygon,
  handlePolygonClick?: (
    polygon: google.maps.Polygon,
    location: MouseLocation,
  ) => void,
) => {
  console.log('addEventListenersToPolygon')

  polygon.addListener('click', (event: any) => {
    const location: MouseLocation = {
      x: event.domEvent.clientX,
      y: event.domEvent.clientY,
    }

    handlePolygonClick?.(polygon, location)
  })

  // Add the right-click event listener to delete the polygon
  polygon.addListener('rightclick', (event: any) => {
    //handlePolygonRightClick(polygon, event)
  })

  // Add mouseover event listener to change the stroke weight
  polygon.addListener('mouseover', () => {
    polygon.setOptions({
      strokeWeight: 5,
      draggable: true,
    })
  })

  // Add mouseout event listener to change the stroke weight
  polygon.addListener('mouseout', () => {
    polygon.setOptions({
      strokeWeight: 2,
    })
  })

  /** TODO: Might be useful in the future
  polygon.addListener('set_at', updateGeoJSON)
  polygon.addListener('insert_at', updateGeoJSON)
  polygon.addListener('remove_at', updateGeoJSON)
  polygon.addListener('dragend', updateGeoJSON)
  */
}

export const addEventListenersToPolyline = (
  polyline: google.maps.Polyline,
  handlePolylineClick?: (
    polyline: google.maps.Polyline,
    location: MouseLocation,
  ) => void,
) => {
  polyline.addListener('click', (event: any) => {
    const location: MouseLocation = {
      x: event.domEvent.clientX,
      y: event.domEvent.clientY,
    }

    handlePolylineClick?.(polyline, location)
  })

  // Add mouseover event listener to change the stroke weight
  polyline.addListener('mouseover', () => {
    polyline.setOptions({
      strokeWeight: 8,
      draggable: true,
    })
  })

  // Add mouseout event listener to change the stroke weight
  polyline.addListener('mouseout', () => {
    polyline.setOptions({
      strokeWeight: 4,
      draggable: true,
    })
  })
}

export const addEventListenersToMarker = (
  marker: google.maps.Marker,
  handleMarkerClick?: (
    marker: google.maps.Marker,
    location: MouseLocation,
  ) => void,
) => {
  marker.addListener('click', (event: any) => {
    const location: MouseLocation = {
      x: event.domEvent.clientX,
      y: event.domEvent.clientY,
    }

    handleMarkerClick?.(marker, location)
  })
}
