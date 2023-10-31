import React, { useRef } from 'react'
import {
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from '@mui/material'
import {
  Polygon as PolygonIcon,
  LineSegment as LineSegmentIcon,
  MapPin as MapPinIcon,
  HandGrabbing as HandGrabbingIcon,
  ArrowCounterClockwise as ArrowCounterClockwiseIcon,
  ArrowClockwise as ArrowClockwiseIcon,
  Barricade as BarricadeIcon,
  FileArrowDown as FileArrowDownIcon,
  FileArrowUp as FileArrowUpIcon,
} from '@phosphor-icons/react'
import { POLYGON_COLORS } from '../../../constants'
import { FeatureCollection, GeometryObject } from 'geojson'

export interface DrawingMenuProps {
  selectedMenuItem: string
  onMenuItemClick: (menuItem: string) => void
  undoDisabled: boolean
  redoDisabled: boolean
  handleUndo: () => void
  handleRedo: () => void
  handleExport?: () => void
  handleImport?: (geoJson: FeatureCollection<GeometryObject>) => void
}

const ICON_BUTTON_SIZE = 22

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}))

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    //margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

const isValidGeoJson = (
  geoJson: any,
): geoJson is FeatureCollection<GeometryObject> => {
  // Perform some basic checks here
  return (
    geoJson &&
    geoJson.type === 'FeatureCollection' &&
    Array.isArray(geoJson.features)
  )
}

const MapDrawToolbarMenu = (prop: DrawingMenuProps) => {
  const {
    selectedMenuItem,
    onMenuItemClick,
    handleUndo,
    handleRedo,
    handleExport,
    handleImport,
    undoDisabled,
    redoDisabled,
  } = prop

  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        const content = e.target?.result

        if (content) {
          try {
            const parsed = JSON.parse(content as string)

            if (isValidGeoJson(parsed)) {
              const featureCollection: FeatureCollection<GeometryObject> =
                parsed

              // Import GeoJSON data
              handleImport && handleImport(featureCollection)
            } else {
              console.error('Invalid GeoJSON data.')
            }
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        }
      }
      reader.readAsText(file)
    }
  }
  return (
    <>
      <ToggleButtonGroup
        size="small"
        orientation="vertical"
        value={selectedMenuItem}
        exclusive
        onChange={(event: any, value: string) => onMenuItemClick(value)}
        aria-label="Drawing Controls"
      >
        <ToggleButton value="pan" aria-label="left aligned">
          <BootstrapTooltip title="Pan" placement="right">
            <HandGrabbingIcon size={ICON_BUTTON_SIZE} />
          </BootstrapTooltip>
        </ToggleButton>
        <ToggleButton value="poly-outer" aria-label="centered">
          <BootstrapTooltip title="Draw Outer Polygon" placement="right">
            <PolygonIcon
              size={ICON_BUTTON_SIZE}
              color={POLYGON_COLORS[0].strokeColor}
            />
          </BootstrapTooltip>
        </ToggleButton>
        <ToggleButton value="poly-inner" aria-label="right aligned">
          <BootstrapTooltip title="Draw Inner Polygon" placement="right">
            <PolygonIcon
              size={ICON_BUTTON_SIZE}
              color={POLYGON_COLORS[1].strokeColor}
            />
          </BootstrapTooltip>
        </ToggleButton>
        <ToggleButton value="line" aria-label="right aligned">
          <BootstrapTooltip title="Draw Line" placement="right">
            <LineSegmentIcon
              size={ICON_BUTTON_SIZE}
              color={POLYGON_COLORS[2].strokeColor}
            />
          </BootstrapTooltip>
        </ToggleButton>
        <ToggleButton value="pin" aria-label="right aligned">
          <BootstrapTooltip title="Pin" placement="right">
            <MapPinIcon
              size={ICON_BUTTON_SIZE}
              color={POLYGON_COLORS[3].strokeColor}
            />
          </BootstrapTooltip>
        </ToggleButton>
        <ToggleButton value="pin-gate" aria-label="right aligned">
          <BootstrapTooltip title="Gate" placement="right">
            <BarricadeIcon
              size={ICON_BUTTON_SIZE}
              color={POLYGON_COLORS[4].strokeColor}
            />
          </BootstrapTooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider flexItem />

      <IconButton
        onClick={handleUndo}
        sx={{ borderRadius: 2 }}
        disabled={undoDisabled}
      >
        <BootstrapTooltip title="Undo" placement="right">
          <ArrowCounterClockwiseIcon size={ICON_BUTTON_SIZE} />
        </BootstrapTooltip>
      </IconButton>

      <IconButton
        onClick={handleRedo}
        sx={{ borderRadius: 2 }}
        disabled={redoDisabled}
      >
        <BootstrapTooltip title="Redo" placement="right">
          <ArrowClockwiseIcon size={ICON_BUTTON_SIZE} />
        </BootstrapTooltip>
      </IconButton>

      <Divider flexItem />
      <IconButton onClick={handleExport} sx={{ borderRadius: 2 }}>
        <BootstrapTooltip title="Download GeoJSON" placement="right">
          <FileArrowDownIcon size={ICON_BUTTON_SIZE} />
        </BootstrapTooltip>
      </IconButton>
      <label htmlFor="file-picker">
        <IconButton onClick={triggerFileInput} sx={{ borderRadius: 2 }}>
          <BootstrapTooltip title="Upload GeoJSON" placement="right">
            <FileArrowUpIcon size={ICON_BUTTON_SIZE} />
          </BootstrapTooltip>
        </IconButton>
      </label>
      <input
        ref={fileInputRef}
        accept="application/json" // Accept only JSON files
        style={{ display: 'none' }}
        id="file-picker"
        type="file"
        onChange={handleFileChange}
      />
    </>
  )
}

export default MapDrawToolbarMenu
