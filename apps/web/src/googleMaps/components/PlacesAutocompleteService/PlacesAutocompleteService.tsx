import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'

import { useGoogleMap } from '../../hooks/useGoogleMap'
import { useAutocompleteService } from '../../hooks/useAutocompleteService'
import { usePlacesService } from '../../hooks/usePlaces'
import { IconButton, InputBase } from '@mui/material'
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react'

export interface PlacesAutocompleteServiceSuggestion {
  id: string
  label: string
}

const maxNumberOfSuggestions = 5

const PlacesAutocompleteService = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<
    Array<PlacesAutocompleteServiceSuggestion>
  >([])
  const [suggestionsAreVisible, setSuggestionsAreVisible] =
    useState<boolean>(false)

  const map = useGoogleMap()
  const autocompleteService = useAutocompleteService()
  const placesService = usePlacesService()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      setSuggestionsAreVisible(true)
    }, 300)
  }

  const selectSuggestion = (
    suggestion: PlacesAutocompleteServiceSuggestion,
  ) => {
    setInputValue(suggestion.label)
    setSuggestionsAreVisible(false)

    // Get the location from Places Service of the selected place and zoom to it
    placesService?.getDetails(
      { placeId: suggestion.id },
      (
        placeResult: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !placeResult
        ) {
          return
        }

        // Get position of the suggestion to move map
        const position = placeResult.geometry?.location

        if (map && position) {
          map.setZoom(14)
          map.panTo(position)
        }
      },
    )
  }

  useEffect(() => {
    if (inputValue.length >= 2) {
      autocompleteService?.getPlacePredictions(
        {
          input: inputValue,
        },
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            return
          }

          const autocompleteSuggestions = predictions
            .slice(0, maxNumberOfSuggestions)
            .map(prediction => ({
              id: prediction.place_id,
              label: prediction.description,
            }))

          // Update suggestions for dropdown suggestions list
          setSuggestions(autocompleteSuggestions)
        },
      )
    } else {
      setSuggestions([])
    }
  }, [inputValue])

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
          inputRef={inputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <MagnifyingGlassIcon size={18} />
        </IconButton>
      </Paper>

      {suggestionsAreVisible && (
        <Paper>
          <List>
            {suggestions.map(suggestion => (
              <ListItem
                key={suggestion.id}
                button
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion.label}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}

export default PlacesAutocompleteService
