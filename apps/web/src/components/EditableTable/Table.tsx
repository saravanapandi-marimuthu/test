import React, { useMemo, useState, useRef, useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ReactMouseSelect, TFinishSelectionCallback } from 'react-mouse-select'
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Tooltip,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material'
import { DotsSixVertical, Plus } from '@phosphor-icons/react'
import {
  useTable,
  useFlexLayout,
  useResizeColumns,
  Column,
  useSortBy,
} from 'react-table'
import Cell from './Cell'
import Header from './Header'
import PlusIcon from './img/Plus'

const defaultColumn: any = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell: Cell,
  Header: Header,
  sortType: 'alphanumericFalsyLast',
}

const Table: React.FC<{
  columns: any
  data: any
  dispatch: any
  setData: any
  skipReset: any
}> = ({ columns, data, setData, dispatch, skipReset }) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const selectRef = useRef<HTMLElement>(null)
  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA: any, rowB: any, columnId: any, desc: any) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1
        }

        return isNaN(rowA.values[columnId])
          ? rowA.values[columnId].localeCompare(rowB.values[columnId])
          : rowA.values[columnId] - rowB.values[columnId]
      },
    }),
    [],
  )

  const handleStartSelection = (e: any) => {
    setSelectedRows([])
  }

  const finishSelection: TFinishSelectionCallback = (items, e) => {
    const selectedIds = items
      .map((item: any) => item.getAttribute('data-id') || '')
      .filter(el => !!el)
    setSelectedRows(selectedIds)
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        ...dispatch,
        columns,
        data,
        defaultColumn,
        autoResetSortBy: !skipReset,
        autoResetFilters: !skipReset,
        autoResetRowState: !skipReset,
        sortTypes,
      },
      useFlexLayout,
      useResizeColumns,
      useSortBy,
    )

  const tooltipPlus = {
    fontSize: 11,
    fontWeight: 600,
    textDecoration: 'underline',
  }

  const PlusText: React.FC = () => {
    return (
      <Box>
        <Typography
          sx={{
            fontSize: 10,
          }}
        >
          <Box component={'span'} sx={tooltipPlus}>
            Click
          </Box>{' '}
          to add below
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
          }}
        >
          <Box component={'span'} sx={tooltipPlus}>
            Alt+click
          </Box>{' '}
          to add a row above
        </Typography>
      </Box>
    )
  }

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) {
      return
    }

    // if (result.destination.index === result.source.index) {
    //   return
    // }

    const items = Array.from(data)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch({
      type: 'reorder_row',
      data: items,
    })
  }, [])

  const toggleRowSelection = (rowId: number) => {
    setSelectedRows((prevSelected: any) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((el: any) => el !== rowId)
        : [...prevSelected, rowId],
    )
  }

  // function isTableResizing() {
  //   for (let headerGroup of headerGroups) {
  //     for (let column of headerGroup.headers) {
  //       if (column?.isResizing) {
  //         return true
  //       }
  //     }
  //   }

  //   return false
  // }

  return (
    <Box
      sx={{
        padding: '50px',
        height: '100%',
      }}
      ref={selectRef}
    >
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        <table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                <div className="selected-chb-wrapper">
                  <label
                    className={`selected-chb-label ${
                      !!selectedRows.length && 'active'
                    }`}
                    htmlFor={`labelh-${0}`}
                    onClick={() => {
                      selectedRows.length > 0
                        ? setSelectedRows([])
                        : setSelectedRows(
                            data.map((el: any, index: number) => {
                              return index
                            }),
                          )
                    }}
                  />
                  <input
                    className="select-input"
                    id={`labelh-${0}`}
                    type={'checkbox'}
                    checked={!!selectedRows.length}
                  />
                </div>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="table-drop">
                {provided => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {rows.map((row: any, index: number) => {
                        prepareRow(row)
                        const isSelected = selectedRows.includes(index)
                        return (
                          <Draggable
                            draggableId={`row-${index}`}
                            index={index}
                            key={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <TableRow
                                  {...row.getRowProps()}
                                  className={`mouse-select__selectable ${
                                    rows.includes(row.id) ? 'active' : ''
                                  }`}
                                  // data-id={row.id}
                                  data-id={index}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  sx={{
                                    ...provided.draggableProps.style,
                                    position: 'relative',
                                    background: isSelected
                                      ? 'rgba(29,0,255,.08)'
                                      : snapshot.isDragging
                                      ? 'rgba(69, 182, 163, 0.08)'
                                      : '',
                                    ':hover': {
                                      '& .add-new-row, & .open-right-bar, & .drag-row':
                                        {
                                          opacity: 1,
                                        },
                                    },
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      ':hover': {
                                        '& .check-row': {
                                          opacity: 1,
                                        },
                                      },
                                    }}
                                  >
                                    <Stack>
                                      <Tooltip
                                        title={<PlusText />}
                                        followCursor
                                      >
                                        <IconButton
                                          aria-label="add"
                                          className="add-new-row"
                                          sx={{
                                            opacity: 0,
                                            transition: '0.3s',
                                          }}
                                          size="small"
                                          onClick={e => {
                                            console.log(e, index)
                                          }}
                                        >
                                          <Plus size={16} />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip
                                        title={'drag vertical row'}
                                        followCursor
                                      >
                                        <IconButton
                                          aria-label="add"
                                          className="drag-row"
                                          sx={{
                                            opacity: 0,
                                            transition: '0.3s',
                                          }}
                                          size="small"
                                          {...provided.dragHandleProps}
                                        >
                                          <DotsSixVertical
                                            size={16}
                                            weight="bold"
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                    <div className="selected-chb-wrapper">
                                      <label
                                        className={`selected-chb-label ${
                                          isSelected && 'active'
                                        }`}
                                        htmlFor={`label-${index}`}
                                        onClick={() =>
                                          toggleRowSelection(index)
                                        }
                                      />
                                      <input
                                        className="select-input"
                                        id={`label-${index}`}
                                        type={'checkbox'}
                                        checked={isSelected}
                                      />
                                    </div>
                                  </TableCell>
                                  {row.cells.map((cell: any) => (
                                    <TableCell {...cell.getCellProps()}>
                                      {cell.render('Cell')}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </DragDropContext>
            <div
              className="tr add-row"
              onClick={() => dispatch({ type: 'add_row' })}
            >
              <span className="svg-icon svg-gray" style={{ marginRight: 4 }}>
                <PlusIcon />
              </span>
              New
            </div>
          </TableBody>
          <ReactMouseSelect
            containerRef={selectRef}
            itemClassName="mouse-select__selectable"
            saveSelectAfterFinish={true}
            sensitivity={10}
            tolerance={5}
            notStartWithSelectableElements={true}
            startSelectionCallback={handleStartSelection}
            finishSelectionCallback={finishSelection}
          />
        </table>
      </Box>
    </Box>
  )
}

export default Table
