import React, { useEffect, useState, useRef } from 'react'
import {
  Link as MuiLink,
  CircularProgress,
  Backdrop,
  Box,
  IconButton,
  Button,
  TextField,
  Toolbar,
  Typography,
  Collapse,
  Menu,
  MenuItem,
  Stack,
  Slide,
} from '@mui/material'
import { Add, ExpandMore, FilterList, Search } from '@mui/icons-material'
import { AddOrders } from './modals/AddOrders.tsx/AddOrders'

export const OrdersTab: React.FC<{
  companyId: string | undefined
}> = ({ companyId }) => {
  const [openAddNewFieldModal, setOpenAddNewFieldModal] = useState(false)

  return (
    <>
      {!openAddNewFieldModal ? (
        <Box>
          <Slide
            in={!openAddNewFieldModal}
            direction="left"
            mountOnEnter
            unmountOnExit
          >
            <Stack direction="column" spacing={1}>
              <Box visibility={openAddNewFieldModal ? 'hidden' : 'visible'}>
                <Toolbar
                  sx={{
                    boxShadow: 0,
                    marginBottom: 2,
                  }}
                >
                  <Box
                    display={'flex'}
                    alignItems={'flex-end'}
                    justifyContent={'flex-end'}
                    flexGrow={1}
                  >
                    <Button
                      variant="contained"
                      sx={{ marginLeft: 1 }}
                      onClick={() => setOpenAddNewFieldModal(true)}
                    >
                      New
                    </Button>
                  </Box>
                </Toolbar>
              </Box>
            </Stack>
          </Slide>
        </Box>
      ) : (
        <Box>
          <Slide
            in={openAddNewFieldModal}
            direction="left"
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <AddOrders companyId={companyId} onCanceled={() => setOpenAddNewFieldModal(false)}/>
            </Box>
          </Slide>
        </Box>
      )}
    </>
  )
}
