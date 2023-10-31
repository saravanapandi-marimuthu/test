import { CSSProperties } from 'react'
import InfoWindowContent from '../InfoWindowContent/InfoWindowContent'

const CustomInfoBox: React.FC<{
  polygon: google.maps.Polygon
  position: { x: number; y: number }
  parentSize: DOMRect
  onSave: (
    polygon: google.maps.Polygon,
    newName: String,
    newDescription: String,
  ) => void
}> = ({ polygon, position, parentSize, onSave }) => {
  const infoBoxWidth = 250
  const infoBoxHeight = 180

  let left = position.x
  let top = position.y

  if (position.x + infoBoxWidth > parentSize.x + parentSize.width) {
    left = position.x - infoBoxWidth
  }

  if (position.y + infoBoxHeight > parentSize.y + parentSize.height) {
    top = position.y - infoBoxHeight
  } else {
    top = position.y
  }

  const positionStyle: CSSProperties = {
    position: 'fixed',
    left: left,
    top: top,
    width: infoBoxWidth,
    height: infoBoxHeight,
  }

  return (
    <div className="bg-white rounded shadow p-2" style={positionStyle}>
      <InfoWindowContent
        polygon={polygon}
        name={polygon.get('name')}
        description={polygon.get('description')}
        onSave={onSave}
      />
    </div>
  )
}

export default CustomInfoBox
