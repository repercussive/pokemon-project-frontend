import { formatPokemonName } from '@src/helpers/formatPokemonName'
import styles from '@src/components/styles/AnswerResultMessage.module.scss'

type AnswerResultProps = {
  isCorrect: boolean,
  correctPokemonName: string
}

function AnswerResultMessage({ isCorrect, correctPokemonName }: AnswerResultProps) {
  return (
    <div data-correct={isCorrect} className={styles.container}>
      <p>
        {isCorrect ? 'Correct!' : 'Not quite!'}
      </p>
      <p>
        It's <b>{formatPokemonName(correctPokemonName)}</b>.
      </p>
    </div>
  )
}

export default AnswerResultMessage
