import { useState } from 'react'
import { OverlayItem, OverlayType } from '../types'

const setMap = (lastState: OverlayItem, map: google.maps.Map | null) => {
  let item:
    | google.maps.Polygon
    | google.maps.Circle
    | google.maps.Rectangle
    | google.maps.Polyline
    | google.maps.Marker
    | null = null

  switch (lastState.overlayItemType) {
    case OverlayType.POLYGON:
      item = lastState.overlayItem as google.maps.Polygon | null
      break
    case OverlayType.CIRCLE:
      item = lastState.overlayItem as google.maps.Circle | null
      break
    case OverlayType.RECTANGLE:
      item = lastState.overlayItem as google.maps.Rectangle | null
      break
    case OverlayType.POLYLINE:
      item = lastState.overlayItem as google.maps.Polyline | null
      break
    case OverlayType.MARKER:
      item = lastState.overlayItem as google.maps.Marker | null
      break
  }

  item?.setMap(map)
}

const useDrawingHistory = (map: google.maps.Map | undefined) => {
  // Unified history and future stacks
  const [history, setHistory] = useState<OverlayItem[]>([])
  const [future, setFuture] = useState<OverlayItem[]>([])

  const addOverlayToHistory = (overlayItem: OverlayItem) => {
    if (!overlayItem.overlayItem) return

    setHistory(prevHistory => {
      return [...prevHistory, overlayItem]
    })
  }

  const undo = () => {
    setHistory(prevHistory => {
      if (prevHistory.length === 0) return prevHistory

      const newHistory = [...prevHistory]
      const lastState = newHistory.pop()

      if (!lastState) return prevHistory

      setMap(lastState, null)
      setFuture(prevFuture => [...prevFuture, lastState])

      console.log(
        'Undo history length',
        newHistory.length,
        'future length',
        future.length,
      )

      return newHistory
    })
  }

  const redo = () => {
    setFuture(prevFuture => {
      if (prevFuture.length === 0) return prevFuture

      const newFuture = [...prevFuture]
      const nextState = newFuture.pop()

      if (!nextState) return prevFuture

      setMap(nextState, map ?? null)
      setHistory(prevHistory => [...prevHistory, nextState])

      console.log(
        'Undo history length',
        history.length,
        'future length',
        newFuture.length,
      )

      return newFuture
    })
  }

  return { addOverlayToHistory, undo, redo, history, future }
}

export default useDrawingHistory
