import React, { useState, useEffect } from 'react'
import classes from './styles.module.less'
import Avatar from '@components/Avatar/Avatar'
import classNames from 'classnames'
import { getGamersInfo } from '@/api/leaderboardApi'
import { LeaderUserType, PositionType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'

const cx = classNames.bind(classes)

type LeaderCardProps = {
  user: number
  score: number
  className?: string
  position: PositionType
}

const positionTitle = {
  first: 'First',
  second: 'Second',
  third: 'Third',
}

const LeaderCard = ({ user, score, position, className }: LeaderCardProps) => {
  const [cardState, setCardState] = useState<LeaderUserType | null>(null)
  useEffect(() => {
    getGamersInfo(user).then(userInfo => {
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
    <div className={cx(className)}>
      {!cardState ? (
        <Preloader />
      ) : (
        <>
          <div
            className={cx(
              classes.leaderCard,
              classes[`leaderCard__${position}`]
            )}>
            <Avatar size="lg" img={cardState.avatar} />
            <div className={classes.leaderCard__name}>
              {cardState.display_name}
            </div>
            <div className={classes.leaderCard__score}>
              Score: {cardState.score.toLocaleString('ru-RU')}
            </div>
          </div>
          <div className={classes.leaderCard__position}>
            {positionTitle[position]}
          </div>
        </>
      )}
    </div>
  )
}

export default LeaderCard
