import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { DataFlexModal, StateModal } from '../types/types'

type AppContextValue = {
  dataFlexModal?: DataFlexModal[]
  setDataFlexModal?: React.Dispatch<React.SetStateAction<DataFlexModal[]>>
  flexModal?: StateModal
  setFlexModal?: React.Dispatch<React.SetStateAction<StateModal>>
  selectedUserRole?: string
  switchRole: (roleId: string) => void
  impersonatedRole?: string
  setImpersonatedRole?: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [selectedUserRole, setSelectedUserRole] = useState<string>('')
  const [impersonatedRole, setImpersonatedRole] = useState<string>('')

  // Add state flex modals
  const [dataFlexModal, setDataFlexModal] = useState<DataFlexModal[]>([])
  const [flexModal, setFlexModal] = useState<StateModal>({ id: null })

  const switchRole = (roleId: string) => {
    setSelectedUserRole(roleId)
    localStorage.setItem('selectedUserRole', roleId)
  }

  const value = useMemo(
    () => ({
      selectedUserRole,
      switchRole,
      dataFlexModal,
      setDataFlexModal,
      flexModal,
      setFlexModal,
      impersonatedRole,
      setImpersonatedRole,
    }),
    [
      selectedUserRole,
      switchRole,
      dataFlexModal,
      setDataFlexModal,
      flexModal,
      setFlexModal,
      impersonatedRole,
      setImpersonatedRole,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
