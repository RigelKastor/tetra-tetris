import React, { ReactNode } from 'react'
import UserContext from './UserContext'
import { UserType } from '@components/types'
import { baseApiUrl } from '@/api/api'
import { DEFAULT_AVATAR } from '@/utils/constants'

export type UserTheme = 'default' | 'light'

interface UserContextProps {
  children?: ReactNode
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  settingsTheme?: UserTheme
  setTheme: React.Dispatch<React.SetStateAction<UserTheme>>
}

const resourcesUrl = baseApiUrl + 'resources'
export const UserContextProvider = ({
  user,
  children,
  setUser,
  settingsTheme,
  setTheme,
}: UserContextProps) => {
  const userAvatar = user.avatar
    ? user.avatar.startsWith('/')
      ? resourcesUrl + user.avatar
      : user.avatar
    : DEFAULT_AVATAR

  const theme = settingsTheme || 'default'

  return (
    <UserContext.Provider
      value={{
        user: { ...user, avatar: userAvatar },
        setUser,
        theme,
        setTheme,
      }}>
      {children}
    </UserContext.Provider>
  )
}
