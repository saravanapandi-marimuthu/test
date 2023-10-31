import { useEffect, useRef, useState } from 'react'
import { OverlayItem, OverlayType, PinType } from '../types'
import getIconUrl from '../../components/shared/IconToSvg/IconToSvg'
import { MAP_MARKER_SIZE, POLYGON_COLORS } from '../../constants'

const useMarkerDrawing = (
  map: google.maps.Map | undefined,
  drawingManager: google.maps.drawing.DrawingManager | undefined,
  history?: OverlayItem[],
  addOverlayToHistory?: (historyItem: OverlayItem) => void,
  handleMarkerClick?: (polygon: google.maps.Marker) => void,
) => {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  const [pinType, setPinType] = useState<PinType>(PinType.DEFAULT)

  const [eventListener, setEventListener] =
    useState<google.maps.MapsEventListener | null>(null)

  const pinTypeRef = useRef<PinType>(PinType.DEFAULT)

  useEffect(() => {
    if (!map || !drawingManager) return

    console.log('Initializing useMarkerDrawing')

    // Listen to polygon complete event
    addListeners()

    // Cleanup
    return () => {
      console.log('Cleaning up useMarkerDrawing')
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
      .filter(item => item.overlayItemType === OverlayType.MARKER)
      .map(item => item.overlayItem as google.maps.Marker)

    setMarkers(newPolygons)
  }, [history])

  useEffect(() => {
    console.log('Markers changed', markers)
  }, [markers])

  useEffect(() => {
    pinTypeRef.current = pinType // Step 2
  }, [pinType])

  const addListeners = () => {
    if (!drawingManager) return

    console.log('Adding marker listeners')
    const listener = google.maps.event.addListener(
      drawingManager,
      'markercomplete',
      (marker: google.maps.Marker) => {
        google.maps.event.addListener(marker, 'click', () => {
          if (handleMarkerClick) {
            handleMarkerClick(marker)
          }
        })

        marker.setMap(null)
        // Create the "real" marker
        const realMarker = createMarker(
          marker.getPosition(),
          pinTypeRef.current,
        )

        setMarkers(previousList => [...previousList, realMarker])

        // Add polygon to history
        if (addOverlayToHistory) {
          addOverlayToHistory({
            overlayItemType: OverlayType.MARKER,
            overlayItem: realMarker,
          })
        }
      },
    )

    setEventListener(listener)
  }

  function createMarker(position: any, pinType: PinType): google.maps.Marker {
    console.log('Creating marker', position, pinType)
    const colorIndex = pinType === PinType.DEFAULT ? 3 : 4

    const image = {
      url: getIconUrl({
        type: pinType === PinType.DEFAULT ? 'MapPin' : 'Gate',
        color: POLYGON_COLORS[colorIndex].strokeColor,
        size: MAP_MARKER_SIZE,
      }),
      size: new google.maps.Size(MAP_MARKER_SIZE, MAP_MARKER_SIZE),
      //scale: 0.5,
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor:
        pinType === PinType.DEFAULT
          ? new google.maps.Point(MAP_MARKER_SIZE / 2, MAP_MARKER_SIZE)
          : new google.maps.Point(MAP_MARKER_SIZE / 2, MAP_MARKER_SIZE / 2),
    }

    const marker = new google.maps.Marker({
      position: position,
      draggable: true,
      map: map,
      title: 'Custom marker',
      icon: image,
    })

    let circle: google.maps.Circle | null = null
    google.maps.event.addListener(marker, 'mouseover', () => {
      circle = new google.maps.Circle({
        center: marker.getPosition(),
        radius: MAP_MARKER_SIZE * 4,
        strokeColor: 'white',
        strokeWeight: 1,
        fillColor: 'white',
        map: map,
        zIndex: 100,
      })
    })

    google.maps.event.addListener(marker, 'mouseout', () => {
      if (circle) {
        circle.setMap(null)
        circle = null
      }
    })

    return marker
  }

  const setMarkerOptions = (pinType: PinType) => {
    if (!drawingManager) return

    setPinType(pinType)

    drawingManager.setOptions({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      markerOptions: {
        draggable: true,
        zIndex: 4,
      },
    })
  }
  return { setMarkerOptions, markers, setMarkers }
}

export default useMarkerDrawing
