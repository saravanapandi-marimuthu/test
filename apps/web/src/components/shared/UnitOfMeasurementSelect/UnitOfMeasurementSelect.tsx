// UnitOfMeasurementSelect.tsx
import {
  FormControl,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Menu,
  Box,
  Typography,
  MenuList,
  styled,
  Stack,
  Tooltip,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TagChip from '../TagChip/TagChip'

import {
  Flask as FlaskIcon,
  Scales as ScalesIcon,
  Ruler as RulerIcon,
  Gauge as GaugeIcon,
  Check as CheckIcon,
} from '@phosphor-icons/react'
import {
  UnitOfMeasurement,
  UnitOfMeasurementDocument,
  UnitOfMeasurementQuery,
} from '../../../graphql/generated/graphql'

const measurementTypeOrder = ['VOLUME', 'WEIGHT', 'AREA', 'LENGTH', 'RATE']

const StyledBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  maxWidth: 300,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.divider,
  },
}))

const StyledArrowIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
  visibility: 'visible',
  color: `${theme.palette.text.secondary}`,
}))

interface UnitOfMeasurementSelectProps {
  selectedUnitId: number
  onChange: (selectedUnitId: number) => void
}

const toPascalCase = (str: string): string => {
  return str
    ?.replace(/[\s-_]+/g, ' ') // Convert hyphens/underscores to spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export const UnitOfMeasurementSelect: React.FC<
  UnitOfMeasurementSelectProps
> = ({ selectedUnitId, onChange }) => {
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([])
  const [units, setUnits] = useState<UnitOfMeasurement[]>([])
  const [filteredUnits, setFilteredUnits] = useState<UnitOfMeasurement[]>([])

  const [measurementTypes, setMeasurementTypes] = useState<string[]>([])

  const { loading, error, data } = useQuery<UnitOfMeasurementQuery>(
    UnitOfMeasurementDocument,
    {
      variables: {
        input: {},
      },
    },
  )
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [editing, setEditing] = useState(false)

  if (error) return <p>{'Error :('}</p>

  useEffect(() => {
    const unitOfMeasurements = data?.unitOfMeasurements
      ?.items as UnitOfMeasurement[]
    if (loading || units.length > 0 || !unitOfMeasurements) return

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
  }, [data, loading])

  useEffect(() => {
    filterUnits()
  }, [units, selectedUnitTypes])

  const handleFilterChecked = (event: any) => {
    if (event.target.checked) {
      setSelectedUnitTypes([...selectedUnitTypes, event.target.name])
    } else {
      setSelectedUnitTypes(
        selectedUnitTypes.filter(unitType => unitType !== event.target.name),
      )
    }
  }

  // Function to filter units from units into selectedUnits based on selected unit types
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

  const handleEditStart = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setEditing(true)
  }

  const handleMenuSelect = (selectedUnitId: number) => {
    setAnchorEl(null)
    onChange(selectedUnitId)
    setEditing(false)
  }

  const handleCancelEditing = () => {
    if (editing) {
      setAnchorEl(null)
      setEditing(false)
    }
  }

  return (
    <>
      <StyledBox
        flexGrow={1}
        display={'flex'}
        padding={0.9}
        border={'1px solid gray'}
        onClick={handleEditStart}
      >
        <Stack
          width={'100%'}
          minWidth={'150px'}
          direction="row"
          spacing={1}
          alignItems={'center'}
          alignContent={'center'}
        >
          {!selectedUnitId && (
            <Typography
              variant="body1"
              color="text.secondary"
              width={'100%'}
              noWrap
              sx={{
                cursor: 'pointer',
                minWidth: 100,
                pr: 4, // Added padding right to avoid text overlap with the icon
              }}
            >
              Select Unit
            </Typography>
          )}

          {selectedUnitId > 0 && (
            <TagChip
              colorIndex={
                units.find(unit => unit.id === selectedUnitId)?.colorIndex ?? 0
              }
              name={units.find(unit => unit.id === selectedUnitId)?.name ?? ''}
            />
          )}
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <StyledArrowIcon />
          </Box>
        </Stack>
      </StyledBox>

      <Menu
        anchorEl={anchorEl}
        open={editing}
        onClose={handleCancelEditing}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        //transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ sx: { padding: 0 } }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
              maxWidth: 250,
            },
          },
        }}
      >
        <StyledMenuItem
          sx={{ padding: 1 }}
          onKeyDown={e => e.stopPropagation()}
          focusRipple={false}
        >
          <FormControl sx={{ width: '100%' }}>
            <Grid container spacing={1}>
              {measurementTypes.map((type: string) => (
                <Grid item xs={3} key={type}>
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
                          <Typography variant="caption" color="text.secondary">
                            {/* {toPascalCase(type)} */}
                          </Typography>
                        </Stack>
                      }
                      labelPlacement="end"
                    />
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </FormControl>
        </StyledMenuItem>
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          <MenuList dense>
            {filteredUnits.map((unit: UnitOfMeasurement) => (
              <MenuItem
                value={unit.id.toString()}
                key={unit.id}
                selected={unit.id === selectedUnitId}
                onClick={() => handleMenuSelect(unit.id)}
              >
                <Stack
                  direction={'row'}
                  width={'100%'}
                  spacing={1}
                  alignItems={'center'}
                >
                  <TagChip colorIndex={unit.colorIndex ?? 0} name={unit.name} />
                  <Box flexGrow={1} display="flex" justifyContent="flex-end">
                    {unit.id === selectedUnitId && <CheckIcon size={18} />}
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Menu>
    </>
  )
}
