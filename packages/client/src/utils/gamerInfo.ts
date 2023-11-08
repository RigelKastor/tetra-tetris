import { getGamerInfo } from '@/api/leaderboardApi'
import { LeaderUserType } from '@components/types'

export const gamerInfo = (
  gamerId: number,
  score: number,
  callback: (gamer: LeaderUserType | null) => void
) => {
  getGamerInfo(gamerId).then(gamerInfo => {
    if (gamerInfo) {
      callback({
        userId: gamerId,
        avatar: gamerInfo.avatar,
        display_name:
          gamerInfo.display_name || gamerInfo.first_name || gamerInfo.login,
        score: score,
      })
    }
  })
}
