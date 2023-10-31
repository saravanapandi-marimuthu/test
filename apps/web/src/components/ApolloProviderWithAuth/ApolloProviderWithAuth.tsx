import React, { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

import LoggedOutContent from '../LoggedOutContent/LoggedOutContent'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAppContext } from '../../contexts/AppContext'
import { CircularProgress, Container } from '@mui/material'
import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser'

const TOKEN_STORAGE_KEY = 'auth_token'

interface ApolloProviderWithAuthProps {
  children: ReactNode
}

const ApolloProviderWithAuth: React.FC<ApolloProviderWithAuthProps> = ({
  children,
}) => {
  const [initialCheckDone, setInitialCheckDone] = React.useState(false)

  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()
  const { selectedUserRole, impersonatedRole } = useAppContext()

  React.useEffect(() => {
    if (inProgress === 'none') {
      setInitialCheckDone(true)
    }
  }, [inProgress])

  // Initialize Apollo Client
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_BACKEND_API_URL}/graphql`,
  })

  const isTokenExpired = (token: string): boolean => {
    if (!token) {
      return true
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000

    const isExpired = decodedToken.exp < currentTime
    console.log(
      'isTokenExpired: ',
      isExpired,
      'token exp',
      decodedToken.exp,
      'currentTime',
      currentTime,
      'remainingTokenTime',
      decodedToken.exp - currentTime,
    )
    return isExpired
  }

  const authLink = setContext(async (_, { headers }) => {
    let token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!token || isTokenExpired(token)) {
      // If token is expired, fetch a new one
      token = await fetchTokenFromMsal(instance, accounts[0]) // assuming accounts[0] is the current user
      localStorage.setItem(TOKEN_STORAGE_KEY, token ?? '')
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'X-Horizen-Role': selectedUserRole ?? '',
        'X-Horizen-IR': impersonatedRole ?? '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  if (inProgress === 'logout') {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  console.log('inProgress', inProgress)
  if (!initialCheckDone || inProgress !== 'none') {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress sx={{ color: 'gray' }} />
      </Container>
    )
  }

  if (!isAuthenticated) {
    console.log('NOT AUTHENTICATED')
    return <LoggedOutContent />
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const fetchTokenFromMsal = async (
  msalInstance: IPublicClientApplication,
  account: AccountInfo,
) => {
  const request = {
    scopes: [
      'openid',
      'profile',
      'https://horizenag.onmicrosoft.com/customer-api/customer.access',
    ],
    account: account,
  }

  try {
    const response = await msalInstance.acquireTokenSilent(request)
    return response.accessToken
  } catch (error) {
    // Handle or throw the error appropriately
    console.error('Error fetching token from MSAL:', error)
    await msalInstance.loginRedirect(request)
    return null
  }
}

export default ApolloProviderWithAuth
