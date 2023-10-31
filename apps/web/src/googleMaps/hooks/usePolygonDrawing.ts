import { useEffect, useRef, useState } from 'react'
import { MouseLocation, OverlayItem, OverlayType, PolygonType } from '../types'
import { POLYGON_COLORS } from '../../constants'
import { set } from 'lodash'
import {
  addEventListenersToPolygon,
  getPolygonSettings,
} from '../utilities/overlayItemUtility'

const usePolygonDrawing = (
  map: google.maps.Map | undefined,
  drawingManager: google.maps.drawing.DrawingManager | undefined,
  history?: OverlayItem[],
  addOverlayToHistory?: (historyItem: OverlayItem) => void,
  handlePolygonClick?: (
    polygon: google.maps.Polygon,
    mouseLocation: MouseLocation,
  ) => void,
) => {
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([])

  const [polygonType, setPolygonType] = useState<PolygonType>(PolygonType.OUTER)

  const [polygonEventListener, setPolygonEventListener] =
    useState<google.maps.MapsEventListener | null>(null)

  const polygonTypeRef = useRef<PolygonType>(PolygonType.OUTER)

  useEffect(() => {
    if (!map || !drawingManager) return

    console.log('Initializing usePolygonDrawing')

    // Listen to polygon complete event
    addListeners()

    // Cleanup
    return () => {
      console.log('Cleaning up usePolygonDrawing')
      if (!drawingManager) return

      if (polygonEventListener) {
        google.maps.event.removeListener(polygonEventListener)
      }
    }
  }, [map, drawingManager])

  // Effect to handle undo/redo operations
  useEffect(() => {
    if (!history) return

    const newPolygons = history
      .filter(item => item.overlayItemType === OverlayType.POLYGON)
      .map(item => item.overlayItem as google.maps.Polygon)

    setPolygons(newPolygons)
  }, [history])

  useEffect(() => {
    polygonTypeRef.current = polygonType
  }, [polygonType])

  const addListeners = () => {
    if (!drawingManager) return

    const listener = google.maps.event.addListener(
      drawingManager,
      'polygoncomplete',
      (polygon: google.maps.Polygon) => {
        polygon.set('polygonType', polygonTypeRef.current)

        addEventListenersToPolygon(polygon, handlePolygonClick)

        setPolygons(previousList => [...previousList, polygon])

        // Add polygon to history
        if (addOverlayToHistory) {
          addOverlayToHistory({
            overlayItemType: OverlayType.POLYGON,
            overlayItem: polygon,
          })
        }
      },
    )

    setPolygonEventListener(listener)
  }

  const setPolygonOptions = (polygonType: PolygonType) => {
    if (!drawingManager) return

    setPolygonType(polygonType)

    drawingManager.setOptions({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      polygonOptions: getPolygonSettings(polygonType),
    })
  }

  return { setPolygonOptions, polygons, setPolygons }
}

export default usePolygonDrawing
