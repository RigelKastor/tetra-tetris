import { ThunkDispatch } from 'redux-thunk'
import { UserAction } from '../interfaces'
import { UserStateT } from '../reducer'
import { RootState } from '@/store/reducers'
import { UserActionType } from './action-types'
import { getUserInfo, postLoginUser } from '@/api/auth'
import { initSessionSuccessAC, requestSessionnAC } from './action-creators'
// import { receiveLoginAC } from './action-creators'

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
        console.log(`result `, result)

        if (result.data === 'OK') {
          // получаю сразу юзера

          const user = await getUserInfo()
          if (user) {
            // у юзера нет пароля, можно сохранить в лс
            localStorage.setItem('user', JSON.stringify(user))

            dispatch(initSessionSuccessAC(user))
          }

          console.log(`user `, user)
        }
      } catch (error) {
        console.log(`error 2 `, error)
      }
    }
  }
}
