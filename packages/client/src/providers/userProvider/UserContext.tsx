import { UserType } from '@/components/types'
import { createContext } from 'react'
import { UserTheme } from '@/providers/userProvider/UserProvider'

const UserContext = createContext<{
  user?: UserType | null
  theme: UserTheme | null
  setUser?: React.Dispatch<React.SetStateAction<UserType>> | null
  setTheme: React.Dispatch<React.SetStateAction<UserTheme>>
}>({
  theme: 'default',
  setTheme: () => null,
})

export default UserContext
