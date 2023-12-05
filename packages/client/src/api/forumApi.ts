import { CommentType, TopicType } from '@/components/types'
import { localApi } from './setupApi'

export const getAllTopics = () => {
  return localApi.get<TopicType[]>('/topics')
}
export const postNewTopic = (
  theme: string,
  commment: string,
  user_id: number
) => {
  return localApi.post<TopicType>('/topics', {
    user_id: user_id,
    theme: theme,
    body: commment,
  })
}

export const getAllComments = (topicId: number) => {
  return localApi.get<CommentType[]>('/comments/' + topicId)
}

export const getTopic = (topicId: number) => {
  return localApi.get('/topics/' + topicId)
}
