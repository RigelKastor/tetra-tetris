import { yandexApi } from '@/api/setupApi'
import { UserType } from '@components/types'

const RATING_FIELD_NAME = 'tetraTetris'

export const getUserInfo = (id: number) => {
  return yandexApi
    .get(`user/${id}`)
    .then(res => res.data)
    .catch(reason => {
      console.log(reason)
      return {}
    })
}

type LeaderType = {
  data: {
    tetraTetris: number
    userId: number
  }
  ratingFieldName: string
  teamName: string
}

type LeaderUserInfoType = {
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
    .then(res => {
      const leaderUsers: LeaderUserInfoType[] = []
      res.data.forEach(async (user: LeaderType) => {
        console.log('=user', user)
        const userInfo = await getUserInfo(user.data.userId)
        if (userInfo) {
          leaderUsers.push({ user: userInfo, score: user.data.tetraTetris })
        }
      })

      console.log('=leaderUsers', leaderUsers)

      return leaderUsers
    })
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
