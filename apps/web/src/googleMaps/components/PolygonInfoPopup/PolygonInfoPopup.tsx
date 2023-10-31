// PolygonInfoPopup.js
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Paper, Stack, Typography } from '@mui/material'
import { PolygonInfo } from '../../types'
import AreaIcon from '../../../icons/components/AreaIcon/AreaIcon'
import { MapPin as MapPinIcon } from '@phosphor-icons/react'

export interface PolygonInfoPopupProps {
  onSave: (polygonData: PolygonInfo | null) => void
  polygon: google.maps.Polygon
}

const PolygonInfoPopup = (props: PolygonInfoPopupProps) => {
  const { onSave: onClose, polygon } = props
  const [area, setArea] = useState(0)
  const [center, setCenter] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    if (!polygon) return

    // Calculate the center of the polygon and get the gps coordinates
    const center = polygon
      .getPath()
      .getArray()
      .reduce(
        (acc, cur) => {
          acc.lat += cur.lat()
          acc.lng += cur.lng()
          return acc
        },
        { lat: 0, lng: 0 },
      )

    const centerLatLng = {
      lat: parseFloat((center.lat / polygon.getPath().getLength()).toFixed(4)),
      lng: parseFloat((center.lng / polygon.getPath().getLength()).toFixed(4)),
    }

    setCenter(centerLatLng)

    setFormData({
      name: polygon.get('name') || '',
      description: polygon.get('description') || '',
    })

    const areaInSquareMeters = google.maps.geometry.spherical.computeArea(
      polygon.getPath(),
    )
    const areaInAcres = areaInSquareMeters / 4046.86
    const roundedAreaInAcres = parseFloat(areaInAcres.toFixed(2))
    setArea(roundedAreaInAcres)
  }, [polygon])

  const [formData, setFormData] = useState<PolygonInfo>({
    name: polygon.get('name') || '',
    description: polygon.get('description') || '',
  })

  const handleSave = () => {
    onClose(formData)
  }

  return (
    <Paper sx={{ opacity: 0.8, padding: 1 }}>
      <Typography>Edit Polygon</Typography>
      <Stack spacing={1}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <AreaIcon
            sx={{
              width: 22,
              height: 22,
            }}
          />
          <Typography
            variant="overline"
            color="text.secondary"
            //fontWeight={'bold'}
          >
            {area} acres
          </Typography>
          <MapPinIcon size={22} />
          <Typography variant="overline" color="text.secondary">
            ({center.lat}, {center.lng})
          </Typography>
        </Stack>
      </Stack>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Paper>
  )
}

export default PolygonInfoPopup
