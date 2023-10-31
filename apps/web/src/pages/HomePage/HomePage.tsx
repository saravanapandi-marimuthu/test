import '../../App.css'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { useCallback, useEffect } from 'react'
import { CircularProgress, Container } from '@mui/material'
import LoggedOutContent from '../../components/LoggedOutContent/LoggedOutContent'
import AdminHomeContent from '../../components/roles/AdminHomeContent/AdminHomeContent'
import PrimaryLayout from '../../layouts/PrimaryLayout/PrimaryLayout'
import SalesManagerHomeContent from '../../components/roles/SalesManagerHomeContent/SalesManagerHomeContent'
import ContactRoleContent from '../../components/roles/ContactRoleContent/ContactRoleContent'
import { RoleTypes } from '../../graphql/generated/graphql'
import ClearCacheButton from '../../components/utility_components/ClearCacheButton/ClearCacheButton'

const LoggedInContent = ({ isReady }: { isReady: boolean }) => {
  const { user, loading } = useUser()

  console.log('** SELECTED ROLE', user?.selectedUserRole)
  let HomeContent

  switch (user?.selectedUserRole?.rolesInfo[0].value) {
    case RoleTypes.SuperAdmin:
    case RoleTypes.CompanyAdmin:
      HomeContent = AdminHomeContent
      break
    case RoleTypes.SalesManager:
      HomeContent = SalesManagerHomeContent
      break
    //case 'user':
    //  HomeContent = UserHomeContent;
    //  break;
    case RoleTypes.Contact:
      HomeContent = ContactRoleContent
      break
    default:
      HomeContent = () => <CircularProgress sx={{ color: 'yellow' }} />
      break
  }

  if (!user || !isReady || loading) {
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
        <CircularProgress sx={{ color: 'green' }} />
      </Container>
    )
  }

  return (
    <>
      {!user?.selectedUserRole?.rolesInfo[0].name ? (
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          {/* <CircularProgress sx={{ color: 'red' }} /> */}
          <ClearCacheButton />
        </Container>
      ) : (
        <PrimaryLayout>
          <HomeContent />
        </PrimaryLayout>
      )}
    </>
  )
}

function HomePage() {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const memoizedNavigate = useCallback(navigate, [])

  const { user, loading } = useUser()

  const { inProgress } = useMsal()
  const isReady = isAuthenticated && inProgress === InteractionStatus.None

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(`Testing roles length: ${user?.userRoles.length}`, user)

      if (user?.userRoles.length === 0) {
        memoizedNavigate('/register')
      }
    }
  }, [isAuthenticated, user, memoizedNavigate])

  return (
    <div>
      {isAuthenticated ? (
        <LoggedInContent isReady={isReady} />
      ) : (
        <LoggedOutContent />
      )}
    </div>
  )
}

export default HomePage
