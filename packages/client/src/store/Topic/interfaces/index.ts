import { TopicType } from '@/components/types'
import { TopicAction } from '../action/action-types'

export interface openTopicI {
  type: TopicAction.OPEN_TOPIC
  topic: TopicType
}

export interface closeTopicI {
  type: TopicAction.CLOSE_TOPIC
}

export type TopicActions = openTopicI | closeTopicI
