import React, { useState, useEffect, useRef } from 'react'
import {
  MenuItem,
  Box,
  MenuList,
  styled,
  Popover,
  Grid,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material'

import {
  Check as CheckIcon,
  Flask as FlaskIcon,
  Scales as ScalesIcon,
  Ruler as RulerIcon,
  Gauge as GaugeIcon,
  HashStraight as HashStraightIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@apollo/client'
import {
  UnitOfMeasurement,
  UnitOfMeasurementDocument,
  UnitOfMeasurementQuery,
} from '../../../graphql/generated/graphql'
import TagChip from '../../../components/shared/TagChip/TagChip'
import { HoverBox } from '../../shared/HoverBox'
import { SelectedBox } from '../../shared/SelectedBox'

const toPascalCase = (str: string): string => {
  return str
    ?.replace(/[\s-_]+/g, ' ') // Convert hyphens/underscores to spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

const UomTypeSelectorGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: 0,
  boxShadow: 'none',
  margin: 0,
}))

type UomPickerProps = {
  selectedUomId: number
  onChange: (newSelectedUomId: number) => void
  width?: string | number
  enabled?: boolean
}

const UomPicker: React.FC<UomPickerProps> = ({
  selectedUomId,
  onChange,
  width = '100%',
  enabled = true,
}) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(selectedUomId)
  const [measurementTypes, setMeasurementTypes] = useState<string[]>([])
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([])
  const [units, setUnits] = useState<UnitOfMeasurement[]>([])
  const [filteredUnits, setFilteredUnits] = useState<UnitOfMeasurement[]>([])

  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)
  const menuItemRefs = useRef<{ [key: number]: HTMLLIElement | null }>({})

  const measurementTypeOrder = ['VOLUME', 'WEIGHT', 'AREA', 'LENGTH', 'RATE']

  const { loading, error, data } = useQuery<UnitOfMeasurementQuery>(
    UnitOfMeasurementDocument,
    {
      variables: {
        input: {},
      },
    },
  )

  useEffect(() => {
    if (hoverBoxRef.current) {
      setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (hoverBoxRef.current) {
        setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }
  }, [editing])

  useEffect(() => {
    const unitOfMeasurements = data?.unitOfMeasurements
      ?.items as UnitOfMeasurement[]

    if (loading || units.length > 0 || !unitOfMeasurements) {
      return
    }

    let newUnits: UnitOfMeasurement[] = []
    let availableMeasurementTypes: string[] = []

    const sortedUnits = [...unitOfMeasurements].sort((a: any, b: any) => {
      return (
        measurementTypeOrder.indexOf(a.unitOfMeasurementType) -
        measurementTypeOrder.indexOf(b.unitOfMeasurementType)
      )
    })

    sortedUnits.forEach((uom: UnitOfMeasurement) => {
      newUnits.push({
        id: uom.id,
        name: uom.name,
        colorIndex: uom.colorIndex,
        unitOfMeasurementType: uom.unitOfMeasurementType,
      } as UnitOfMeasurement)

      if (!availableMeasurementTypes.includes(uom.unitOfMeasurementType)) {
        availableMeasurementTypes.push(uom.unitOfMeasurementType)
      }
    })

    setMeasurementTypes(availableMeasurementTypes)
    setUnits(newUnits)
  }, [data])

  const handleEditStart = (event: React.MouseEvent<HTMLElement>) => {
    if (!enabled) {
      return
    }

    setAnchorEl(event.currentTarget)

    setEditedValue(selectedUomId)
    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    const newValue = editedValue ?? 0

    onChange(newValue)
    setEditing(false)
  }

  const handleMenuItemClick = (value: number) => {
    setAnchorEl(null)

    setEditedValue(value)

    onChange(value)
    setEditing(false)
  }

  const handleFilterChecked = (event: any) => {
    if (event.target.checked) {
      setSelectedUnitTypes([...selectedUnitTypes, event.target.name])
    } else {
      setSelectedUnitTypes(
        selectedUnitTypes.filter(unitType => unitType !== event.target.name),
      )
    }
  }

  const filterUnits = () => {
    let newUnits: UnitOfMeasurement[] = []

    units.forEach((uom: UnitOfMeasurement) => {
      if (
        selectedUnitTypes.includes(uom.unitOfMeasurementType) ||
        selectedUnitTypes.length === 0
      ) {
        newUnits.push({
          id: uom.id,
          name: uom.name,
          colorIndex: uom.colorIndex,
          unitOfMeasurementType: uom.unitOfMeasurementType,
        } as UnitOfMeasurement)
      }
    })

    setFilteredUnits(newUnits)
  }

  useEffect(() => {
    filterUnits()
  }, [units, selectedUnitTypes])

  return (
    <>
      {enabled ? (
        <HoverBox ref={hoverBoxRef} onClick={handleEditStart}>
          {selectedUomId > 0 ? (
            <TagChip
              colorIndex={
                units.find(unit => unit.id === selectedUomId)?.colorIndex ?? 0
              }
              name={units.find(unit => unit.id === selectedUomId)?.name ?? ''}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Select UoM
            </Typography>
          )}
        </HoverBox>
      ) : (
        <Box>
          {selectedUomId > 0 && (
            <TagChip
              colorIndex={
                units.find(unit => unit.id === selectedUomId)?.colorIndex ?? 0
              }
              name={units.find(unit => unit.id === selectedUomId)?.name ?? ''}
            />
          )}
        </Box>
      )}
      <Popover
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditSave}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          padding: 0,
          border: '1px solid green',
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
              width: hoverBoxWidth ? `${hoverBoxWidth}px` : 'auto',
              minWidth: 300,
            },
          },
        }}
      >
        <Stack direction="column">
          <SelectedBox onClick={() => setEditing(false)}>
            {selectedUomId > 0 && (
              <TagChip
                colorIndex={
                  units.find(unit => unit.id === selectedUomId)?.colorIndex ?? 0
                }
                name={units.find(unit => unit.id === selectedUomId)?.name ?? ''}
              />
            )}
          </SelectedBox>
          <UomTypeSelectorGrid container spacing={1}>
            {measurementTypes.map((type: string) => (
              <Grid item xs={12 / measurementTypes.length} key={type}>
                <Tooltip title={toPascalCase(type ?? '')}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedUnitTypes.includes(type)}
                        size={'small'}
                        onChange={handleFilterChecked}
                        name={type}
                      />
                    }
                    label={
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
                        {type === 'VOLUME' && <FlaskIcon size={18} />}
                        {type === 'WEIGHT' && <ScalesIcon size={18} />}
                        {type === 'AREA' && <RulerIcon size={18} />}
                        {type === 'LENGTH' && <RulerIcon size={18} />}
                        {type === 'RATE' && <GaugeIcon size={18} />}
                        {type === 'COUNT' && <HashStraightIcon size={18} />}
                      </Stack>
                    }
                    labelPlacement="end"
                  />
                </Tooltip>
              </Grid>
            ))}
          </UomTypeSelectorGrid>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            <MenuList dense>
              {filteredUnits.map(uom => (
                <MenuItem
                  ref={el => {
                    menuItemRefs.current[uom.id] = el
                    if (uom.id === selectedUomId && el) {
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start',
                      })
                    }
                  }}
                  key={uom.name}
                  onClick={() => handleMenuItemClick(uom.id)}
                  sx={{
                    backgroundColor:
                      selectedUomId === uom.id ? '#f0f0f0' : 'transparent',
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={10}>
                      <TagChip
                        key={uom.name}
                        colorIndex={uom.colorIndex}
                        name={uom.name}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {/* Check mark */}
                      {selectedUomId === uom.id && <CheckIcon size={18} />}
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}

export default UomPicker
