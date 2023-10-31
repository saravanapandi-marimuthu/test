import { useEffect, useRef, useState } from 'react'
import InfoWindowContent from '../InfoWindowContent/InfoWindowContent'
import { createRoot } from 'react-dom/client'
import CustomContextMenu from '../CustomContextMenu/CustomContextMenu'
import CustomInfoBox from '../CustomInfoBox/CustomInfoBox'
import { Box } from '@mui/material'

export interface Location {
  lat: number
  lng: number
}

const mapOptions = {
  center: { lat: 47.6105, lng: -122.342 },
  zoom: 17,
  disableDefaultUI: true,
}

const FieldMap = ({
  fieldBoundaries = undefined,
  center,
  onUpdate,
}: {
  fieldBoundaries: GeoJSON.FeatureCollection<GeoJSON.Polygon> | undefined
  center: Location
  onUpdate: (
    updatedBoundaries: GeoJSON.FeatureCollection<GeoJSON.Polygon>,
  ) => void
}) => {
  const [map, setMap] = useState<google.maps.Map | null>()
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(null)
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([])
  const [contextMenu, setContextMenu] = useState<{
    position: { x: number; y: number }
    polygon: google.maps.Polygon
    showDeletePolygon: boolean
    showDeleteVertex: boolean
    latLng: any
  } | null>(null)
  const [deletedObjects, setDeletedObjects] = useState<
    Array<{ type: 'vertex' | 'polygon'; data: any; index?: number }>
  >([])
  const [customInfoBox, setCustomInfoBox] = useState<{
    position: { x: number; y: number }
    polygon: google.maps.Polygon
    latLng: any
  } | null>(null)

  const mapRef = useRef<HTMLDivElement | null>(null)
  const polygonsRef = useRef<google.maps.Polygon[]>([])

  const infoWindow = new window.google.maps.InfoWindow()

  const handleDocumentClick = (event: any) => {
    if (customInfoBox || contextMenu) {
      if (event.stopPropagation) {
        console.log('stopPropagation')
        event.stopPropagation()
      } else if (event.stop) {
        console.log('stop')
        event.stop()
      }

      setCustomInfoBox(null)
      setContextMenu(null)
    }
  }

  useEffect(() => {
    polygonsRef.current = polygons
  }, [polygons])

  const handleSave = (
    polygon: google.maps.Polygon,
    newName: String,
    newDescription: String,
  ) => {
    polygon.set('name', newName)
    polygon.set('description', newDescription)

    // Update the polygons state
    var updatedPolygons = polygonsRef.current.map(prevPolygon => {
      if (prevPolygon === polygon) {
        return polygon
      }
      return prevPolygon
    })

    setPolygons(updatedPolygons)

    updateGeoJSON()
    infoWindow.close()
  }

  const hideContextMenu = () => {
    setContextMenu(null)
  }

  const hideInfoWindow = () => {
    setCustomInfoBox(null)
  }

  const deleteVertex = (polygon: google.maps.Polygon, latLng: any) => {
    let path = polygon.getPath()
    let vertexRemoved = false

    for (let i = 0; i < path.getLength(); i++) {
      if (latLng == path.getAt(i)) {
        path.removeAt(i)
        vertexRemoved = true
      }
    }

    hideContextMenu()
    hideInfoWindow()
  }

  const deletePolygon = (polygon: google.maps.Polygon) => {
    polygon.setMap(null)
    updateGeoJSON()
    hideContextMenu()
    hideInfoWindow()
  }

  const handlePolygonClick = (polygon: google.maps.Polygon, event: any) => {
    hideInfoWindow()
    hideContextMenu()
    setCustomInfoBox({
      position: { x: event.domEvent.clientX, y: event.domEvent.clientY },
      polygon,
      latLng: event.latLng,
    })
  }

  const handlePolygonRightClick = (
    polygon: google.maps.Polygon,
    event: any,
  ) => {
    console.log('Event=', event)
    let path = polygon.getPath()
    let removeVertex: boolean = false

    for (let i = 0; i < path.getLength(); i++) {
      if (event.latLng == path.getAt(i)) {
        removeVertex = true
      }
    }

    hideInfoWindow()
    setContextMenu({
      position: { x: event.domEvent.clientX, y: event.domEvent.clientY },
      polygon,
      showDeletePolygon: !removeVertex,
      showDeleteVertex: removeVertex,
      latLng: event.latLng,
    })
  }

  function addEventListenersToPolygon(
    polygon: google.maps.Polygon,
    featureProperties: any,
    gMap: google.maps.Map,
  ) {
    polygon.addListener('set_at', updateGeoJSON)
    polygon.addListener('insert_at', updateGeoJSON)
    polygon.addListener('remove_at', updateGeoJSON)
    polygon.addListener('dragend', updateGeoJSON)

    polygon.addListener('click', (event: any) => {
      handlePolygonClick(polygon, event)
    })

    // Add the right-click event listener to delete the polygon
    polygon.addListener('rightclick', (event: any) => {
      handlePolygonRightClick(polygon, event)
    })
  }

  const addEditablePolygons = (
    gMap: google.maps.Map,
    geoJson: { features: any[] } | undefined,
  ) => {
    let newPolygons: google.maps.Polygon[] = []

    if (!geoJson || !geoJson.features) {
      return
    }

    geoJson.features.forEach(feature => {
      const paths = feature.geometry.coordinates.map((ring: any[]) =>
        ring.map(coord => ({ lat: coord[1], lng: coord[0] })),
      )

      const polygon = new window.google.maps.Polygon({
        paths: paths,
        map: gMap,
        fillColor: feature.properties.fillColor || '#FF0000',
        fillOpacity: feature.properties.fillOpacity || 0.5,
        strokeColor: feature.properties.strokeColor || '#000000',
        strokeWeight: feature.properties.strokeWidth || 2,
        editable: true,
        draggable: true,
      })

      polygon.set('name', feature.properties.name)
      polygon.set('description', feature.properties.description)

      // Add event listeners for editing, moving, and deleting the polygon
      addEventListenersToPolygon(polygon, feature.properties, gMap)
      newPolygons.push(polygon)
    })

    setPolygons(newPolygons)
  }

  useEffect(() => {
    console.log('Rendering once')

    if (mapRef.current) {
      const opt = {
        ...mapOptions,
        center: center,
        mapTypeId: google.maps.MapTypeId.SATELLITE, // Add this line
      }

      console.log('Map Options=', opt)
      console.log('Center', center)
      const gMap = new window.google.maps.Map(mapRef.current, opt)
      setMap(gMap)

      addEditablePolygons(gMap, fieldBoundaries)
    }
  }, [center])

  useEffect(() => {
    // Add a click listener to the document
    document.addEventListener('mousedown', handleDocumentClick)
    let mapClickListener: google.maps.MapsEventListener

    if (map) {
      // Add a click listener to the map
      mapClickListener = map.addListener('click', handleDocumentClick)

      const manager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          editable: true,
          draggable: true,
        },
      })

      manager.setMap(map)

      // Listen for polygon complete event
      window.google.maps.event.addListener(
        manager,
        'polygoncomplete',
        (polygon: google.maps.Polygon) => {
          polygon.setOptions({
            fillColor: 'red',
            fillOpacity: 0.5,
            strokeColor: 'red',
            strokeWeight: 1,
          })

          // Add event listeners for editing, moving, and deleting the polygon
          const featureProperties = { name: '', description: '' }
          addEventListenersToPolygon(polygon, featureProperties, map)

          const updatedPolygons = [...polygonsRef.current, polygon]
          setPolygons(updatedPolygons)
          polygonsRef.current = updatedPolygons

          updateGeoJSON()
        },
      )

      setDrawingManager(manager)
    }

    return () => {
      console.log('Unmounted')
      // Remove the click listener from the document
      document.removeEventListener('click', handleDocumentClick)

      // Remove the click listener from the map (if it exists)
      if (mapClickListener) {
        window.google.maps.event.removeListener(mapClickListener)
      }

      if (drawingManager) {
        drawingManager.setMap(null)
      }
    }
  }, [map])

  const updateGeoJSON = () => {
    const newFeatures: GeoJSON.Feature<GeoJSON.Polygon>[] = []

    // Iterate over all the polygons on the map
    polygonsRef.current.forEach(polygon => {
      // Use polygonsRef.current here
      console.log('Polygon: ', polygon)
      const coordinates = polygon
        .getPath()
        .getArray()
        .map(latLng => [latLng.lng(), latLng.lat()])

      newFeatures.push({
        type: 'Feature',
        properties: {
          name: polygon.get('name'),
          description: polygon.get('description'),
        },
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      })
    })

    // Call the onUpdate function here
    onUpdate({
      type: 'FeatureCollection',
      features: newFeatures,
    })
  }

  return (
    <>
      <button
        className="absolute top-4 left-4 p-2 bg-white rounded"
        onClick={() => {
          if (deletedObjects.length > 0) {
            const lastDeletedObject = deletedObjects[deletedObjects.length - 1]
            if (lastDeletedObject.type === 'vertex') {
              const polygon = lastDeletedObject.data.getPolygon()
              const path = polygon.getPath()
              path.insertAt(lastDeletedObject.index, lastDeletedObject.data)
            } else if (lastDeletedObject.type === 'polygon') {
              lastDeletedObject.data.setMap(map)
            }
            setDeletedObjects(deletedObjects.slice(0, -1))
            updateGeoJSON()
          }
        }}
      >
        Undo
      </button>

      <Box ref={mapRef} sx={{ flexGrow: 1, height: '100%' }} />

      {contextMenu && (
        <CustomContextMenu
          polygon={contextMenu.polygon}
          latLng={contextMenu.latLng}
          deletePolygonEnabled={contextMenu.showDeletePolygon}
          deleteVertexEnabled={contextMenu.showDeleteVertex}
          onDeleteVertex={deleteVertex}
          onDeleteField={deletePolygon}
          onClose={hideContextMenu}
          location={{
            x: contextMenu.position.x,
            y: contextMenu.position.y,
          }}
          parentSize={mapRef.current?.getBoundingClientRect() || new DOMRect()}
          style={{
            position: 'absolute',
            left: contextMenu.position.x,
            top: contextMenu.position.y,
          }}
        />
      )}

      {customInfoBox && (
        <CustomInfoBox
          key={`${customInfoBox.polygon.get(
            'name',
          )}-${customInfoBox.polygon.get('description')}`}
          polygon={customInfoBox.polygon}
          position={customInfoBox.position}
          parentSize={mapRef.current?.getBoundingClientRect() || new DOMRect()}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default FieldMap
