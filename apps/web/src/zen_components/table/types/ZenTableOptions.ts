import { RowAction, RowActionMenuComponent } from './RowActionMenu'

export type ZenTableOptions<T> = {
  pageSize?: number
  currentPage?: number
  totalCount?: number
  sortBy?: string
  sortDesc?: boolean
  searchFilter: string
  rowContextMenuEnabled?: boolean
  lassoSelectEnabled?: boolean
  rowReorderEnabled?: boolean
  onRowContextMenu?: (event: React.MouseEvent, rowData: T) => void
  onRowSelect?: (rowData: T) => void
  onSortChange?: (sortBy: string, isDescending: boolean) => void
  onPageChange?: (page: number) => void
  rowActionMenu?: RowActionMenuComponent<T>
  rowActions?: RowAction[]
}
