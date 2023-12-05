import { TopicType } from '@/components/types'
import { openTopicI, closeTopicI } from '../../interfaces'
import { TopicAction } from '../action-types'

export const openTopicAC = (topic: TopicType): openTopicI => {
  return {
    type: TopicAction.OPEN_TOPIC,
    topic,
  }
}

export const closeTopicAC = (): closeTopicI => {
  return {
    type: TopicAction.CLOSE_TOPIC,
  }
}
