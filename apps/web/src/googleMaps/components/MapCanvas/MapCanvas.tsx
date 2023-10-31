import React, { forwardRef } from 'react'

import styles from './MapCanvas.module.css'

const MapCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
  (_, ref) => <div ref={ref} className={styles.map} />,
)

export default MapCanvas
