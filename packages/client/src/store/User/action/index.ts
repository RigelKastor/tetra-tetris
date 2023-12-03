import { baseApiUrl } from '@/api/api'
import {
  NewUser,
  getUserInfo,
  postLoginUser,
  postLogout,
  postSignUp,
} from '@/api/auth'
import { RootState } from '@/store/reducers'
import { DEFAULT_AVATAR } from '@/utils/constants'
import { ThunkDispatch } from 'redux-thunk'
import { UserAction } from '../interfaces'
import { UserStateT } from '../reducer'
import {
  getErrorSession,
  initSessionSuccessAC,
  requestSessionnAC,
} from './action-creators'
import { UserActionType } from './action-types'
import { UserType } from '@/components/types'

const resourcesUrl = baseApiUrl + 'resources'

type DispatchT = ThunkDispatch<UserStateT, void, UserAction>

const initUser = (user: UserType, dispatch: DispatchT) => {
  const userAvatar = user.avatar
    ? user.avatar.startsWith('/')
      ? resourcesUrl + user.avatar
      : user.avatar
    : DEFAULT_AVATAR

  const userWithAva = { ...user, avatar: userAvatar }

  // у юзера нет пароля, можно сохранить в лс
  localStorage.setItem('user', JSON.stringify(userWithAva))

  dispatch(initSessionSuccessAC(userWithAva))
}

export const checkSession = () => {
  return async (dispatch: DispatchT) => {
    dispatch(requestSessionnAC())
    try {
      const user = await getUserInfo()
      if (user) {
        initUser(user, dispatch)
      }
    } catch (err) {
      dispatch({ type: UserActionType.CHECK_SESSION_FAIL })
    }
  }
}

export const getAuth = (login: string, password: string) => {
  return async (
    dispatch: ThunkDispatch<UserStateT, void, UserAction>,
    getState: () => RootState
  ) => {
    dispatch(requestSessionnAC())

    const {
      User: { user },
    } = getState()

    if (!user) {
      try {
        const result = (await postLoginUser({ login, password })) as any

        if (result.data === 'OK') {
          // получаю сразу юзера

          const user = await getUserInfo()
          if (user) {
            initUser(user, dispatch)
          }
        }
      } catch (error) {
        if (error instanceof Error && 'error' in error) {
          if (error.error) {
            dispatch(
              getErrorSession((error.error as Record<string, any>).description)
            )
          }
        }
      }
    }
  }
}

export const signUp = (values: NewUser) => {
  return async (dispatch: ThunkDispatch<UserStateT, void, UserAction>) => {
    dispatch(requestSessionnAC())

    try {
      const response = await postSignUp(values)

      if (response.data.id) {
        const user = await getUserInfo()
        initUser(user, dispatch)
      }
    } catch (error) {
      console.log(`error `, error)
      if (error instanceof Error && 'error' in error) {
        if (error.error) {
          dispatch(
            getErrorSession((error.error as Record<string, any>).description)
          )
        }
      }
    }
  }
}

export const logoutSession = () => {
  return async (dispatch: ThunkDispatch<UserStateT, void, UserAction>) => {
    try {
      const response = await postLogout()
      if (response.data === 'OK') {
        localStorage.removeItem('user')
        dispatch({ type: UserActionType.LOGOUT_SESSION })
      }
    } catch (error) {
      console.log(`error `, error)
    }
  }
}
