import { PopoverVirtualElement } from '@mui/material'

export interface RowAction {
  label: string
  action: (data: any) => void
}

export type RowActionMenuProps<T> = {
  rowData: T
  showMenu: boolean
  onCloseMenu: () => void
  anchorEl:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined

  actions?: RowAction[]
}

export type RowActionMenuComponent<T> = React.ComponentType<
  RowActionMenuProps<T>
>
