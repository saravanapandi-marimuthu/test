import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material'
import { StyledTextField } from '../mui/StyledTextField/StyledTextField'

interface EmailFieldProps {
  value: string
  label?: string
  required?: boolean
  sx?: SxProps<Theme>
  onChange: (value: string) => void
}

const EmailField: React.FC<EmailFieldProps> = ({
  value,
  label = 'Email',
  required = false,
  sx,
  onChange,
}) => {
  const [error, setError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string | ''>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value
    onChange(emailValue)

    // Simple email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!emailRegex.test(emailValue)) {
      setError(true)
      setHelperText('Please enter a valid email address')
    } else {
      setError(false)
      setHelperText('')
    }
  }

  return (
    <StyledTextField
      label={label}
      variant="outlined"
      value={value}
      onChange={handleEmailChange}
      autoComplete="email"
      error={error}
      helperText={helperText}
      sx={sx}
      required={required}
    />
  )
}

export default EmailField
