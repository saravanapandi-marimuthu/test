import { FormControlLabel, Switch, Typography, styled } from '@mui/material'
import React from 'react'

export const SplitSwitch = styled(Switch)(({ theme }) => ({
  padding: 6,
  '& .MuiSwitch-track': {
    width: '100%',
    borderRadius: 32 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" viewBox="0 0 256 256"><path d="M229.66,189.66l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L184,196.69V139.31l-56-56-56,56v57.38l18.34-18.35a8,8,0,0,1,11.32,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L56,196.69V136a8,8,0,0,1,2.34-5.66L120,68.69V24a8,8,0,0,1,16,0V68.69l61.66,61.65A8,8,0,0,1,200,136v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}))

export interface ToggleSwitchProps {
  checked: boolean
  onChange: (state: boolean) => void
  label: string
}

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const { checked, onChange, label } = props
  const [switchState, setSwitchState] = React.useState<boolean>(checked)

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchState(event.target.checked)
    onChange(event.target.checked)
  }

  return (
    <FormControlLabel
      //sx={{ border: '1px solid red' }}
      control={
        <SplitSwitch defaultChecked={checked} onChange={handleSwitchChange} />
      }
      label={
        <Typography
          sx={{ marginBottom: '-6px' }}
          color={'text.secondary'}
          variant="caption"
        >
          {label}
        </Typography>
      }
      labelPlacement="top"
    />
  )
}

export default ToggleSwitch
