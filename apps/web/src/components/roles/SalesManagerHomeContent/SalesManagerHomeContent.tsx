import { Box, Container, Grid, Paper } from '@mui/material'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import MiniBarChart from '../../charts/MiniBarChart/MiniBarChart'
import MultiSeriesBarChart from '../../charts/MultiSeriesBarChart/MultiSeriesBarChart'
import { TAG_COLORS } from '../../../constants'

const SalesManagerHomeContent = () => {
  return (
    <>
      <Container fixed maxWidth="lg" sx={{ minHeight: 300 }}>
        <SectionHeadingToolBar
          title={'Dashboard'}
          loading={false}
          hasAddButton={false}
          hasRefreshButton={false}
        />
        <Box paddingY={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <MiniBarChart
                title="Sales"
                barColor={TAG_COLORS[0].dark} //"rgba(15, 145, 244, 1.0)"
                backgroundColor={TAG_COLORS[0].light} //"rgba(15, 145, 244, 0.2)"
                subTitle="$534,000"
                yoyChange="25% YoY"
                chartData={[
                  { key: 'Jan', value: 120 },
                  { key: 'Feb', value: 200 },
                  { key: 'Mar', value: 150 },
                  { key: 'Apr', value: 80 },
                  { key: 'May', value: 160 },
                  { key: 'Jun', value: 145 },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MiniBarChart
                title="Expenses"
                subTitle="$72,000"
                isPositiveTrend={true}
                yoyChange="14%"
                barColor={TAG_COLORS[1].dark} //"rgba(131, 83, 226, 1.0)"
                backgroundColor={TAG_COLORS[1].light} //"rgba(131, 83, 226, 0.2)"
                chartData={[
                  { key: 'Jan', value: 80 },
                  { key: 'Feb', value: 90 },
                  { key: 'Mar', value: 150 },
                  { key: 'Apr', value: 60 },
                  { key: 'May', value: 50 },
                  { key: 'Jun', value: 145 },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MiniBarChart
                title="Orders"
                subTitle="600"
                isPositiveTrend={false}
                yoyChange="5%"
                barColor={TAG_COLORS[9].dark} //"rgba(64, 105, 229, 1.0)"
                backgroundColor={TAG_COLORS[9].light} //"rgba(64, 105, 229, 0.2)"
                chartData={[
                  { key: 'Jan', value: 50 },
                  { key: 'Feb', value: 90 },
                  { key: 'Mar', value: 120 },
                  { key: 'Apr', value: 70 },
                  { key: 'May', value: 50 },
                  { key: 'Jun', value: 85 },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MiniBarChart
                title="New Bookings"
                subTitle="115"
                isPositiveTrend={true}
                yoyChange="22%"
                barColor={TAG_COLORS[8].dark} //"rgba(224, 88, 88, 1.0)"
                backgroundColor={TAG_COLORS[8].light} //"rgba(224, 88, 88, 0.2)"
                chartData={[
                  { key: 'Jan', value: 10 },
                  { key: 'Feb', value: 15 },
                  { key: 'Mar', value: 12 },
                  { key: 'Apr', value: 20 },
                  { key: 'May', value: 16 },
                  { key: 'Jun', value: 18 },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
        <Paper sx={{ width: '100%' }}>
          <MultiSeriesBarChart
            title="PO vs Booked"
            backgroundColor={TAG_COLORS[5].light} //"#F0F8FEFF"
            barColor={TAG_COLORS[5].dark} //"rgba(180, 180, 180, 0.2)"
            isPositiveTrend={false}
            yoyChange="25% YoY"
            chartData={{
              labels: [
                'P',
                'SO4',
                'Glyphiphate',
                'Bean Pre',
                'Corn Pre',
                'Bean Post',
                'Corn Post',
              ],
              series: [
                {
                  name: 'PO',
                  data: [43.3, 83.1, 86.4, 72.4, 120, 60, 110],
                },
                {
                  name: 'Booked',
                  data: [85.8, 73.4, 65.2, 53.9, 80, 70, 115],
                },
              ],
            }}
          />
        </Paper>
      </Container>
    </>
  )
}

export default SalesManagerHomeContent
