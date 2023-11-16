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
  // access_token: string;
  // user: userT;
}

export type UserAction = requestSessionI | initSessionI | receiveSessionI
