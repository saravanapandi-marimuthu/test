import { MUIDataTableColumn } from 'mui-datatables'
import { MultiSelect } from '../components/shared/MultiSelect/MultiSelect'
interface ProductNameFilterProps {
  filterList: string[][]
  onChange: (
    val: string | string[],
    index: number,
    column: MUIDataTableColumn,
  ) => void
  index: number
  column: MUIDataTableColumn
  filterData: string[][]
  onConfirm: () => void
}

const useProductNameFilter = (
  label: string,
  handleCustomFilterSubmit: () => void,
) => {
  return (
    filterList: string[][],
    onChange: (
      val: string | string[],
      index: number,
      column: MUIDataTableColumn,
    ) => void,
    index: number,
    column: MUIDataTableColumn,
    filterData: string[][],
  ) => {
    return (
      <MultiSelect
        label={label}
        filterList={filterList}
        onChange={onChange}
        index={index}
        column={column}
        filterData={filterData}
        onConfirm={handleCustomFilterSubmit}
      />
    )
  }
}

export default useProductNameFilter
