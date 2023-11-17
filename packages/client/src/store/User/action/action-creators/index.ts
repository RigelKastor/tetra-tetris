import { UserType } from '@/components/types'
import {
  requestSessionI,
  initSessionI,
  receiveSessionI,
  errorSessionI,
} from '../../interfaces'
import { UserActionType } from '../action-types'

export const requestSessionnAC = (): requestSessionI => {
  return {
    type: UserActionType.REQUEST_SESSION,
  }
}

export const initSessionSuccessAC = (user: UserType): initSessionI => {
  return {
    type: UserActionType.INIT_SESSION,
    user,
  }
}

export const getErrorSession = (errorMessage: string): errorSessionI => {
  return {
    type: UserActionType.ERROR_SESSION,
    errorMessage,
  }
}

export const receiveSessionnAC = (): receiveSessionI => {
  return {
    type: UserActionType.RECIEVE_SESSION,
  }
}
