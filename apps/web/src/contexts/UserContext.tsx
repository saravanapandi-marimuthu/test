import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Resource,
  User,
  UserActions,
  UserInfoDocument,
} from '../graphql/generated/graphql'
import { LEFT_MENUS } from '../constants/menus'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useQuery } from '@apollo/client'
import { useAppContext } from './AppContext'

type UserContextValue = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  isUserPermitted: (action: UserActions, resource: Resource) => boolean
  leftMenu: any
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { instance } = useMsal()
  const { switchRole } = useAppContext()
  const isAuthenticated = useIsAuthenticated()

  const [user, setUser] = useState<User | null>(null)

  const { loading, error, data, refetch } = useQuery(UserInfoDocument, {
    onCompleted: data => {
      setUser(data.userInfo as User)
      switchRole(data.userInfo?.selectedUserRoleId ?? '')
    },
  })

  let leftMenu = localStorage.getItem('leftMenu') ?? LEFT_MENUS

  leftMenu = typeof leftMenu === 'string' ? JSON.parse(leftMenu) : leftMenu

  const isUserPermitted = (action: UserActions, resource: Resource) => {
    if (
      user?.selectedUserRole?.rolePermissions.find(
        p => p.action === action && p.resource === resource,
      )
    ) {
      return true
    }

    return false
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null)
    }

    if (isAuthenticated && !user) {
      refetch()
    }
  }, [instance, isAuthenticated])

  const value = useMemo(
    () => ({
      user,
      loading,
      leftMenu,
      setUser,
      isUserPermitted,
    }),
    [user, setUser, loading, isUserPermitted, leftMenu],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
