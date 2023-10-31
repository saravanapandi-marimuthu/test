import { debounce } from '@mui/material'
import { useRef, useState } from 'react'

type Rectangle = {
  left: number
  top: number
  right: number
  bottom: number
}

export const useLassoSelect = (onUpdateSelectedRows, lassoSelectEnabled) => {
  const [isLassoActive, setIsLassoActive] = useState(false)
  const [lassoStartPoint, setLassoStartPoint] = useState<{
    x: number
    y: number
  } | null>(null)
  const [lassoEndPoint, setLassoEndPoint] = useState<{
    x: number
    y: number
  } | null>(null)

  const lassoContainerRef = useRef<HTMLDivElement | null>(null)
  const lassoRectangleRef = useRef<HTMLDivElement | null>(null)

  const debouncedUpdateSelection = debounce(updateSelection, 100)

  const intersect = (
    lassoRect: Rectangle,
    rowRect: Rectangle,
    id: string | null,
  ) => {
    const result =
      lassoRect.left < rowRect.right &&
      lassoRect.right > rowRect.left &&
      lassoRect.top < rowRect.bottom &&
      lassoRect.bottom > rowRect.top

    return result
  }

  const startLasso = (event: React.MouseEvent) => {
    if (!lassoSelectEnabled) return

    if (lassoContainerRef.current) {
      const tableElement = lassoContainerRef.current.querySelector('table')

      // Check if the event target is within the table
      if (tableElement?.contains(event.target as Node)) {
        return // Exit early if the mousedown event started within the table
      }

      const rect = lassoContainerRef.current.getBoundingClientRect()

      const adjustedX = event.clientX - rect.left
      const adjustedY = event.clientY - rect.top

      setIsLassoActive(true)
      setLassoStartPoint({ x: adjustedX, y: adjustedY })
      setLassoEndPoint({ x: adjustedX, y: adjustedY })
    }
  }

  const updateLasso = (event: React.MouseEvent) => {
    if (isLassoActive) {
      const rect = lassoContainerRef.current!.getBoundingClientRect()
      const adjustedX = event.clientX - rect.left
      const adjustedY = event.clientY - rect.top

      setLassoEndPoint(prev => {
        debouncedUpdateSelection()
        return { x: adjustedX, y: adjustedY }
      })

      //
    }
  }

  function updateSelection() {
    if (lassoContainerRef.current && lassoStartPoint && lassoEndPoint) {
      const scrollX = lassoContainerRef.current.scrollLeft
      const scrollY = lassoContainerRef.current.scrollTop

      const lassoRect = lassoRectangleRef.current!.getBoundingClientRect()

      const adjustedLassoRect = {
        left: lassoRect.left + scrollX,
        top: lassoRect.top + scrollY,
        right: lassoRect.right + scrollX,
        bottom: lassoRect.bottom + scrollY,
      }

      if (!lassoContainerRef.current) return

      const newSelectedRows: (string | number)[] = []

      const tableRows =
        lassoContainerRef.current.querySelectorAll('tr[data-id]')
      tableRows.forEach(rowElement => {
        const row = rowElement as HTMLElement
        const rowRect = row.getBoundingClientRect()
        const id = row.getAttribute('data-id')

        if (intersect(adjustedLassoRect, rowRect, id)) {
          if (id && !newSelectedRows.includes(id)) {
            newSelectedRows.push(id)
          } else if (id) {
            // Optionally, remove the row from selection if it's already selected
            const idx = newSelectedRows.indexOf(id)
            newSelectedRows.splice(idx, 1)
          }
        }
      })

      onUpdateSelectedRows(newSelectedRows)
    }
  }

  const endLasso = () => {
    setIsLassoActive(false)
    setLassoEndPoint({ x: 0, y: 0 })
    setLassoStartPoint({ x: 0, y: 0 })
  }

  return {
    isLassoActive,
    lassoStartPoint,
    lassoEndPoint,
    lassoContainerRef,
    lassoRectangleRef,
    startLasso,
    updateLasso,
    endLasso,
  }
}
