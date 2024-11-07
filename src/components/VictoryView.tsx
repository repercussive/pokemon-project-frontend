import { formatAccuracyRate } from '@helpers/formatAccuracyRate'
import { useViewStore } from '@stores/useViewStore'
import { useScoreStore } from '@stores/useScoreStore'
import Button from '@components/Button'
import styles from '@components/styles/VictoryView.module.scss'
import InfoSection from '@src/components/InfoSection'

function VictoryView() {
  const setView = useViewStore((state) => state.setView)
  const { mistakes, targetScore, resetScore } = useScoreStore()

  const playAgain = () => {
    resetScore()
    setView('game')
  }

  const perfectAccuracy = mistakes === 0

  return (
    <div className={styles.container}>
      <InfoSection>
        <h2>You won!</h2>
        <ul>
          <li>You guessed correctly <b className="success">{targetScore}</b> times.</li>
          <li>
            You also guessed incorrectly{' '}
            <b className={perfectAccuracy ? "success" : "failure"}>{mistakes}{' '}</b>
            time{mistakes === 1 ? '' : 's'}.
          </li>
          <li>
            Overall, your accuracy rate was{' '}
            <b className={perfectAccuracy ? "success" : "failure"}>{formatAccuracyRate({ targetScore, mistakes })}</b>.
          </li>
        </ul>
      </InfoSection>

      <Button onClick={playAgain}>Play again</Button>
    </div>
  )
}



export default VictoryView