import { Typography } from '@mui/material'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface CustomContextMenuProps {
  polygon: google.maps.Polygon
  latLng: any
  location: { x: number; y: number }

  parentSize: DOMRect
  style?: CSSProperties
  deleteVertexEnabled: boolean
  deletePolygonEnabled: boolean
  onDeleteVertex: (polygon: google.maps.Polygon, latLng: any) => void
  onDeleteField: (polygon: google.maps.Polygon) => void
  onClose: () => void
}

const CustomContextMenu: React.FC<CustomContextMenuProps> = ({
  polygon,
  latLng,
  location,
  parentSize,
  style,
  deleteVertexEnabled,
  deletePolygonEnabled,
  onDeleteVertex,
  onDeleteField,
}) => {
  const menuWidth = 150
  const menuHeight = 80

  const [startingScrollX, setStartingScrollX] = useState(0)
  const [startingScrollY, setStartingScrollY] = useState(0)

  const stageCanvasRef = useRef<HTMLDivElement>(null)

  let left = location.x
  let top = location.y

  if (location.x + menuWidth > parentSize.x + parentSize.width) {
    left = location.x - menuWidth
  }

  if (location.y + menuHeight > parentSize.y + parentSize.height) {
    top = location.y - menuHeight - 10
  } else {
    top = location.y + 10
  }

  const positionStyle: CSSProperties = {
    ...style,
    position: 'fixed',
    left: left,
    top: top,
    width: menuWidth,
    height: menuHeight,
  }

  const handleScroll = useCallback(
    (event: any) => {
      if (stageCanvasRef.current) {
        const initialTop = parseFloat(
          stageCanvasRef.current.dataset.initialTop || '0',
        )

        const newTop = top + (startingScrollY - window.scrollY)
        const newTopPx = `${newTop}px`
        stageCanvasRef.current.style.top = newTopPx
      }
    },
    [startingScrollY],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    setStartingScrollX(window.scrollX)
    setStartingScrollY(window.scrollY)
  }, [latLng])

  return (
    <div
      className="bg-white rounded shadow p-2"
      style={positionStyle}
      ref={stageCanvasRef}
      data-initial-top={top}
    >
      <div className="flex flex-col">
        <Typography>{polygon.get('name')}</Typography>
        {deleteVertexEnabled && (
          <button
            className="w-full text-left p-1"
            onClick={() => {
              onDeleteVertex(polygon, latLng)
            }}
          >
            Delete Vertex
          </button>
        )}
        {deletePolygonEnabled && (
          <button
            className="w-full text-left p-1"
            onClick={() => {
              onDeleteField(polygon)
            }}
          >
            Delete Field
          </button>
        )}
      </div>
    </div>
  )
}

export default CustomContextMenu
