import { useEffect, useMemo, useState, useRef, MouseEventHandler } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { createAvatar } from '@dicebear/core'
import { bottts, lorelei } from '@dicebear/collection'
import ImageEditor from '../ImageEditor/ImageEditor'
import { IconButton } from '@mui/material'
import { Autorenew, Edit } from '@mui/icons-material'

const defaultAvatars = [
  'Gizmo',
  'Zoey',
  'Whiskers',
  'Oscar',
  'Pumpkin',
  'Snowball',
  'Zoe',
  'Midnight',
  'Simba',
  'Mimi',
  'Oliver',
  'Sammy',
  'Callie',
  'Cali',
  'Willow',
  'Lilly',
  'Mittens',
  'Spooky',
  'Jasmine',
  'Ginger',
]

const rndDefaultAvatar = Math.floor(Math.random() * (defaultAvatars.length - 1))

const AvatarPicker = () => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [defaultAvatarId, setDefaultAvatarId] = useState(rndDefaultAvatar)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    setAvatar(
      createAvatar(bottts, {
        seed: defaultAvatars[defaultAvatarId],
        backgroundColor: ['b6e3f4'],
        //skinColor: ['c0aede'],
      }).toDataUriSync(),
    )
  }, [defaultAvatarId])

  useEffect(() => {
    setZoom(true)
    const timer = setTimeout(() => {
      setZoom(false)
    }, 300) // Duration should match the transition duration

    return () => clearTimeout(timer)
  }, [activeStep])

  function reloadAvatar() {
    const rand = Math.floor(Math.random() * (defaultAvatars.length - 1))
    setDefaultAvatarId(rand)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-grow justify-center items-center text-center">
            <div className="overflow-hidden rounded-full">
              <img
                src={avatar}
                className="h-32 w-32 object-cover"
                alt="Avatar"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <IconButton aria-label="another avatar" onClick={reloadAvatar}>
              <Autorenew />
            </IconButton>
            <IconButton aria-label="Edit">
              <Edit />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvatarPicker
