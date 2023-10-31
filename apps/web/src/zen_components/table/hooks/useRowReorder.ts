import { useEffect, useRef, useState } from 'react'

export function useRowReorder<T>(
  initialData: T[],
  idField: string,
  selectedRows,
  setSelectedRows,
  rowReorderEnabled: boolean | undefined,
) {
  const [updatedRowData, setUpdatedRowData] = useState<T[]>(initialData)
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    setUpdatedRowData(initialData)
  }, [initialData])

  const selectedRowsRef = useRef<HTMLDivElement | null>(null)
  const dropPositionRef = useRef<{
    id: string | number
    position: 'above' | 'below'
  } | null>(null)

  const onRowSelect = (id: string) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(rowId => String(rowId) !== String(id))
      }
      return [...prevSelected, id]
    })
  }

  const onRowDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
    if (!rowReorderEnabled) return

    const element = selectedRowsRef.current
    if (!element) return

    console.log(element)

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      const rect = event.currentTarget.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const offsetY = event.clientY - rect.top

      event.dataTransfer.setDragImage(element, offsetX, offsetY)
    }
  }

  const onRowDragOver = (
    event: React.DragEvent<HTMLTableRowElement>,
    id: string,
  ) => {
    if (!rowReorderEnabled) return

    event.preventDefault()

    const rect = event.currentTarget.getBoundingClientRect()
    const relativeY = event.clientY - rect.top

    // If the cursor is in the top half of the row, indicate 'above', else 'below'
    const position = relativeY < rect.height / 2 ? 'above' : 'below'
    dropPositionRef.current = { id, position }
    setForceUpdate(prev => !prev)
  }

  const onRowDrop = (event: React.DragEvent<HTMLTableRowElement>) => {
    if (!rowReorderEnabled) return

    if (!dropPositionRef.current) return

    const targetRowId = String(event.currentTarget.dataset.id)

    let targetIndex = updatedRowData.findIndex(
      row => String(row[idField]) === String(targetRowId),
    )

    if (dropPositionRef.current.position === 'below') {
      targetIndex += 1
    }

    if (selectedRows.length === 0) return // Nothing selected to reorder

    const newOrder = [...updatedRowData]

    // Extract the selected rows from the data and reorder
    const reorderedRows = selectedRows
      .map((rowId: string) =>
        newOrder.find(row => String(row[idField]) === String(rowId)),
      )
      .filter(Boolean) as T[]

    // Remove the reorderedRows from their original positions and adjust target index
    for (const row of reorderedRows) {
      const index = newOrder.findIndex(
        item => String(item[idField]) === String(row[idField]),
      )
      if (index !== -1) {
        newOrder.splice(index, 1)
        if (index < targetIndex) targetIndex-- // Adjust the target index if a row is removed before it
      }
    }

    // Insert the reorderedRows at the target position
    newOrder.splice(targetIndex, 0, ...reorderedRows)

    setUpdatedRowData(newOrder)
    setSelectedRows([]) // Clear selection after reordering
    //setDropPosition(null) // Reset drop position
    dropPositionRef.current = null
    setForceUpdate(prev => !prev)
  }

  const onRowDragEnd = () => {
    //setDropPosition(null) // Reset drop position after drag ends
    dropPositionRef.current = null
    setForceUpdate(prev => !prev)
  }

  const onRowSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedRows(updatedRowData.map(row => row[idField]))
    } else {
      setSelectedRows([])
    }
  }

  const dropPosition = dropPositionRef.current

  return {
    updatedRowData,
    selectedRows,
    selectedRowsRef,
    onRowSelect,
    onRowDragStart,
    onRowDragOver,
    onRowDrop,
    onRowDragEnd,
    dropPosition,
    onRowSelectAll,
  }
}
