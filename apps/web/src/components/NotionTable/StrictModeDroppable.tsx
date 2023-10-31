import { useEffect, useState } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState<Boolean>(false)
  const [strMode, setStrMode] = useState<Boolean>(false)

  useEffect(() => {
    if (!strMode) {
      setStrMode(true)
      const animation = requestAnimationFrame(() => setEnabled(true))

      return () => {
        cancelAnimationFrame(animation)
        setEnabled(false)
      }
    }
  }, [])

  // if (!enabled) {
  //   return children
  // }

  return <Droppable {...props}>{children}</Droppable>
}
