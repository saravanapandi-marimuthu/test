import {
  Box,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { CUSTOMER_ACCOUNT_TAB } from '../../../constants'
import { TabPanel } from '../../shared/TabPanel/TabPanel'
import { OverviewTab } from '../accountTabs/OverviewTab/OverviewTab'
import { AccountEnterprises } from '../accountTabs/AccountEnterprises/AccountEnterprises'
import LocationsTab from '../accountTabs/LocationsTab/LocationsTab'
import { PrepayAccount } from '../accountTabs/PrepayAccount/PrepayAccount'
import { OrdersTab } from '../accountTabs/OrdersTab/OrdersTab'

export interface CustomerProp {
  customerCompanyId: string
}

export const Account: React.FC<CustomerProp> = ({ customerCompanyId }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [contactPersonName, setContactPersonName] = useState<string>('')
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const { id, companyName } = useParams()

  useEffect(() => {}, [customerCompanyId])

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
          Sales
        </Link>
        <Link color="inherit" to="/accounts">
          Accounts
        </Link>
        <Typography color="text.primary">
          {companyName || (
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem', width: '100px' }}
            />
          )}
        </Typography>
      </Breadcrumbs>

      <Box paddingTop={2} sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {CUSTOMER_ACCOUNT_TAB.map((el: string, ind: number) => {
              return <Tab key={`${el}_${ind}`} label={el} {...a11yProps(ind)} />
            })}
          </Tabs>
        </Box>
        <>
          <TabPanel value={selectedTab} index={0}>
            <OverviewTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Activity
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <AccountEnterprises companyId={customerCompanyId} />
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <LocationsTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={4}>
            <OrdersTab companyId={customerCompanyId} />
          </TabPanel>
          <TabPanel value={selectedTab} index={5}>
            <PrepayAccount />
          </TabPanel>
          <TabPanel value={selectedTab} index={6}>
            Invoices
          </TabPanel>
          <TabPanel value={selectedTab} index={7}>
            Documents
          </TabPanel>
        </>
      </Box>
    </>
  )
}
