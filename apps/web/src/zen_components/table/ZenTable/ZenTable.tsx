import React, { useState } from 'react'
import {
  Box,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'

import { useColumnReorder } from '../hooks/useColumnReorder'
import { useRowReorder } from '../hooks/useRowReorder'
import HeaderCheckbox from '../HeaderCheckbox/HeaderCheckbox'
import { useLassoSelect } from '../hooks/useLassoSelect'
import { useThemeMode } from '../../../contexts/ThemeContext'
import { LassoContainer } from './LassoContainer'
import { StyledTableRow } from './StyledTableRow'
import { StyledTableCell } from './StyledTableCell'
import { CheckboxWrapper } from './CheckboxWrapper'
import RowActions from '../QuickActions/RowActions'
import { ZenTableColumn, SortDirection } from '../types/ZenTableColumn'
import { ZenTableOptions } from '../types/ZenTableOptions'

type ZenTableProps<T> = {
  data: T[]
  idField: string
  columns: ZenTableColumn<T>[]
  options: ZenTableOptions<T>
}

function ZenTable<T>({ data, columns, options, idField }: ZenTableProps<T>) {
  const [sortedColumn, setSortedColumn] = useState({
    name: options.sortBy ?? '',
    direction: options.sortDesc ? SortDirection.DESC : SortDirection.ASC,
  })

  const initialColumnOrder = columns.map((_, index) => index) || []
  const {
    order: columnOrder,
    onColumnDragStart,
    onColumnDrop,
  } = useColumnReorder(initialColumnOrder)

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const { theme } = useThemeMode()

  const onUpdateSelectedRows = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows)
  }

  const {
    updatedRowData,
    selectedRowsRef,
    onRowSelect,
    onRowDragStart,
    onRowDrop,
    dropPosition,
    onRowDragOver,
    onRowDragEnd,
    onRowSelectAll,
  } = useRowReorder(
    data,
    idField,
    selectedRows,
    setSelectedRows,
    options.rowReorderEnabled,
  )

  const {
    isLassoActive,
    lassoStartPoint,
    lassoEndPoint,
    lassoContainerRef,
    lassoRectangleRef,
    startLasso,
    updateLasso,
    endLasso,
  } = useLassoSelect(onUpdateSelectedRows, options.lassoSelectEnabled)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowSelectAll(event.target.checked)
  }

  const handleSort = (columnName: string) => {
    let newSortDirection = SortDirection.ASC

    if (sortedColumn.name === columnName) {
      newSortDirection = (sortedColumn.direction + 1) % 3 // Cycle through SortDirection
    } else {
      setSortedColumn({ name: columnName, direction: SortDirection.ASC })
    }

    setSortedColumn({ name: columnName, direction: newSortDirection })

    const sortColumn = newSortDirection === SortDirection.NONE ? '' : columnName
    const isDescending = newSortDirection === SortDirection.DESC
    options.onSortChange?.(sortColumn, isDescending)
  }

  return (
    <>
      <Stack direction="column" spacing={1}>
        <LassoContainer
          ref={lassoContainerRef}
          onMouseDown={startLasso}
          onMouseMove={updateLasso}
          onMouseUp={endLasso}
          sx={{ userSelect: isLassoActive ? 'none' : 'auto' }}
        >
          <Box
            ref={lassoRectangleRef}
            sx={{
              padding: 0,
              position: 'absolute',
              top: Math.min(lassoStartPoint?.y ?? 0, lassoEndPoint?.y ?? 0),
              left: Math.min(lassoStartPoint?.x ?? 0, lassoEndPoint?.x ?? 0),
              width: Math.abs(
                (lassoEndPoint?.x ?? 0) - (lassoStartPoint?.x ?? 0),
              ),
              height: Math.abs(
                (lassoEndPoint?.y ?? 0) - (lassoStartPoint?.y ?? 0),
              ),
              backgroundColor: 'rgba(0, 120, 250, 0.1)', // Lasso color
              border: '1px dashed rgba(0, 120, 250, 0.7)', // Lasso border color
            }}
          />
          <Table
            size="small"
            sx={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 'none', width: '50px' }} />
                <TableCell sx={{ width: '50px' }}>
                  <HeaderCheckbox
                    numSelected={selectedRows.length}
                    rowCount={data.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                </TableCell>
                {columnOrder.map((colIndex: number) => {
                  const column = columns[colIndex]
                  const HeaderComponent = column.HeaderComponent
                  let isSorted = column.name === sortedColumn.name
                  const sortDirection = sortedColumn.direction

                  if (sortDirection === SortDirection.NONE) {
                    isSorted = false
                  }

                  return (
                    <TableCell
                      key={colIndex}
                      draggable
                      onDragStart={onColumnDragStart}
                      onDragOver={e => e.preventDefault()}
                      onDrop={onColumnDrop}
                      data-index={colIndex}
                      width={column.width ?? 'auto'}
                      sx={{
                        overflow: 'hidden',
                        maxWidth: column.width ?? 'auto',
                      }}
                    >
                      <HeaderComponent
                        sortable={column.sortable}
                        isSorted={isSorted}
                        sortDirection={sortDirection}
                        onSort={() => handleSort(column.name)}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedRowData.map(row => {
                const key = String(row[idField])
                return (
                  <StyledTableRow
                    key={String(key)}
                    draggable={
                      options.rowReorderEnabled && selectedRows.includes(key)
                    }
                    onDragStart={onRowDragStart}
                    onDragOver={e => onRowDragOver(e, key)}
                    onDragEnd={onRowDragEnd}
                    onDrop={onRowDrop}
                    data-id={key}
                    sx={{
                      backgroundColor: selectedRows.includes(key)
                        ? theme.palette.action.selected
                        : theme.palette.background.default,
                      borderTop:
                        dropPosition?.id === key &&
                        dropPosition?.position === 'above'
                          ? '2px solid blue'
                          : undefined,
                      borderBottom:
                        dropPosition?.id === key &&
                        dropPosition?.position === 'below'
                          ? '2px solid blue'
                          : undefined,
                    }}
                  >
                    <TableCell
                      sx={{
                        maxWidth: '50px',
                        padding: '0px',
                        border: 'none',
                      }}
                    >
                      <RowActions
                        rowData={row as any}
                        menuButtonVisible={options.rowContextMenuEnabled}
                        grabButtonVisible={options.rowReorderEnabled}
                        onGrabButtonDown={() =>
                          !selectedRows.includes(key) && onRowSelect(key)
                        }
                        onGrabButtonUp={() =>
                          selectedRows.includes(key) && onRowSelect(key)
                        }
                        rowActionMenu={options.rowActionMenu}
                        rowActions={options.rowActions}
                      />
                    </TableCell>
                    <StyledTableCell sx={{}}>
                      <CheckboxWrapper className="checkbox-wrapper">
                        <Checkbox
                          checked={selectedRows.includes(key)}
                          onClick={() => onRowSelect(key)}
                          sx={{ borderRadius: 1 }}
                        />
                      </CheckboxWrapper>
                    </StyledTableCell>
                    {columnOrder.map(colIndex => {
                      const column = columns[colIndex]

                      const CellComponent = column.CellComponent
                      return (
                        <TableCell
                          width={columns[colIndex].width ?? 'auto'}
                          key={colIndex}
                          sx={{
                            borderLeft: 1,
                            borderRight: 1,
                            borderColor: 'divider',
                            maxWidth: column.width ?? 'auto',
                            overflow: 'hidden',
                          }}
                        >
                          <CellComponent rowData={row} />
                        </TableCell>
                      )
                    })}
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </LassoContainer>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
        >
          <TablePagination
            component="div"
            count={options.totalCount ?? 0}
            page={options.currentPage ?? 0}
            onPageChange={(event, page) => options.onPageChange?.(page)}
            rowsPerPage={options.pageSize ?? 0}
            onRowsPerPageChange={() => {}}
          />
        </Box>
      </Stack>
      <Box
        ref={selectedRowsRef}
        sx={{
          overflow: 'auto',
          position: 'fixed',
          top: '9999px',
          left: '9999px',
          bgcolor: 'background.transparent',
          width: '100vw',
          padding: '50px',
          paddingTop: '30px',
          paddingRight: '270px',
        }}
      >
        <Paper>
          <Table
            size="small"
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <TableBody>
              {updatedRowData
                .filter(r => selectedRows.includes(String(r[idField])))
                .map(row => {
                  const key = String(row[idField])
                  return (
                    <TableRow
                      key={key}
                      data-id={key}
                      sx={{
                        paddingTop: 0,
                      }}
                    >
                      {columnOrder.map(colIndex => {
                        const CellComponent = columns[colIndex].CellComponent

                        return (
                          <TableCell
                            key={colIndex}
                            sx={{
                              minWidth: '100px',
                            }}
                          >
                            <CellComponent rowData={row} />
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  )
}

export default ZenTable
