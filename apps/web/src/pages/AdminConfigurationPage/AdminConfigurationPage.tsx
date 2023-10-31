import { Box, Tab, Tabs } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import TagCategories from '../../components/configurations/TagCategories/TagCategories'
import SectionHeadingToolBar from '../../components/shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { COMPANY_CONFIGURATION_TAB } from '../../constants'
import { TabPanel } from '../../components/shared/TabPanel/TabPanel'
import { ConfigurationOverviewTab } from './OverviewTab/ConfigurationOverviewTab'

const AdminConfigurationPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

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
        title={'Admin Configuration'}
        loading={false}
        hasAddButton={false}
        hasRefreshButton={false}
      />

      <Box paddingTop={2} sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {COMPANY_CONFIGURATION_TAB.map((el: string, ind: number) => {
              return <Tab key={`${el}_${ind}`} label={el} {...a11yProps(ind)} />
            })}
          </Tabs>
        </Box>
        <>
          <TabPanel value={selectedTab} index={0}>
            <ConfigurationOverviewTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Presets
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Communication
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <TagCategories />
          </TabPanel>
        </>
      </Box>
      {/* <PaymentTerms /> */}
    </>
  )
}

export default AdminConfigurationPage
