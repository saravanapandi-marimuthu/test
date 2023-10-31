import React, { useState } from 'react'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  List,
  Divider,
  Typography,
} from '@mui/material'

import {
  Wrench as WrenchIcon,
  UserCircle as UserCircleIcon,
  Receipt as ReceiptIcon,
  SquaresFour as SquaresFourIcon,
  Factory as FactoryIcon,
  UsersFour as UsersFourIcon,
  Archive as ArchiveIcon,
  ChartLineUp as ChartLineUpIcon,
  GearSix as GearSizIcon,
  Barcode as BarcodeIcon,
  CaretRight as CaretRightIcon,
  CaretDown as CaretDownIcon,
  Books as BooksIcon,
  BookOpen as BookOpenIcon,
  Tag as TagIcon,
  Truck as TruckIcon,
  AddressBook as AddressBookIcon,
  Buildings,
  Storefront as VendorsIcon,
  MapPinLine as LocationsIcons,
  Warehouse as WarehouseIcon,
  TreeStructure as TreeStructureIcon,
  Wrench,
} from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
const UserLeftMenu = () => {
  const [salesOpen, setSalesOpen] = useState(true)
  const [catalogOpen, setCatalogOpen] = useState(true)
  const navigate = useNavigate()

  const handleClickSales = () => {
    setSalesOpen(!salesOpen)
  }

  const handleClickCatalog = () => {
    setCatalogOpen(!catalogOpen)
  }

  const handleNavigation = (route: string) => {
    navigate(route)
  }
  return (
    <>
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === '/reports'}
            onClick={() => handleNavigation('/')}
          >
            <ListItemIcon>
              <ChartLineUpIcon size={24} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Reports</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {/* For test page */}
        <ListItem disablePadding>
          <Tooltip title="Page for testing" placement="right">
            <ListItemButton
              selected={location.pathname === '/test-page'}
              onClick={() => handleNavigation('/test-page')}
            >
              <ListItemIcon>
                <Wrench size={24} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Testing</Typography>
              </ListItemText>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </>
  )
}

export default UserLeftMenu
