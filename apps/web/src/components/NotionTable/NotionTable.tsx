import { useEffect, useMemo, useRef, useState } from 'react'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import {
  Box,
  IconButton,
  Typography,
  Stack,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  Drawer,
  Tooltip,
  ButtonGroup,
  Input,
  TableBody,
} from '@mui/material'
import { MultiSelect } from '../shared/MultiSelect/MultiSelect'
import { useThemeMode } from '../../contexts/ThemeContext'
import {
  DotsSixVertical,
  MagnifyingGlass,
  Plus,
  Trash,
} from '@phosphor-icons/react'
import { ButtonWithPopover } from './ButtonWithPopover'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ReactMouseSelect, TFinishSelectionCallback } from 'react-mouse-select'
import './styleMouseSelect.css'
import { CheckboxMouseArea } from './CheckboxMouseArea/CheckboxMouseArea'

const data: any = [
  {
    id: '123',
    order: 0,
    taskNumber: 1,
    taskName: 'Test name',
    tags: [],
  },
  {
    id: '2222',
    order: 1,
    taskNumber: 2,
    taskName: 'Test name 2',
    tags: [],
  },
  {
    id: '3333',
    order: 2,
    taskNumber: 3,
    taskName: 'Test name 3',
    tags: [],
  },
]

export const NotionTable: React.FC<any> = () => {
  const { updateResizerHeight }: any = useThemeMode()
  const [testData, setTestData] = useState<any>(data)
  const [isDrawer, setIsDrawer] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const selectRef = useRef<HTMLElement>(null)
  const heightAddRow = '34px'

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

  const handleOpenRightPanel = () => {
    setIsDrawer(true)
  }

  const handleDeleteRow = () => {
    const filterData = testData.filter(
      (el: any) => !selectedRows.includes(el.id),
    )
    setTestData(filterData)
    setSelectedRows([])
  }

  const handleAddRowByIndex = (e: any, index: number) => {
    let indAdd = e.altKey ? index : index + 1
    let newObj = {
      id: `${Math.round((Math.random() + Math.random()) * 10000)}`,
      taskNumber: 0,
      taskName: 'Add row by index',
      tags: [],
    }
    const updatedData = [...testData]
    updatedData.splice(indAdd, 0, newObj)
    setTestData(updatedData)
  }

  const handleAddRowFooter = () => {
    setTestData([
      ...testData,
      {
        id: `${Math.round((Math.random() + Math.random()) * 10000)}`,
        taskNumber: 0,
        taskName: 'new name',
        tags: [],
      },
    ])
  }

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const reorderData = reorder(
      testData,
      result.source.index,
      result.destination.index,
    )

    setTestData(reorderData)
  }

  const CustomTableToolbar = useMemo(
    () => (props: any) => {
      return (
        <Box
          sx={{
            position: 'relative',
            marginBottom: '30px',
          }}
        >
          <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
            <Box>
              <Input
                placeholder="Search"
                defaultValue=""
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton aria-label="delete">
                <MagnifyingGlass size={24} />
              </IconButton>
            </Box>
            <Box>
              <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small button group"
              >
                <ButtonWithPopover />
              </ButtonGroup>
            </Box>
          </Stack>
          {!!selectedRows.length && (
            <Box
              className="mouse-select__selectable disabled-bg"
              sx={{
                position: 'absolute',
                top: '100%',
                zIndex: 120,
                background: '#fff !impotant',
                '&"mouse-select__selectable &.selected': {
                  background: '',
                },
              }}
            >
              <ButtonGroup size="small" aria-label="small button group">
                <Button
                  onClick={() => {
                    setSelectedRows([])
                  }}
                >
                  {selectedRows.length} selected
                </Button>
                <Button onClick={() => handleDeleteRow()} aria-label="delete">
                  <Trash size={20} />
                </Button>
                <Button>Three</Button>
                <Button>Four</Button>
                <Button>Five</Button>
              </ButtonGroup>
            </Box>
          )}
        </Box>
      )
    },
    [selectedRows.length],
  )

  const CustomCheckbox = useMemo(
    () => (props: any) => {
      let newProps = Object.assign({}, props)
      return (
        <CheckboxMouseArea
          isSelected={!!selectedRows.length}
          index={0}
          handleClick={() => {
            selectedRows.length
              ? setSelectedRows([])
              : setSelectedRows(
                  testData.map((el: any) => {
                    return el.id
                  }),
                )
          }}
        />
      )
    },
    [selectedRows.length, testData.length],
  )

  const CustomTableBody = (props: any) => {
    return (
      <DragDropContext
        onDragEnd={(r: any) => {
          onDragEnd(r)
        }}
      >
        <Droppable droppableId="table-drop">
          {provided => {
            return (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {testData.map((el: any, index: number) => {
                  const isSelected = selectedRows.includes(testData[index].id)

                  return (
                    <Draggable
                      draggableId={`ID-${index}`}
                      index={index}
                      key={`ID-${index}`}
                    >
                      {(provided, snapshot) => {
                        return (
                          <TableRow
                            className={`mouse-select__selectable ${
                              testData.includes(el.id) ? 'active' : ''
                            }`}
                            data-id={el.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
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
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  position: 'absolute',
                                  right: '100%',
                                  top: 0,
                                  bottom: 0,
                                  margin: 'auto',
                                }}
                              >
                                <Tooltip title={<PlusText />} followCursor>
                                  <IconButton
                                    aria-label="add"
                                    className="add-new-row"
                                    sx={{
                                      opacity: 0,
                                      transition: '0.3s',
                                    }}
                                    size="small"
                                    onClick={e => {
                                      handleAddRowByIndex(e, index)
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
                                    <DotsSixVertical size={16} weight="bold" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                              <CheckboxMouseArea
                                isSelected={isSelected}
                                index={index}
                                handleClick={() => {
                                  if (isSelected) {
                                    return setSelectedRows(
                                      selectedRows.filter(
                                        el => el !== testData[index].id,
                                      ),
                                    )
                                  }
                                  return setSelectedRows([
                                    ...selectedRows,
                                    testData[index].id,
                                  ])
                                }}
                              />
                            </TableCell>

                            <TableCell sx={{ width: '50%' }}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={2}
                              >
                                <Box>{el.taskNumber}</Box>
                                <Button
                                  className="open-right-bar"
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    opacity: 0,
                                    transition: '0.1s',
                                    fontSize: 12,
                                    p: 0,
                                  }}
                                  onClick={() => {
                                    handleOpenRightPanel()
                                  }}
                                >
                                  Open
                                </Button>
                              </Stack>
                            </TableCell>

                            <TableCell sx={{ width: '50%' }}>
                              {el.taskName}
                            </TableCell>
                          </TableRow>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </TableBody>
            )
          }}
        </Droppable>
      </DragDropContext>
    )
  }

  const columns: any[] = [
    {
      name: 'taskNumber',
      label: 'Task Number',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: testData.map((el: any) => {
            return el?.taskNumber
          }),
          display: (
            filterList: any,
            onChange: any,
            index: any,
            column: any,
            filterData: any,
          ) => {
            return (
              <MultiSelect
                label={'Test ID'}
                filterList={filterList}
                onChange={onChange}
                index={index}
                column={column}
                filterData={filterData}
                onConfirm={() => {}}
              />
            )
          },
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex

          return <Typography>{testData[rowIndex].taskNumber}</Typography>
        },
      },
    },
    {
      name: 'taskName',
      label: 'Task Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: testData.map((el: any) => {
            return el?.taskName
          }),
          display: (
            filterList: any,
            onChange: any,
            index: any,
            column: any,
            filterData: any,
          ) => {
            return (
              <MultiSelect
                label={'Task Name'}
                filterList={filterList}
                onChange={onChange}
                index={index}
                column={column}
                filterData={filterData}
                onConfirm={() => {}}
              />
            )
          },
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Typography>{testData[rowIndex].taskName}</Typography>
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'multiselect',
    responsive: 'simple',
    serverSide: true,
    rowsPerPage: 10,
    page: 0,
    rowsPerPageOptions: [10, 25, 50],
    count: 1,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    filter: true,
    download: false,
    print: false,
    searchAlwaysOpen: true,
    selectableRowsHeader: true,
    confirmFilters: true,
    customTableBodyFooterRender: options => {
      const { data, selectableRows, columns } = options

      return (
        <TableFooter
          sx={{
            height: heightAddRow,
          }}
        >
          <TableRow>
            <TableCell colSpan={columns.length + 1}>
              <Button
                variant="text"
                sx={{ width: '100%', justifyContent: 'start' }}
                onClick={() => handleAddRowFooter()}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Plus size={20} />
                  <Box typography={'p'}>Add new field</Box>
                </Stack>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={columns.length + 1}>
              YOU CUSTOM ROW IN FOOTER
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={columns.length + 1}>
              YOU CUSTOM ROW IN FOOTER 2
            </TableCell>
          </TableRow>
        </TableFooter>
      )
    },
  }

  const handleStartSelection = (e: any) => {
    setSelectedRows([])
  }

  const finishSelection: TFinishSelectionCallback = (items, e) => {
    const selectedIds = items
      .map((item: any) => item.getAttribute('data-id') || '')
      .filter(el => !!el)
    setSelectedRows(selectedIds)
  }

  useEffect(() => {
    updateResizerHeight(`calc(100% - ${heightAddRow})`)
  }, [])

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
        <MUIDataTable
          title={''}
          data={testData}
          columns={columns}
          options={options}
          components={{
            Checkbox: CustomCheckbox,
            TableToolbar: CustomTableToolbar,
            TableBody: CustomTableBody,
          }}
        />
        <Drawer
          anchor={'right'}
          open={isDrawer}
          onClose={() => {
            setIsDrawer(false)
          }}
          sx={{ zIndex: 1300 }}
        >
          <Box
            sx={{
              width: '600px',
              p: 2,
            }}
          >
            TEST RIGHT PANNEL
          </Box>
        </Drawer>
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
      </Box>
    </Box>
  )
}
