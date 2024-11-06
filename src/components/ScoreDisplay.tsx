import { useScoreStore } from '@src/stores/useScoreStore'
import styles from '@components/styles/ScoreDisplay.module.scss'

function ScoreDisplay() {
  const score = useScoreStore((state) => state.score)
  const targetScore = useScoreStore((state) => state.targetScore)

  const hasWon = score >= targetScore

  return (
    <div className={styles.container}>
      <p>{hasWon ? <span>You won!</span> : <>Reach <span>{targetScore}</span> points to win</>}</p>

      <div className={styles.points}>
        {Array.from({ length: targetScore }).map((_, index) => (
          <div data-active={index < score} key={index} role="presentation" />
        ))}
      </div>
    </div>
  )
}

export default ScoreDisplay