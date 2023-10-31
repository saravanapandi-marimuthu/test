import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'

import {
  Plus as PlusIcon,
  ArrowClockwise as ArrowClockwiseIcon,
} from '@phosphor-icons/react'

interface SectionHeadingToolBarProps {
  title: string
  loading: boolean
  hasAddButton?: boolean
  addButtonTitle?: string
  hasRefreshButton?: boolean
  middleComponent?: ReactNode
  onAddButtonClicked?: () => void
  onRefreshButtonClicked?: () => void
}

const SectionHeadingToolBar: React.FC<SectionHeadingToolBarProps> = ({
  title,
  loading,
  hasAddButton = true,
  addButtonTitle = 'Add',
  hasRefreshButton = true,
  middleComponent = null,
  onAddButtonClicked = () => {},
  onRefreshButtonClicked = () => {},
}) => {
  return (
    <Toolbar
      sx={{
        boxShadow: 0,
        marginBottom: 2,
        paddingX: '0px !important',
      }}
    >
      <Typography
        variant="h4"
        noWrap
        component="div"
        color="text.primary"
        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {title}
      </Typography>
      {loading && (
        <Box sx={{ paddingX: 2 }}>
          <CircularProgress size={18} />
        </Box>
      )}

      {middleComponent}

      {hasAddButton && (
        <>
          <div>
            <Button
              variant="outlined"
              onClick={onAddButtonClicked ?? undefined}
              startIcon={<PlusIcon size={16} />}
            >
              {addButtonTitle}
            </Button>
          </div>
          <Divider
            sx={{ height: 28, m: 0.5, paddingLeft: 2 }}
            orientation="vertical"
          />
        </>
      )}

      {hasRefreshButton && (
        <div>
          <IconButton onClick={onRefreshButtonClicked ?? undefined}>
            <ArrowClockwiseIcon size={16} />
          </IconButton>
        </div>
      )}
    </Toolbar>
  )
}

export default SectionHeadingToolBar
