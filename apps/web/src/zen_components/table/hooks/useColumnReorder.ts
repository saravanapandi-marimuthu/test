import { useState } from 'react'

type ColumnOrderType = number[]

export const useColumnReorder = (initialOrder: ColumnOrderType) => {
  const [order, setOrder] = useState<ColumnOrderType>(initialOrder)

  const onColumnDragStart = (event: React.DragEvent<HTMLTableCellElement>) => {
    const index = parseInt(event.currentTarget.dataset.index ?? '0')
    event.dataTransfer.setData('text/plain', index.toString())
  }

  const onColumnDrop = (event: React.DragEvent<HTMLTableCellElement>) => {
    const from = parseInt(event.dataTransfer.getData('text/plain'))
    const to = parseInt(event.currentTarget.dataset.index ?? '0')

    const newOrder = [...order]
    const [movedItem] = newOrder.splice(from, 1)
    newOrder.splice(to, 0, movedItem)

    setOrder(newOrder)
  }

  return { order, onColumnDragStart, onColumnDrop }
}
