import React, { useLayoutEffect, useState } from 'react'
import PageFrame from '@components/PageFrame/PageFrame'
import LeaderCard from '@components/LeaderCard/LeaderCard'
import classes from './styles.module.less'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import { getLeaderboard } from '@/api/leaderboardApi'
import Preloader from '@components/Preloader/Preloader'
import { PositionType } from '@components/types'
import LeaderCardSecond from '@components/LeaderCardSecond/LeaderCardSecond'

const position: PositionType[] = ['first', 'second', 'third']

type FirstUserInfo = { userId: number; score: number }

const LeaderboardPage = () => {
  const [leadersState, setLeadersState] = useState<{
    loading: boolean
    leaders: FirstUserInfo[]
  }>({
    loading: true,
    leaders: [],
  })
  useLayoutEffect(() => {
    getLeaderboard().then((users: FirstUserInfo[]) => {
      setLeadersState({
        loading: false,
        leaders: users,
      })
    })
  }, [])

  return (
    <PageFrame pageType="leaderboard">
      {leadersState.loading ? (
        <Preloader />
      ) : (
        <>
          <div className={classes.leadersCardWrapper}>
            {leadersState.leaders.slice(0, 3).map((item, key) => (
              <ErrorBoundary>
                <LeaderCard
                  user={item.userId}
                  score={item.score}
                  className={classes.leadersCardWrapper__card}
                  position={position[key]}
                  key={`leader_card_${position[key]}`}
                />
              </ErrorBoundary>
            ))}
          </div>
          <div className={classes.leaderboardTableWrapper}>
            {leadersState.leaders.slice(3).map((item, key) => (
              <LeaderCardSecond
                user={item.userId}
                score={item.score}
                key={`user_score_map_${key}_${item.userId}`}
              />
            ))}
          </div>
        </>
      )}
    </PageFrame>
  )
}

export default LeaderboardPage
