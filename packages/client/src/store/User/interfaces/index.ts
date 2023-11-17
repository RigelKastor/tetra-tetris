import { UserType } from '@/components/types'
import { UserActionType } from '../action/action-types'

export interface requestSessionI {
  type: UserActionType.REQUEST_SESSION
}

export interface initSessionI {
  type: UserActionType.INIT_SESSION
  user: UserType
}

export interface receiveSessionI {
  type: UserActionType.RECIEVE_SESSION
}

export interface logoutSessionI {
  type: UserActionType.LOGOUT_SESSION
}

export interface checkSessionFail {
  type: UserActionType.CHECK_SESSION_FAIL
}

export interface errorSessionI {
  type: UserActionType.ERROR_SESSION
  errorMessage: string
}

export type UserAction =
  | requestSessionI
  | initSessionI
  | receiveSessionI
  | logoutSessionI
  | checkSessionFail
  | errorSessionI
