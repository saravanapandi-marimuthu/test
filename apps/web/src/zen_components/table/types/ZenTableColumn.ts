export enum SortDirection {
  NONE,
  ASC,
  DESC,
}

export type ZenTableColumn<T> = {
  name: string
  label?: string
  sortable?: boolean
  width?: string
  HeaderComponent: React.ComponentType<any>
  CellComponent: React.ComponentType<{ rowData: T }>
}
