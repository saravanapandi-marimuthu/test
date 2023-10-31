import {
  Box,
  Breadcrumbs,
  Button,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EnterpriseField } from '../EnterpriseField/EnterpriseField'
import { useUser } from '../../../contexts/UserContext'
import { CompanyRelationshipTypeEnum } from '../../../types/companyTypes'
import { useQuery } from '@apollo/client'
import { Plus as PlusIcon } from '@phosphor-icons/react'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { TabPanel } from '../../shared/TabPanel/TabPanel'
import { ENTERPRISE_TAB } from '../../../constants'
import { EnterpriseAccounts } from '../enterpriseTabs/EnterpriseAccounts/EnterpriseAccounts'
import { EnterpriseOverviewTab } from '../enterpriseTabs/OverviewTab/EnterpriseOverviewTab'
const testData = [
  {
    fieldName: 'North Field',
    location: { latitude: 47.6108218, longitude: -122.3416256 },
    currentCrop: 'Corn',
    area: 8.54,
    fieldMap: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Field 1',
            description: 'This is Field 1.',
            fillColor: '#ff0000',
            fillOpacity: 0.5,
            strokeColor: '#000000',
            strokeWidth: 2,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-122.342078, 47.610785],
                [-122.341628, 47.610321],
                [-122.340947, 47.610877],
                [-122.341397, 47.611341],
                [-122.342078, 47.610785],
              ],
            ],
          },
        },
      ],
    },
  },
  {
    fieldName: 'South Field',
    location: { latitude: 47.6101858, longitude: -122.3390956 },
    currentCrop: 'Corn',
    area: 8.54,
    fieldMap: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Field 2',
            description: 'This is Field 2.',
            fillColor: '#00ff00',
            fillOpacity: 0.5,
            strokeColor: '#000000',
            strokeWidth: 2,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-122.339548, 47.610149],
                [-122.339098, 47.609685],
                [-122.338417, 47.610241],
                [-122.338867, 47.610705],
                [-122.339548, 47.610149],
              ],
            ],
          },
        },
      ],
    },
  },
]

export const Enterprise: React.FC<any> = ({ customerCompanyId }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const { user } = useUser()
  const { id, companyName } = useParams()

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  function handleTabChange(
    event: SyntheticEvent<Element, Event>,
    value: number,
  ): void {
    setSelectedTab(value)
  }

  return (
    <>
      <SectionHeadingToolBar
        title={companyName || ''}
        loading={false}
        hasAddButton={false}
        hasRefreshButton={false}
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/enterprises">
          Enterprises
        </Link>
        <Typography color="text.primary">
          {companyName || 'Enterprise'}
        </Typography>
      </Breadcrumbs>

      <Box paddingTop={2} sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {ENTERPRISE_TAB.map((el: string, ind: number) => {
              return <Tab key={`${el}_${ind}`} label={el} {...a11yProps(ind)} />
            })}
          </Tabs>
        </Box>
        <>
          <TabPanel value={selectedTab} index={0}>
            <EnterpriseOverviewTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <EnterpriseAccounts companyId={id} />
          </TabPanel>
          <TabPanel value={selectedTab} index={4}>
            Orders
          </TabPanel>
          <TabPanel value={selectedTab} index={5}>
            Invoices
          </TabPanel>
          <TabPanel value={selectedTab} index={6}>
            Documents
          </TabPanel>
        </>
      </Box>
      {/* 
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: 600, mb: 2 }} variant="h6">
          Fields
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {}}
          startIcon={<PlusIcon size={16} />}
        >
          Add Field
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {testData.map((el: any, ind: number) => {
          return (
            <EnterpriseField
              key={ind}
              name={el.fieldName}
              location={el.location}
              currentCrop={el.currentCrop}
              area={el.area}
              fieldMap={el.fieldMap}
            />
          )
        })}
      </Stack> */}
    </>
  )
}
