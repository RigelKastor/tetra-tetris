import React, { useState, useEffect } from 'react'
import classes from './styles.module.less'
import Avatar from '@components/Avatar/Avatar'
import { getUserInfo } from '@/api/leaderboardApi'
import { LeaderUserType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'

type LeaderCardProps = {
  user: number
  score: number
}

const LeaderCardSecond = ({ user, score, ...props }: LeaderCardProps) => {
  const [cardState, setCardState] = useState<LeaderUserType | null>(null)
  useEffect(() => {
    getUserInfo(user).then(userInfo => {
      if (userInfo) {
        setCardState({
          userId: user,
          avatar: userInfo.avatar,
          display_name:
            userInfo.display_name || userInfo.first_name || userInfo.login,
          score: score,
        })
      }
    })
  }, [])

  return (
    <>
      <div
        className={classes.leaderboardTableWrapper__item}
        key={`user_score_map_${user}`}
        {...props}>
        {!cardState ? (
          <Preloader />
        ) : (
          <>
            <Avatar size="xs" img={cardState.avatar} />
            <div className={classes.leaderboardTableWrapper__name}>
              {cardState.display_name}
            </div>
            <div className={classes.leaderboardTableWrapper__score}>
              {cardState.score.toLocaleString('ru-RU')}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default LeaderCardSecond
