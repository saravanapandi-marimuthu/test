import {
  Box,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useUser } from '../../../contexts/UserContext'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { ORGANIZATION_TAB } from '../../../constants'
import { TabPanel } from '../../shared/TabPanel/TabPanel'
import SubsidiariesTab from '../SubsidiariesTab/SubsidiariesTab'

export interface OrgHomeProp {}

export const OrgHome: React.FC<OrgHomeProp> = ({}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [contactPersonName, setContactPersonName] = useState<string>('')
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const { user } = useUser()

  //  const { id, companyName } = useParams()

  // useEffect(() => {}, [customerCompanyId])

  function handleTabChange(
    event: SyntheticEvent<Element, Event>,
    value: number,
  ): void {
    setSelectedTab(value)
  }

  return (
    <>
      <SectionHeadingToolBar
        title={user?.selectedUserRole?.company?.name || ''}
        loading={false}
        hasAddButton={false}
        hasRefreshButton={false}
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">
          {user?.selectedUserRole?.company?.name || (
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
            {ORGANIZATION_TAB.map((el: string, ind: number) => {
              return <Tab key={`${el}_${ind}`} label={el} {...a11yProps(ind)} />
            })}
          </Tabs>
        </Box>
        <>
          <TabPanel value={selectedTab} index={0}>
            <SubsidiariesTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Org home
          </TabPanel>
          <TabPanel value={selectedTab} index={2}></TabPanel>
          <TabPanel value={selectedTab} index={3}></TabPanel>
          <TabPanel value={selectedTab} index={4}>
            Orders
          </TabPanel>
          <TabPanel value={selectedTab} index={5}></TabPanel>
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
