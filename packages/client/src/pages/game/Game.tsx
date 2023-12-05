import { useEffect, useMemo, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import GameStartMenu from './components/GameStartMenu'
import GameEnd from './components/GameEnd'
import useGameApi from '@/hooks/useGameApi'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import { saveGameResult } from '@/api/leaderboardApi'
import { exitFullscreen, requestFullscreen } from '@/utils/requestFullscreen'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { canUseDOM } from '@/utils/canUseDom'

const Game: React.FC = () => {
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()
  const [gameScore, setGameScore] = useState({ score: 0, speed: 0 })
  const [nextShape, setNextShape] = useState<string>()
  const { user } = useTypedSelector(state => state.User)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const gameApi = useGameApi({
    element: canvasRef.current as HTMLCanvasElement,
    setScore: setGameScore,
    setGameEnd: setIsGameEnded,
    setNextShape: setNextShape,
  })
  useEffect(() => {
    let fullScreen = false
    function onFullScreenChanged(ev: KeyboardEvent) {
      if (ev.key.toLocaleLowerCase() == 'f') {
        const gameEl = document.getElementsByClassName(classes.game)
        if (gameEl && gameEl.length) {
          if (!fullScreen) {
            fullScreen = true
            requestFullscreen(gameEl[0])
          } else {
            fullScreen = false
            exitFullscreen()
          }
        }
      }
    }
    if (canUseDOM) {
      document.addEventListener('keydown', onFullScreenChanged)
      return () => document.removeEventListener('keydown', onFullScreenChanged)
    }
  }, [])

  useEffect(() => {
    if (startCountdown === '') {
      gameApi?.startGame()
    }
  }, [startCountdown, gameApi])

  const restartGame = () => {
    setIsGameStarted(false)
    setIsGameEnded(false)
    setStartCountdown(3)
    clearInterval(intervalId)
    setNextShape('')
  }

  const content = useMemo(() => {
    if (isGameEnded) {
      if (user) {
        saveGameResult(gameScore.score, user.id)
      }
      return (
        <GameEnd setIsGameRestarted={restartGame} score={gameScore.score} />
      )
    }

    if (!isGameStarted) {
      return (
        <GameStartMenu
          setIsGameStarted={setIsGameStarted}
          setStartCountdown={setStartCountdown}
          setIntervalId={setIntervalId}
        />
      )
    }

    return (
      <>
        {startCountdown && (
          <span className={classes.game__countdown}>{startCountdown}</span>
        )}
        <ErrorBoundary fallback={<p>Игра не доступна</p>}>
          <canvas
            ref={canvasRef}
            width="420"
            height="600"
            className={classes.game__field}
          />
        </ErrorBoundary>
        <div className={classes.game__score}>
          <button
            className={classes.game__btnBack}
            onClick={() => {
              setIsGameEnded(true)
              gameApi?.gameOver()
            }}>
            Выйти
          </button>
          <p>Score: {gameScore.score}</p>
          <p>Speed: {gameScore.speed}</p>
          {nextShape && (
            <div className={classes.game__nextBlock}>
              Next:{' '}
              <img
                style={{
                  width: 50,
                  height: 50,
                }}
                src={`../../../public/${nextShape}.svg`}
                alt="next shape"
              />
            </div>
          )}
        </div>
      </>
    )
  }, [isGameEnded, isGameStarted, gameScore, nextShape, startCountdown])

  if (startCountdown === 0) {
    clearInterval(intervalId)
    setStartCountdown('Start')
    setGameScore({ score: 0, speed: 0 })
    setTimeout(() => {
      setStartCountdown('')
    }, 500)
  }

  return (
    <PageFrame pageType="game">
      <div className={classes.game} ref={divRef}>
        {content}
      </div>
    </PageFrame>
  )
}

export default Game
