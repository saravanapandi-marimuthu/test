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
  Package as PackageIcon,
  Basket as BasketIcon,
  HashStraight as HashStraightIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@apollo/client'
import {
  Package,
  PackagesDocument,
  PackagesQuery,
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

type PackagePickerProps = {
  selectedPackageId: number
  onChange: (newSelectedPackageId: number) => void
  width?: string | number
  enabled?: boolean
}

const PackagePicker: React.FC<PackagePickerProps> = ({
  selectedPackageId,
  onChange,
  width = '100%',
  enabled = true,
}) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(selectedPackageId)
  const [measurementTypes, setMeasurementTypes] = useState<string[]>([])
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([])
  const [units, setUnits] = useState<Package[]>([])
  const [filteredUnits, setFilteredUnits] = useState<Package[]>([])

  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)
  const menuItemRefs = useRef<{ [key: number]: HTMLLIElement | null }>({})

  const measurementTypeOrder = ['VOLUME', 'WEIGHT', 'COUNT']

  const { loading, error, data } = useQuery<PackagesQuery>(PackagesDocument, {
    variables: {
      input: {},
    },
  })

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

  // useEffect(() => {
  //   if (editing) {
  //     setTimeout(() => {
  //       if (inputRef.current) {
  //         inputRef.current.focus()
  //       }
  //     }, 0)
  //   }
  // }, [editing])

  useEffect(() => {
    const unitOfMeasurements = data?.packages?.items as Package[]

    if (loading || units.length > 0 || !unitOfMeasurements) {
      return
    }

    let newUnits: Package[] = []
    let availableMeasurementTypes: string[] = []

    const sortedUnits = [...unitOfMeasurements].sort((a: any, b: any) => {
      return (
        measurementTypeOrder.indexOf(a.unitOfMeasurementType) -
        measurementTypeOrder.indexOf(b.unitOfMeasurementType)
      )
    })

    sortedUnits.forEach((uom: Package) => {
      newUnits.push(uom)

      if (!availableMeasurementTypes.includes(uom.unit.unitOfMeasurementType)) {
        availableMeasurementTypes.push(uom.unit.unitOfMeasurementType)
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

    setEditedValue(selectedPackageId)
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
    let newUnits: Package[] = []

    units.forEach((uom: Package) => {
      if (
        selectedUnitTypes.includes(uom.unit.unitOfMeasurementType) ||
        selectedUnitTypes.length === 0
      ) {
        newUnits.push(uom)
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
          {selectedPackageId > 0 && (
            <TagChip
              colorIndex={
                units.find(unit => unit.id === selectedPackageId)?.colorIndex ??
                0
              }
              name={
                units.find(unit => unit.id === selectedPackageId)?.name ?? ''
              }
            />
          )}
        </HoverBox>
      ) : (
        <Box>
          {selectedPackageId > 0 && (
            <TagChip
              colorIndex={
                units.find(unit => unit.id === selectedPackageId)?.colorIndex ??
                0
              }
              name={
                units.find(unit => unit.id === selectedPackageId)?.name ?? ''
              }
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
            {selectedPackageId > 0 && (
              <TagChip
                colorIndex={
                  units.find(unit => unit.id === selectedPackageId)
                    ?.colorIndex ?? 0
                }
                name={
                  units.find(unit => unit.id === selectedPackageId)?.name ?? ''
                }
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
                        {type === 'COUNT' && <HashStraightIcon size={18} />}
                        {type === 'LENGTH' && <RulerIcon size={18} />}
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
                    if (uom.id === selectedPackageId && el) {
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
                      selectedPackageId === uom.id ? '#f0f0f0' : 'transparent',
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={10}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body2">{uom.name}</Typography>
                        <Grid container spacing={0.5}>
                          <Grid item xs={1}>
                            <PackageIcon size={18} />
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            display={'flex'}
                            justifyContent={'flex-end'}
                          >
                            <Typography variant="caption">
                              {uom.quantityPerPackage}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="caption">
                              {uom.unit.name}
                            </Typography>
                          </Grid>

                          {uom.quantityPerPallet > 0 && (
                            <>
                              <Grid item xs={1}>
                                <BasketIcon size={18} />
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                display={'flex'}
                                justifyContent={'flex-end'}
                              >
                                <Typography variant="caption">
                                  {uom.quantityPerPallet}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="caption">
                                  {uom.unit.name}
                                </Typography>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      {/* Check mark */}
                      {selectedPackageId === uom.id && <CheckIcon size={18} />}
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

export default PackagePicker
