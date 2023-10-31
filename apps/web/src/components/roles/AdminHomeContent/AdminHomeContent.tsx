import { Container, Grid, Card, Stack, Box } from '@mui/material'
import QuickAccessTile from '../../shared/QuickAccessTile/QuickAccessTile'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { useNavigate } from 'react-router-dom'
import {
  Factory as FactoryIcon,
  Group as GroupIcon,
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon,
} from '@mui/icons-material'
import MapWidget from '../../../googleMaps/components/MapWidget/MapWidget'
import FieldMapTestComponent from '../../Maps/FieldMapTestComponent/FieldMapTestComponent'

const AdminHomeContent = () => {
  const navigate = useNavigate()

  const manageCompanies = () => {
    navigate('/companies')
  }

  const manageUsers = () => {
    navigate('/users')
  }

  const manageConfigurations = () => {
    navigate('/adminconfig')
  }

  return (
    <>
      <Container fixed maxWidth="md" sx={{ minHeight: 300 }}>
        <SectionHeadingToolBar
          title={'Dashboard'}
          loading={false}
          hasAddButton={false}
          hasRefreshButton={false}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                border: 0,
                boxShadow: 0,
              }}
            >
              <QuickAccessTile
                title={'Companies'}
                subtitle={'Manage all companies'}
                icon={<FactoryIcon />}
                onAction={manageCompanies}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                border: 0,
                boxShadow: 0,
              }}
            >
              <QuickAccessTile
                title={'Users'}
                subtitle={'Manage all users'}
                icon={<GroupIcon />}
                onAction={manageUsers}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                border: 0,
                boxShadow: 0,
              }}
            >
              <QuickAccessTile
                title={'Configuration'}
                subtitle={'Manage configurations'}
                icon={<AdminPanelSettingsOutlinedIcon />}
                onAction={manageConfigurations}
              />
            </Card>
          </Grid>
        </Grid>
        <Stack spacing={2}></Stack>
      </Container>
    </>
  )
}

export default AdminHomeContent
