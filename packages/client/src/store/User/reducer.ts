import { UserType } from '@/components/types'
import { UserAction } from './interfaces'

export type UserStateT = {
  user?: UserType | null
  loading?: boolean
  theme?: 'light' | 'default'
  errorMessage?: string
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
    case 'LOGOUT_SESSION':
      return { ...state, user: null, errorMessage: '' }
    case 'CHECK_SESSION_FAIL':
      return { ...state, loading: false }
    case 'ERROR_SESSION':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    default:
      return state
  }
}
