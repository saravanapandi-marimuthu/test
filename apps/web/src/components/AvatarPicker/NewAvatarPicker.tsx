import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Typography,
} from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import AvatarEditor from 'react-avatar-editor'

type AvatarPickerProps = {
  url?: string
  onAvatarChange: (avatar: string) => void
}

const NewAvatarPicker: React.FC<AvatarPickerProps> = ({
  url,
  onAvatarChange,
}) => {
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | undefined>(
    undefined,
  )
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [scale, setScale] = useState(1)
  const editorRef = useRef<AvatarEditor | null>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (url) {
      setPreview(url)
    }
  }, [url])

  const handlePickImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file.size > 1024 * 1024) {
        setInfo('File size must be under 1 MB.')
      } else {
        setInfo(undefined)
        setImage(file)
      }
    }
  }

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL()
      setCroppedImage(canvas)
      setPreview(canvas)
      onAvatarChange(canvas)
    }
    handleClose()
  }

  const handleScale = (event: any, newValue: number | number[]) => {
    setScale(newValue as number)
  }

  return (
    <Box position="relative" width={128} height={128}>
      <Avatar
        src={preview}
        sx={{ width: '128px', height: '128px', position: 'relative' }}
      />
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          backgroundColor: 'background.paper',
          borderRadius: '50%',
          border: 1,
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Avatar</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            width={280}
            height={280}
            border={1}
            borderColor="divider"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {image && (
              <AvatarEditor
                ref={editorRef}
                image={croppedImage ? croppedImage : URL.createObjectURL(image)}
                width={256}
                height={256}
                borderRadius={128}
                scale={scale}
              />
            )}
          </Box>
          <Box mt={8}>
            <Button variant="contained" component="label">
              Pick an image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePickImage}
              />
            </Button>
          </Box>
          <Box mt={2} width={80}>
            <Slider
              value={scale}
              min={1}
              max={3}
              step={0.01}
              onChange={handleScale}
              aria-labelledby="scale-slider"
              sx={{ width: '100%' }}
            />
          </Box>
          <Box mt={2}>{!!info && <Alert severity="warning">{info}</Alert>}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default NewAvatarPicker
