import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import { useGoogleMap } from '../../hooks/useGoogleMap'
import { Popover, Stack } from '@mui/material'
import PolygonInfoPopup from '../PolygonInfoPopup/PolygonInfoPopup'
import usePolygonDrawing from '../../hooks/usePolygonDrawing'
import useDrawingHistory from '../../hooks/useDrawingHistory'
import usePolylineDrawing from '../../hooks/usePolylineDrawing'
import useMarkerDrawing from '../../hooks/useMarkerDrawing'
import { MouseLocation, PinType, PolygonType } from '../../types'
import MapDrawToolbarMenu from '../MapDrawToolbarMenu/MapDrawToolbarMenu'
import useGeoJSON from '../../hooks/useGeoJSON'
import {
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  GeometryObject,
} from 'geojson'

export interface DrawingControlMenuProps {
  fieldBoundaries?: FeatureCollection<Geometry, GeoJsonProperties>
  //GeoJSON.FeatureCollection<GeoJSON.Polygon>
  onUpdate: (
    updatedBoundaries: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void
}

const MapDrawingManager = (props: DrawingControlMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('pan')
  const [currentPolygon, setCurrentPolygon] =
    useState<google.maps.Polygon | null>(null)
  const [mapActionCompleteListeners, setMapActionCompleteListeners] = useState<
    google.maps.MapsEventListener[] | null
  >([])

  const [mouseLocation, setMouseLocation] = useState<MouseLocation>({
    x: 0,
    y: 0,
  })

  const mouseAnchorRef = useRef(null)

  const { fieldBoundaries, onUpdate } = props

  const map = useGoogleMap()
  const { addOverlayToHistory, undo, redo, history, future } =
    useDrawingHistory(map)

  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(
    null,
  )

  const handlePolygonClick = (
    polygon: google.maps.Polygon,
    mouseLocation: MouseLocation,
  ) => {
    setCurrentPolygon(polygon)
    setMouseLocation(mouseLocation)
  }

  const { setPolygonOptions, polygons, setPolygons } = usePolygonDrawing(
    map,
    drawingManagerRef?.current ?? undefined,
    history,
    addOverlayToHistory,
    handlePolygonClick,
  )

  const { setPolylineOptions, polylines, setPolylines } = usePolylineDrawing(
    map,
    drawingManagerRef?.current ?? undefined,
    history,
    addOverlayToHistory,
  )

  const { setMarkerOptions, markers, setMarkers } = useMarkerDrawing(
    map,
    drawingManagerRef?.current ?? undefined,
    history,
    addOverlayToHistory,
  )

  const { setGeoJsonState, getGeoJSONFromMap } = useGeoJSON({
    map,
    polygons,
    setPolygons,
    handlePolygonClick,
    polylines,
    setPolylines,
    markers,
    setMarkers,
  })

  useEffect(() => {
    console.log('fieldBoundaries', fieldBoundaries)

    const geoJSON = getGeoJSONFromMap()

    onUpdate?.(geoJSON)
  }, [polygons, polylines, markers])

  useEffect(() => {
    if (!map) return

    if (!drawingManagerRef.current) {
      drawingManagerRef.current = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        polygonOptions: {
          editable: true,
        },
      })
      drawingManagerRef.current.setMap(map)
    }

    if (mapActionCompleteListeners) {
      mapActionCompleteListeners.forEach(listener =>
        google.maps.event.removeListener(listener),
      )
    }

    // Listener for left-click on the map to close the polygon info popup
    const leftClickListener = google.maps.event.addListener(
      map,
      'click',
      () => {
        if (drawingManagerRef.current) {
          setCurrentPolygon(null)
        }
      },
    )

    // Listener for right-click on the map to end drawing
    const rightClickListener = google.maps.event.addListener(
      map,
      'rightclick',
      () => {
        if (drawingManagerRef.current) {
          drawingManagerRef.current.setDrawingMode(null)
          setSelectedMenuItem('pan')
        }
      },
    )

    setMapActionCompleteListeners([leftClickListener, rightClickListener])

    // Cleanup
    return () => {
      console.log('Cleaning up MapDrawingManager')
      if (!drawingManagerRef.current) return

      google.maps.event.clearInstanceListeners(drawingManagerRef.current)
    }
  }, [map])

  const saveAndClosePolygonInfoPopup = (newData: any) => {
    if (newData && currentPolygon) {
      currentPolygon.set('name', newData.name)
      currentPolygon.set('description', newData.description)

      // Update the polygon data here
      setPolygons(currentPolygons => {
        // Find the index of the polygon that needs to be updated
        const indexToUpdate = currentPolygons.findIndex(
          polygon => polygon === currentPolygon,
        )

        if (indexToUpdate !== -1) {
          // Replace the old polygon with the updated one
          const updatedPolygons = [...currentPolygons]
          updatedPolygons[indexToUpdate] = currentPolygon
          return updatedPolygons
        } else {
          // If the polygon doesn't exist, add it
          return [...currentPolygons, currentPolygon]
        }
      })
    }

    closePolygonInfoPopup()
  }

  const closePolygonInfoPopup = () => {
    setCurrentPolygon(null)
  }

  const handleDrawModeChange = (newSelectedMenuItem: any) => {
    if (newSelectedMenuItem !== null) {
      // This ensures at least one button is active
      setSelectedMenuItem(newSelectedMenuItem)

      switch (newSelectedMenuItem) {
        case 'pan':
          if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(null)
            drawingManagerRef.current.setOptions({
              drawingMode: null,
            })
          }
          break
        case 'poly-outer':
          setPolygonOptions(PolygonType.OUTER)
          break
        case 'poly-inner':
          setPolygonOptions(PolygonType.INNER)
          break
        case 'line':
          setPolylineOptions(2)
          break
        case 'pin':
          setMarkerOptions(PinType.DEFAULT)
          break
        case 'pin-gate':
          setMarkerOptions(PinType.GATE)
          break
        default:
          break
      }
    }
  }

  const handleExportToGeoJSON = () => {
    const geoJSON = getGeoJSONFromMap()
    console.log('geoJSON', geoJSON)

    const blob = new Blob([JSON.stringify(geoJSON)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'map_data.geojson'
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleImportGeoJSON = (
    geoJson: FeatureCollection<GeometryObject, GeoJsonProperties>,
  ) => {
    setGeoJsonState(geoJson)
  }

  return (
    <>
      <Stack direction="column" spacing={1} padding={1}>
        <MapDrawToolbarMenu
          selectedMenuItem={selectedMenuItem}
          onMenuItemClick={handleDrawModeChange}
          handleUndo={undo}
          handleRedo={redo}
          undoDisabled={history.length === 0}
          redoDisabled={future.length === 0}
          handleExport={handleExportToGeoJSON}
          handleImport={handleImportGeoJSON}
        />
      </Stack>

      <Box
        sx={{
          position: 'fixed',
          left: mouseLocation.x,
          top: mouseLocation.y,
          zIndex: -1,
        }}
        ref={mouseAnchorRef}
      />

      {currentPolygon && (
        <Popover
          open={Boolean(currentPolygon)}
          anchorEl={mouseAnchorRef.current}
          onClose={closePolygonInfoPopup}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{ opacity: 0.9 }}
          slotProps={{
            paper: {
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            },
          }}
        >
          <Box
            sx={{
              mt: '10px',
              '&::before': {
                backgroundColor: 'white',
                opacity: 0.6,
                content: '""',
                display: 'block',
                position: 'absolute',
                width: 12,
                height: 12,
                top: 4,
                transform: 'rotate(45deg)',
                left: 'calc(50% - 0px)',
              },
            }}
          >
            <PolygonInfoPopup
              polygon={currentPolygon}
              onSave={saveAndClosePolygonInfoPopup}
            />
          </Box>
        </Popover>
      )}
    </>
  )
}

export default MapDrawingManager
