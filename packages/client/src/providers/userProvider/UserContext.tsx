import { createContext } from 'react'
import { UserType } from '@components/types'

export const UserContext = createContext<UserType>({} as UserType)