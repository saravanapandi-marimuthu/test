import React, { createContext, useEffect, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

export interface GoogleMapsConfiguration {
  mapContainer?: HTMLElement | null
  mapOptions?: google.maps.MapOptions
}

export interface GoogleMapsProviderProps extends GoogleMapsConfiguration {
  children: React.ReactNode
  apiKey: string
  libraries?: string[]
  onLoadMap?: (map: google.maps.Map) => void
}

export interface GoogleMapsContextType {
  map?: google.maps.Map
  googleMapsAPIIsLoaded: boolean
}

export const GoogleMapsContext = createContext<
  GoogleMapsContextType | undefined
>(undefined)

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = props => {
  const { children, apiKey, libraries, mapContainer, mapOptions, onLoadMap } =
    props
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined)
  const [googleMapsAPIIsLoaded, setGoogleMapsAPIIsLoaded] = useState(false)

  useEffect(() => {
    if (mapContainer && window.google && window.google.maps) {
      const newMap = new google.maps.Map(mapContainer, mapOptions)
      google.maps.event.addListenerOnce(newMap, 'idle', () => {
        if (onLoadMap) {
          onLoadMap(newMap)
        }
      })

      setMap(newMap)

      return () => {
        if (newMap) {
          google.maps.event.clearInstanceListeners(newMap)
        }
      }
    }
  }, [googleMapsAPIIsLoaded, mapContainer])

  const handleAPILoadStatus = (status: Status) => {
    if (status === Status.SUCCESS) {
      setGoogleMapsAPIIsLoaded(true)
    } else {
      setGoogleMapsAPIIsLoaded(false)
    }
  }

  return (
    <Wrapper
      apiKey={apiKey}
      libraries={libraries as any}
      callback={status => handleAPILoadStatus(status)}
    >
      <GoogleMapsContext.Provider value={{ map, googleMapsAPIIsLoaded }}>
        {children}
      </GoogleMapsContext.Provider>
    </Wrapper>
  )
}
