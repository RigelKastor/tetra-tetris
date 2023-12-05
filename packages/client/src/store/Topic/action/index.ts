import { ThunkDispatch } from 'redux-thunk'
import { TopicActions } from '../interfaces'
import { TopicStateT } from '../reducer'
import { openTopicAC, closeTopicAC } from './action-creators'
import { TopicType } from '@/components/types'
type DispatchT = ThunkDispatch<TopicStateT, void, TopicActions>

export const openTopic = (topic: TopicType) => {
  return async (dispatch: DispatchT) => {
    dispatch(openTopicAC(topic))
  }
}

export const closeTopic = () => {
  return async (dispatch: DispatchT) => {
    dispatch(closeTopicAC())
  }
}
