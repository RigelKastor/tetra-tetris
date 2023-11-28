import { TopicType } from '@/components/types'
import { localApi } from './setupApi'

export const getAllTopics = () => {
  return localApi.get<TopicType[]>('/topics')
}
export const postNewTopic = (
  theme: string,
  commment: string,
  user_id: number
) => {
  return localApi.post('/topics', {
    user_id: user_id,
    theme: theme,
    body: commment,
  })
}