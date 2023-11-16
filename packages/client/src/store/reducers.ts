import { Action, Dispatch, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { UserReducer, UserStateT } from './User/reducer'
export type RootState = {
  User: UserStateT
}

export const reducers = combineReducers({
  User: UserReducer,
})

export type RootStore = ReturnType<typeof reducers>

export type DispatchType = Dispatch<Action> &
  ThunkDispatch<RootStore, any, Action>
