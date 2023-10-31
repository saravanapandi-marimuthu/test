import { useContext } from 'react'
import { GoogleMapsContext } from '../components/GoogleMapsProvider/GoogleMapsProvider'

/**
 * Hook to get global map instance
 */
export const useGoogleMap = (): google.maps.Map | undefined =>
  useContext(GoogleMapsContext)?.map
