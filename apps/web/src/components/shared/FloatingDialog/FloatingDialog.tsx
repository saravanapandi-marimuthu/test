import React, { ReactNode, useState, useEffect, useRef } from 'react'
import {
  Paper,
  DialogContent,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
} from '@mui/material'
import { useSpring, animated } from '@react-spring/web'
import { useThemeMode } from '../../../contexts/ThemeContext'

import {
  ArrowsOutSimple as ArrowsOutSimpleIcon,
  ArrowsInSimple as ArrowsInSimpleIcon,
  X as XIcon,
} from '@phosphor-icons/react'

interface FloatingDialogProps {
  children: ReactNode
  isOpen: boolean
  windowIndex?: number
  totalNumberOfWindows?: number
  width?: number
  height?: number
  onClose: () => void
  title: string
}

const FloatingDialog: React.FC<FloatingDialogProps> = ({
  children,
  isOpen,
  windowIndex = 0,
  totalNumberOfWindows = 1,
  width = 600,
  height = 800,
  onClose,
  title,
}) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [actualSize, setActualSize] = useState<any>(null)
  const [minimizedSize, setMinimizedSize] = useState<any>(null)

  const parentRef = useRef(null)

  const { theme } = useThemeMode()

  useEffect(() => {
    setWindowSizes()

    const handleResize = () => {
      setWindowSizes()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowIndex, totalNumberOfWindows, isMinimized])

  const setWindowSizes = () => {
    let windowWidth =
      totalNumberOfWindows === 1
        ? width
        : (window.innerWidth - 10 * (totalNumberOfWindows + 1)) /
          totalNumberOfWindows
    let windowHeight = height

    let leftPosition =
      totalNumberOfWindows === 1
        ? (window.innerWidth - 500) / 2
        : ((window.innerWidth - 10) * windowIndex) / totalNumberOfWindows + 10

    setActualSize({
      top: `${(window.innerHeight - windowHeight) / 2}px`,
      left: `${leftPosition}px`,
      width: `${windowWidth}px`,
      height: `${windowHeight}px`,
    })

    setMinimizedSize({
      top: `${window.innerHeight - 140}px`,
      left: `${
        window.innerWidth - 310 * (windowIndex + 1) - 10 * windowIndex
      }px`,
      width: '300px',
      height: '70px',
    })
  }

  const springProps = useSpring({
    from: isMinimized ? actualSize : minimizedSize,
    to: isMinimized ? minimizedSize : actualSize,
    config: { tension: 210, friction: 20 },
  })

  return isOpen ? (
    <animated.div
      ref={parentRef}
      style={{
        ...springProps,
        position: 'absolute',
        overflow: 'hidden',
        boxShadow: theme.shadows[12],
        borderRadius: '5px',
        padding: 0,
      }}
    >
      <Paper sx={{ boxShadow: 'none', padding: 'none' }}>
        <Box
          minHeight={800}
          display={'flex'}
          alignContent={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <Stack width={'100%'}>
            <Toolbar
              sx={{
                boxShadow: 0,
                margin: 0,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="text.secondary"
                fontWeight={'bold'}
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {title}
              </Typography>

              <IconButton onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? (
                  <ArrowsOutSimpleIcon size={18} />
                ) : (
                  <ArrowsInSimpleIcon size={18} />
                )}
              </IconButton>
              <IconButton onClick={onClose}>
                <XIcon size={18} />
              </IconButton>
            </Toolbar>
            <Box hidden={isMinimized}>
              <Box
                display={'flex'}
                alignContent={'center'}
                justifyContent={'center'}
                width={'100%'}
                padding={0}
              >
                {children}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </animated.div>
  ) : null
}

export default FloatingDialog
