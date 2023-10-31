import { useUser } from '../contexts/UserContext'
import { useMutation } from '@apollo/client'
import { SwitchUserRoleDocument, User } from '../graphql/generated/graphql'

export function useSwitchUserRole() {
  const { setUser } = useUser()

  const [switchUserRole] = useMutation(SwitchUserRoleDocument)

  const switchRole = async (roleId: string) => {
    try {
      const { data } = await switchUserRole({
        variables: {
          input: { roleId: roleId },
        },
      })

      setUser(data?.switchUserRole.user as User)
    } catch (error) {
      console.error('Error switching role', error)
    }
  }

  return { switchRole }
}
