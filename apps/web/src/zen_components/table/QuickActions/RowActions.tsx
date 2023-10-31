import React, { SyntheticEvent, useRef, useState } from 'react'
import {
  DotsSixVertical as DotsSixVerticalIcon,
  DotsThreeVertical as DotsThreeVerticalIcon,
} from '@phosphor-icons/react'
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material'
import { RowAction, RowActionMenuComponent } from '../types/RowActionMenu'

export type RowActionsProps<T> = {
  rowData: T
  menuButtonVisible?: boolean
  grabButtonVisible?: boolean
  onGrabButtonDown: () => void
  onGrabButtonUp: () => void
  rowActionMenu?: RowActionMenuComponent<T>
  rowActions?: RowAction[]
}

function RowActions<T>(props: RowActionsProps<T>) {
  var {
    rowData,
    onGrabButtonDown,
    onGrabButtonUp,
    menuButtonVisible,
    grabButtonVisible,
    rowActionMenu,
    rowActions,
  } = props

  var [menuTooltipOpen, setMenuTooltipOpen] = useState(false)
  var [grabTooltipOpen, setGrabTooltipOpen] = useState(false)
  var [menuOpen, setMenuOpen] = useState(false)

  const theme = useTheme()

  var RowActionMenu = rowActionMenu || (() => null)

  var rowContextMenuButtonRef = useRef<HTMLButtonElement>(null)

  function handleRowMenuClick(event: SyntheticEvent<Element, Event>): void {
    setMenuOpen(true)
  }

  function handleClose(): void {
    setMenuOpen(false)
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={0}
        visibility={'hidden'}
        className="ZenTable-showOnHover"
      >
        {menuButtonVisible && (
          <Tooltip
            title="Click to open menu"
            enterDelay={200}
            disableFocusListener
            open={menuTooltipOpen}
          >
            <IconButton
              ref={rowContextMenuButtonRef}
              sx={{
                padding: 0,
                borderRadius: 1,
                visibility: !menuOpen ? 'unset' : 'visible',
              }}
              size="small"
              onClick={handleRowMenuClick}
              onMouseEnter={() => setMenuTooltipOpen(true)}
              onMouseLeave={() => setMenuTooltipOpen(false)}
            >
              <DotsThreeVerticalIcon size={24} />
            </IconButton>
          </Tooltip>
        )}
        {grabButtonVisible && (
          <Tooltip
            title="Drag to move"
            enterDelay={200}
            disableFocusListener
            open={grabTooltipOpen}
          >
            <IconButton
              hidden={!grabButtonVisible}
              size="small"
              sx={{
                padding: 0,
                borderRadius: 1,
                cursor: 'grab',
              }}
              onMouseDown={onGrabButtonDown}
              onMouseUp={onGrabButtonUp}
              onMouseEnter={() => setGrabTooltipOpen(true)}
              onMouseLeave={() => setGrabTooltipOpen(false)}
            >
              <DotsSixVerticalIcon size={24} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <RowActionMenu
        rowData={rowData}
        actions={rowActions}
        showMenu={menuOpen}
        anchorEl={rowContextMenuButtonRef.current}
        onCloseMenu={handleClose}
      />
    </div>
  )
}

export default RowActions
