import { MUIDataTableColumn } from 'mui-datatables'

export interface DataFlexModal {
  id?: string | number
  title: string
}

export interface SizeModal {
  stateModal?: 'max' | 'reg' | 'min'
}

export interface StateModal extends SizeModal {
  id?: string | number | null
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface Column extends MUIDataTableColumn {
  label: string
}
