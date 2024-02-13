import { Action, Dispatch, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { UserReducer, UserStateT } from './User/reducer'
import { TopicReducer, TopicStateT } from './Topic/reducer'
export type RootState = {
  User: UserStateT
  Topic: TopicStateT
}

export const reducers = combineReducers({
  User: UserReducer,
  Topic: TopicReducer,
})

export type RootStore = ReturnType<typeof reducers>

export type DispatchType = Dispatch<Action> &
  ThunkDispatch<RootStore, any, Action>
