import { TopicType } from '@/components/types'
import { TopicActions } from './interfaces'

export type TopicStateT = {
  topic?: TopicType | null
}

const TopicState: TopicStateT = { topic: null }

export const TopicReducer = (
  state: TopicStateT = TopicState,
  action: TopicActions
): TopicStateT => {
  switch (action.type) {
    case 'OPEN_TOPIC':
      return { ...state, topic: action.topic }
    case 'CLOSE_TOPIC':
      return { ...state }
    default:
      return state
  }
}
