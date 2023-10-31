import React from 'react'
import './checkboxMouseArea.css'

interface CheckboxMouseArea {
  isSelected: boolean
  index: number
  handleClick: () => void
}

export const CheckboxMouseArea: React.FC<CheckboxMouseArea> = ({
  isSelected = false,
  index = 0,
  handleClick = () => {},
}) => {
  return (
    <div className="selected-chb-wrapper" onClick={handleClick}>
      <label
        className={`selected-chb-label ${isSelected && 'active'}`}
        htmlFor={`label-${index}`}
      />
      <input
        className="select-input"
        id={`label-${index}`}
        type={'checkbox'}
        checked={isSelected}
      />
    </div>
  )
}
