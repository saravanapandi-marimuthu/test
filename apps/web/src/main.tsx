import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { MsalProvider } from '@azure/msal-react'
import { signInSignUpPublicClient } from './msalConfig'

import ApolloProviderWithAuth from './components/ApolloProviderWithAuth/ApolloProviderWithAuth'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
// import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ModalAddEdit } from './components/Modals/ModalAddEdit/ModalAddEdit'
import { AppContextProvider } from './contexts/AppContext'
import { SnackbarProvider } from 'notistack'

const msalInstance = signInSignUpPublicClient

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <MsalProvider instance={msalInstance}>
      <ApolloProviderWithAuth>
        <UserProvider>
          <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <App />
              <ModalAddEdit />
            </SnackbarProvider>
          </ThemeProvider>
        </UserProvider>
      </ApolloProviderWithAuth>
    </MsalProvider>
  </AppContextProvider>,
)
