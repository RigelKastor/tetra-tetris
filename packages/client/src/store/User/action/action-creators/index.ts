import { UserType } from '@/components/types'
import {
  requestSessionI,
  initSessionI,
  receiveSessionI,
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

export const receiveSessionnAC = (): receiveSessionI => {
  return {
    type: UserActionType.RECIEVE_SESSION,
  }
}
