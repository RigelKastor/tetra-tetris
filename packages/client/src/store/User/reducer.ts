import { UserType } from '@/components/types'
import { UserAction } from './interfaces'

export type UserStateT = {
  user?: UserType | null
  loading?: boolean
  theme?: 'light' | 'dark'
}

const UserState: UserStateT = { user: null }

export const UserReducer = (
  state: UserStateT = UserState,
  action: UserAction
): UserStateT => {
  switch (action.type) {
    case 'REQUEST_SESSION':
      return { ...state, loading: true }
    case 'INIT_SESSION':
      return { ...state, user: action.user, loading: false }
    // case 'RECIEVE_SESSION':
    //   return { ...state, loading: false }
    default:
      return state
  }
}
