import { yandexApi } from '@/api/setupApi'
import { UserType } from '@components/types'
import { resourcesUrl } from '@/utils/constants'

const RATING_FIELD_NAME = 'tetraTetris'

export const getGamerInfo = (id: number) => {
  return yandexApi
    .get(`user/${id}`)
    .then(res => ({
      ...res.data,
      avatar: res.data.avatar ? `${resourcesUrl}${res.data.avatar}` : null,
    }))
    .catch(reason => {
      console.log(reason)
      return {}
    })
}

type LeaderTypeData = {
  tetraTetris: number
  userId: number
}

type LeaderType = {
  data: LeaderTypeData
  ratingFieldName: string
  teamName: string
}

export type LeaderUserInfoType = {
  user: UserType
  score: number
}

export const getLeaderboard = () => {
  const data = {
    ratingFieldName: RATING_FIELD_NAME,
    cursor: 0,
    limit: 100,
  }
  return yandexApi
    .post('leaderboard/all', data)
    .then(result =>
      result.data.map((item: LeaderType) => ({
        userId: item.data.userId,
        score: item.data.tetraTetris,
      }))
    )
    .catch(reason => {
      console.log(reason)
      return []
    })
}

export const saveGameResult = (score: number, userId: number) => {
  const data = {
    data: {
      tetraTetris: score,
      userId,
    },
    ratingFieldName: RATING_FIELD_NAME,
  }
  yandexApi.post('leaderboard', data).catch(reason => {
    console.log(reason)
  })
}
