import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from '../../utilities/canvasPreview'
import { useDebounceEffect } from '../../utilities/useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { Button, Slider, TextField, Typography } from '@mui/material'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageEditor() {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    /*
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
    */

    const { naturalWidth: width, naturalHeight: height } = e.currentTarget

    console.log(`Width: ${width} Height: ${height}`)
    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: 'px',
          width: 256,
          height: 256,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    )

    setCrop(crop)
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    const targetWidth = 256
    const targetHeight = 256
    const resizedCanvas = document.createElement('canvas')
    resizedCanvas.width = targetWidth
    resizedCanvas.height = targetHeight
    const ctx = resizedCanvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get 2d context')
    }

    ctx.drawImage(
      previewCanvasRef.current,
      0,
      0,
      previewCanvasRef.current.width,
      previewCanvasRef.current.height,
      0,
      0,
      targetWidth,
      targetHeight,
    )

    resizedCanvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      hiddenAnchorRef.current!.href = blobUrlRef.current
      hiddenAnchorRef.current!.click()
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  const handleSliderChange = (event: Event, newValue: any) => {
    setScale(newValue / 100)
  }

  return (
    <div>
      <div className="flex flex-col">
        <Button variant="contained" component="label">
          Select Avatar
          <input type="file" hidden onChange={onSelectFile} />
        </Button>
        <div>
          <Typography id="input-slider">Scale</Typography>
          <Slider
            defaultValue={100}
            min={10}
            max={300}
            step={10}
            value={Math.round(scale * 100)}
            onChange={handleSliderChange}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <TextField
            id="outlined-number"
            label="Rotate"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
      </div>
      <div className="md:flex md:flex-row">
        <div className="flex flex-grow justify-center items-center">
          {!!imgSrc && (
            <ReactCrop
              maxHeight={256}
              maxWidth={256}
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img
                className="max-h-64"
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{
                  maxHeight: 256,
                  maxWidth: 256,
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        <div className="flex flex-grow justify-center items-center">
          {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: 256,
                    height: 256,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {!!completedCrop && (
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <a
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
