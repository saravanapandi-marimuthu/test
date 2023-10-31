import { useEffect, useRef, useState } from 'react'
import { MouseLocation, OverlayItem, OverlayType } from '../types'
import { POLYGON_COLORS } from '../../constants'
import { addEventListenersToPolyline } from '../utilities/overlayItemUtility'

const usePolylineDrawing = (
  map: google.maps.Map | undefined,
  drawingManager: google.maps.drawing.DrawingManager | undefined,
  history?: OverlayItem[],
  addOverlayToHistory?: (historyItem: OverlayItem) => void,
  handlePolylineClick?: (
    polygon: google.maps.Polyline,
    location: MouseLocation,
  ) => void,
) => {
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([])
  const [eventListener, setEventListener] =
    useState<google.maps.MapsEventListener | null>(null)

  useEffect(() => {
    if (!map || !drawingManager) return

    console.log('Initializing usePolylineDrawing')

    // Listen to polygon complete event
    addListeners()

    // Cleanup
    return () => {
      console.log('Cleaning up usePolylineDrawing')
      if (!drawingManager) return

      if (eventListener) {
        google.maps.event.removeListener(eventListener)
      }
    }
  }, [map, drawingManager])

  // Effect to handle undo/redo operations
  useEffect(() => {
    if (!history) return

    const newPolygons = history
      .filter(item => item.overlayItemType === OverlayType.POLYLINE)
      .map(item => item.overlayItem as google.maps.Polygon)

    setPolylines(newPolygons)
  }, [history])

  const addListeners = () => {
    if (!drawingManager) return

    const listener = google.maps.event.addListener(
      drawingManager,
      'polylinecomplete',
      (polyline: google.maps.Polyline) => {
        addEventListenersToPolyline(polyline, handlePolylineClick)

        setPolylines(previousList => [...previousList, polyline])

        // Add polygon to history
        if (addOverlayToHistory) {
          addOverlayToHistory({
            overlayItemType: OverlayType.POLYGON,
            overlayItem: polyline,
          })
        }
      },
    )

    setEventListener(listener)
  }

  const setPolylineOptions = (colorIndex: number) => {
    if (!drawingManager) return

    drawingManager.setOptions({
      drawingMode: google.maps.drawing.OverlayType.POLYLINE,
      polylineOptions: {
        strokeWeight: 4,
        editable: true,
        draggable: true,
        strokeColor: POLYGON_COLORS[colorIndex].strokeColor,
        zIndex: colorIndex + 1,
      },
    })
  }

  return { setPolylineOptions, polylines, setPolylines }
}

export default usePolylineDrawing
