import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useSpring, animated } from '@react-spring/web'
import { useThemeMode } from '../../../contexts/ThemeContext'
import { IconButton, Stack } from '@mui/material'
import { X } from '@phosphor-icons/react'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

interface FlexModal {
  title?: string
  children?: React.ReactNode
  width?: string
  height?: string
  open: boolean
  handleClose(): void
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true)
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

export const FlexModal: React.FC<FlexModal> = ({
  title = '',
  width = 'auto',
  height = 'auto',
  children,
  open,
  handleClose,
}) => {
  const { theme } = useThemeMode()
  const isDarkMode = theme.palette.mode === 'dark'

  const styleContainer = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    height: height,
    borderRadius: '6px',
    boxShadow: '0px 4px 9px #171a1f, 0px 0px 2px #171a1f',
    background: isDarkMode ? 'black' : '#fff',
    padding: 2,
    transition: '0.5s',
  }

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styleContainer}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            mb={2}
          >
            <Typography variant="h6" color="text.secondary" fontWeight={'bold'}>
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <X size={16} />
            </IconButton>
          </Stack>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}
