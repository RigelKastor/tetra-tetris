import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { RootState, reducers } from './reducers'

export function initStore(initialState?: RootState) {
  return createStore(reducers, initialState, applyMiddleware(thunk))
}
