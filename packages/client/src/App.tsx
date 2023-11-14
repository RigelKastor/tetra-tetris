import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorType } from '@/api/getApiError'
import {
  UserContextProvider,
  UserTheme,
} from '@/providers/userProvider/UserProvider'
import { urls } from '@/utils/navigation'
import { UserType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'
import AppRouters from './routers'
import { getUserInfo } from './api/auth'

function App() {
  const [getUserError, setGetUserError] = useState<ErrorType | null>()
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType)
  const [theme, setTheme] = useState<UserTheme>({} as UserTheme)
  const [isFetcing, setIsFetching] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const activePage = location.pathname.substring(1).split('/')[0]

  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo()
        .then(result => {
          setUserInfo(result)

          if (activePage === 'login' || activePage === 'registration') {
            navigate(urls.home)
          }
          setIsFetching(false)
        })
        .catch(error => {
          if (activePage !== 'login' && activePage !== 'registration') {
            navigate(urls.login)
          }
          setGetUserError(error)
          setIsFetching(false)
        })
    }
    fetchUserInfo()
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider
        user={userInfo}
        settingsTheme={theme}
        setUser={setUserInfo}
        setTheme={setTheme}>
        {isFetcing ? (
          <Preloader />
        ) : (
          <AppRouters error={getUserError?.error?.code || 401} />
        )}
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
