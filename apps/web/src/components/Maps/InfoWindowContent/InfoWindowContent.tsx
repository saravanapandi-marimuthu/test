// InfoWindowContent.tsx
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

interface InfoWindowContentProps {
  polygon: google.maps.Polygon
  name: string
  description: string
  onSave: (
    polygon: google.maps.Polygon,
    name: string,
    description: string,
  ) => void
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  polygon,
  name,
  description,
  onSave,
}) => {
  const [newName, setNewName] = useState(name || '')
  const [newDescription, setNewDescription] = useState(description || '')

  const handleSave = () => {
    onSave(polygon, newName, newDescription)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-grow p-2">
        <TextField
          label="Name"
          size="small"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div className="flex-grow p-2">
        <TextField
          size="small"
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div className="flex-grow p-2 text-right">
        <Button size="small" variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default InfoWindowContent
