import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { KeyboardArrowRight } from '@mui/icons-material'
import { WAREHOUSE_TAB } from '../../../constants'
import { TabPanel } from '../../shared/TabPanel/TabPanel'
import OverviewTab from './InfoTabs/OverviewTab'
import InventoryStorageLocationTab from './InfoTabs/InventoryStorageLocationTab'
import {
  WarehouseDocument,
  WarehouseQuery,
} from '../../../graphql/generated/graphql'

function WarehouseLocationInfo() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ========= Internal State ================ //
  const [selectedTab, setSelectedTab] = useState<number>(0)
  // ========================================= //
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  // ========= Page Query ==================== //
  const [displayPageError, setDisplayPageError] = useState<string | undefined>(
    undefined,
  )
  const { loading, error, data } = useQuery<WarehouseQuery>(WarehouseDocument, {
    variables: {
      input: {
        id: parseInt(id ?? '-1'),
      },
    },
  })

  function handleTabChange(
    event: SyntheticEvent<Element, Event>,
    value: number,
  ): void {
    setSelectedTab(value)
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        setDisplayPageError(
          'An error occurred while loading the page. Please try again.',
        )
      }
    }
  }, [loading])
  // ========================================= //

  return (
    <Box sx={{ paddingLeft: 11, paddingRight: 11 }}>
      {loading ? (
        <Box textAlign={'center'} justifyContent={'center'}>
          <CircularProgress size={18} />
        </Box>
      ) : (
        <>
          {displayPageError && (
            <Alert severity="error">{displayPageError}</Alert>
          )}

          <Typography variant="h4" fontWeight={'bold'}>
            {data?.warehouse?.name}
          </Typography>

          {data?.warehouse && (
            <>
              <Grid container direction={'row'}>
                <Grid item justifyContent={'center'}>
                  <Button
                    onClick={() => navigate('/warehouses')}
                    variant="text"
                  >
                    Warehouses
                  </Button>
                </Grid>

                <Grid
                  item
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ display: 'flex' }}
                >
                  <KeyboardArrowRight />
                </Grid>

                <Grid
                  item
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ display: 'flex' }}
                >
                  <Typography variant="subtitle1" fontSize={12}>
                    {data.warehouse.name}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={selectedTab} onChange={handleTabChange}>
                    {WAREHOUSE_TAB.map((el: string, ind: number) => {
                      return (
                        <Tab
                          key={`${el}_${ind}`}
                          label={el}
                          {...a11yProps(ind)}
                        />
                      )
                    })}
                  </Tabs>
                </Box>
              </Box>

              <TabPanel value={selectedTab} index={0}>
                <OverviewTab listData={data} />
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <InventoryStorageLocationTab />
              </TabPanel>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default WarehouseLocationInfo
