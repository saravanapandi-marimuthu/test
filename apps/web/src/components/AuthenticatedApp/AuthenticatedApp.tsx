// AuthenticatedApp.tsx

import HomePage from '../../pages/HomePage/HomePage'
import HelpPage from '../../pages/HelpPage/HelpPage'
import CompanyAdminPage from '../../pages/CompanyAdminPage/CompanyAdminPage'
import { Route, Routes } from 'react-router-dom'
import UserRegistrationPage from '../../pages/UserRegistrationPage/UserRegistrationPage'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import CompaniesPage from '../../pages/CompaniesPage/CompaniesPage'
import UsersPage from '../../pages/UsersPage/UsersPage'
import AdminConfigurationPage from '../../pages/AdminConfigurationPage/AdminConfigurationPage'
import PrimaryLayout from '../../layouts/PrimaryLayout/PrimaryLayout'
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage'
import UserHomePage from '../../pages/UserHomePage/UserHomePage'
import LoggedOutPage from '../../pages/LoggedOutPage/LoggedOutPage'
import { AccountsPage } from '../../pages/AccountsPage/AccountsPage'
import { AccountPage } from '../../pages/AccountPage/AccountPage'
import ManufacturersPage from '../../pages/ManufacturersPage/ManufacturersPage'
import ManufacturerProductsPage from '../../pages/ManufacturersProductsPage/ManufacturersProductsPage'
import { EnterprisesPage } from '../../pages/EnterprisesPage/EnterprisesPage'
import { EnterprisePage } from '../../pages/EnterprisePage/EnterprisePage'
import { RetailerProductsPage } from '../../pages/RetailerProductsPage/RetailerProductsPage'
import CompanyWarehousesPage from '../../pages/WarehousesPage/WarehousesPage'
import CompanyWarehouseLocationInfo from '../companies/WarehouseLocationInfo/WarehouseLocationInfo'
import { ForTestPage } from '../../pages/ForTestPage/ForTestPage'
import { VendorsPage } from '../../pages/VendorsPage/VendorsPage'
import { PurchaseOrdersPage } from '../../pages/PurchaseOrdersPage/PurchaseOrdersPage'

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/loggedout" element={<LoggedOutPage />} />

      <Route path="/" element={<HomePage />} />
      <Route
        path="/help"
        element={
          <MainLayout>
            <HelpPage />
          </MainLayout>
        }
      />
      <Route
        path="/userhome"
        element={
          <PrimaryLayout>
            <UserHomePage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/companyadmin"
        element={
          <MainLayout>
            <CompanyAdminPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PrimaryLayout>
            <UserRegistrationPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/companies"
        element={
          <PrimaryLayout>
            <CompaniesPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/warehouses"
        element={
          <PrimaryLayout>
            <CompanyWarehousesPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/warehouses/:id"
        element={
          <PrimaryLayout>
            <CompanyWarehouseLocationInfo />
          </PrimaryLayout>
        }
      />
      <Route
        path="/users"
        element={
          <PrimaryLayout>
            <UsersPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/adminconfig"
        element={
          <PrimaryLayout>
            <AdminConfigurationPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/accounts"
        element={
          <PrimaryLayout>
            <AccountsPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/accounts/:id/:companyName"
        element={
          <PrimaryLayout>
            <AccountPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/enterprises"
        element={
          <PrimaryLayout>
            <EnterprisesPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/enterprises/:id/:companyName"
        element={
          <PrimaryLayout>
            <EnterprisePage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/vendors"
        element={
          <PrimaryLayout>
            <VendorsPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/manufacturers"
        element={
          <PrimaryLayout>
            <ManufacturersPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/manufacturer-products/:manufacturerId/:manufacturerName"
        element={
          <PrimaryLayout>
            <ManufacturerProductsPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/manufacturer-product-search"
        element={
          <PrimaryLayout>
            <ManufacturerProductsPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/retailer-products"
        element={
          <PrimaryLayout>
            <RetailerProductsPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/test-page"
        element={
          <PrimaryLayout>
            <ForTestPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/userprofile"
        element={
          <PrimaryLayout>
            <UserProfilePage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/purchase-orders"
        element={
          <PrimaryLayout>
            <PurchaseOrdersPage />
          </PrimaryLayout>
        }
      />
    </Routes>
  )
}

export default AuthenticatedApp
