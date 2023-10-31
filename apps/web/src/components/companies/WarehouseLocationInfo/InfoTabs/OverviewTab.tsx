import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import { House, Phone } from '@phosphor-icons/react'
import { add } from 'lodash'
import React from 'react'

interface OverviewTabProps {
  listData: any
}

function OverviewTab({ listData }: OverviewTabProps) {
  return (
    <Box sx={{ paddingTop: 2 }} alignItems={'flex-start'} display={'flex'}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight={'bold'}>
            Warehouse Info
          </Typography>

          <Grid container direction={'row'} alignItems={'center'}>
            <Grid item xs={6}>
              <Grid container direction={'row'} alignItems={'center'}>
                <Grid item sx={{ marginRight: 0.5 }}>
                  <House size={20} />
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Address
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">
                {listData.warehouse.warehouseAddresses.map(
                  add =>
                    `${add.address?.addressLine1}, ${add.address?.city}, ${add.address?.state} ${add.address?.postalCode}`,
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction={'row'} alignItems={'center'}>
            <Grid item xs={6}>
              <Grid container direction={'row'} alignItems={'center'}>
                <Grid item sx={{ marginRight: 0.5 }}>
                  <Phone size={20} />
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Phone Number
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">
                {listData.warehouse.warehousePhoneNumbers.map(
                  phone => phone.phoneNumber.mainNumber,
                )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default OverviewTab
