import { useFetchRandomQuestion as useFetchRandomQuestion } from '@hooks/useFetchRandomQuestion'
import { useVerifyAnswer } from '@hooks/useVerifyAnswer'
import { formatPokemonName } from '@helpers/formatPokemonName'
import { useScoreStore } from '@stores/useScoreStore'
import PokemonImage from '@components/PokemonImage'
import Button from '@components/Button'
import styles from '@components/styles/Game.module.scss'
import AnswerResultMessage from '@components/AnswerResultMessage'
import ScoreDisplay from '@src/components/ScoreDisplay'
import { useShallow } from 'zustand/shallow'

function Game() {
  // Score state
  const { incrementScore, incrementMistakes, score, targetScore } = useScoreStore(useShallow((state) => ({
    incrementScore: state.incrementScore,
    incrementMistakes: state.incrementMistakes,
    score: state.score,
    targetScore: state.targetScore
  })))
  
  // Mutations
  const fetchRandomQuestion = useFetchRandomQuestion()
  const verifyAnswer = useVerifyAnswer({
    onCorrectAnswer: incrementScore,
    onIncorrectAnswer: incrementMistakes
  })
  
  const generateNextQuestion = () => {
    fetchRandomQuestion.mutate()
    verifyAnswer.reset()
  }

  if (fetchRandomQuestion.isIdle) {
    return <Button onClick={generateNextQuestion}>Start!</Button>
  }

  // if (fetchRandomQuestion.isPending) return <p className={styles.loading}>. . .</p>
  if (fetchRandomQuestion.error) return `Error generating question: ${fetchRandomQuestion.error.message}`
  if (verifyAnswer.error) return `Error verifying answer: ${verifyAnswer.error.message}`

  return (
    <div className={styles.container}>
      <ScoreDisplay />

      <PokemonImage
        imageUrl={fetchRandomQuestion.data?.correctPokemonImageUrl ?? null}
        isRevealed={!verifyAnswer.isIdle}
      />

      <div>
        {fetchRandomQuestion.isPending && Array.from({ length: 4 }).map((_, i) => <Button disabled key={i}>...</Button>)}
        {fetchRandomQuestion.isSuccess && fetchRandomQuestion.data.pokemonNameOptions.map((pokemonName, index) => (
          <Button
            key={index}
            onClick={() => verifyAnswer.mutate({
              guessedPokemonName: pokemonName,
              correctPokemonId: fetchRandomQuestion.data.correctPokemonId
            })}
            disabled={!verifyAnswer.isIdle}
          >
            {formatPokemonName(pokemonName)}
          </Button>
        ))}
      </div>

      {verifyAnswer.isSuccess && <>
        <AnswerResultMessage {...verifyAnswer.data} />
        {score >= targetScore 
          ? <Button>Finish</Button> 
          : <Button onClick={generateNextQuestion}>Next question</Button>}
      </>}
    </div>
  )
}

export default Game