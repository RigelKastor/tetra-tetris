import {
  UserContextProvider,
  UserTheme,
} from '@/providers/userProvider/UserProvider'
import { UserType } from '@components/types'
import React, { useEffect, useState } from 'react'
import useAction from './hooks/useAction'
import { useTypedSelector } from './hooks/useTypedSelector'
import AppRouters from './routers'

function App() {
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType)
  const [themeState, setThemeState] = useState<UserTheme>({} as UserTheme)
  // const location = useLocation()

  // const activePage = location.pathname.substring(1).split('/')[0]

  const { theme } = useTypedSelector(state => state.User)
  const { CheckSession } = useAction()

  useEffect(() => {
    if (theme) {
      setThemeState(theme)
    }
  }, [theme])

  useEffect(() => {
    CheckSession()
    const bodyThemeElement = document.querySelector('body')
    if (bodyThemeElement) {
      bodyThemeElement.setAttribute('theme-mode', theme as string)
    }
  }, [])

  // тут надо связать oauth через редакс
  useEffect(() => {
    // const yandexAuth = () => {
    //   const code = new URLSearchParams(location.search).get('code')
    //   if (code) {
    //     return signInWithYandex(code)
    //   } else return Promise.resolve()
    // }
    // const fetchUserInfo = async () => {
    //   await getUserInfo().then(result => {
    //     setUserInfo(result)
    //     if (activePage === 'login' || activePage === 'registration') {
    //       navigate(urls.home)
    //     }
    //     setIsFetching(false)
    //   })
    // }
    // yandexAuth()
    //   .then(() => fetchUserInfo())
    //   .catch(error => {
    //     if (activePage !== 'login' && activePage !== 'registration') {
    //       navigate(urls.login)
    //     }
    //     setGetUserError(error)
    //     setIsFetching(false)
    //   })
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider
        user={userInfo}
        settingsTheme={themeState}
        setUser={setUserInfo}
        setTheme={setThemeState}>
        <AppRouters error={401} />
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
