import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { CheckBoxOutlineBlankTwoTone } from '@mui/icons-material'

type HeaderCheckboxProps = {
  numSelected: number
  rowCount: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HeaderCheckbox: React.FC<HeaderCheckboxProps> = ({
  numSelected,
  rowCount,
  onSelectAllClick,
}) => {
  return (
    <Checkbox
      sx={{
        opacity: theme =>
          numSelected > 0 ? 1 : theme.palette.action.hoverOpacity,
        '&:hover': {
          opacity: 1,
        },
      }}
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={onSelectAllClick}
      inputProps={{ 'aria-label': 'Select all' }}
      icon={
        numSelected === 0 ? (
          <CheckBoxOutlineBlankTwoTone />
        ) : (
          <IndeterminateCheckBoxIcon />
        )
      }
    />
  )
}

export default HeaderCheckbox
