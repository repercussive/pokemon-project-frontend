import { useFetchRandomQuestion as useFetchRandomQuestion } from '@hooks/useFetchRandomQuestion'
import { useVerifyAnswer } from '@hooks/useVerifyAnswer'
import { formatPokemonName } from '@helpers/formatPokemonName'
import { useScoreStore } from '@stores/useScoreStore'
import { useViewStore } from '@stores/useViewStore'
import { useShallow } from 'zustand/shallow'
import PokemonImage from '@components/PokemonImage'
import Button from '@components/Button'
import AnswerResultMessage from '@components/AnswerResultMessage'
import ScoreDisplay from '@components/ScoreDisplay'
import styles from '@components/styles/GameView.module.scss'
import ErrorMessage from '@src/components/ErrorMessage'

function GameView() {
  // App state
  const { incrementScore, incrementMistakes, score, targetScore } = useScoreStore(useShallow((state) => ({
    incrementScore: state.incrementScore,
    incrementMistakes: state.incrementMistakes,
    score: state.score,
    targetScore: state.targetScore
  })))
  const setView = useViewStore((state) => state.setView)

  // Queries & mutations
  const fetchRandomQuestion = useFetchRandomQuestion()
  const verifyAnswer = useVerifyAnswer({
    onCorrectAnswer: incrementScore,
    onIncorrectAnswer: incrementMistakes
  })

  const generateNextQuestion = () => {
    fetchRandomQuestion.refetch()
    verifyAnswer.reset()
  }

  const error = fetchRandomQuestion.error || verifyAnswer.error
  if (error) {
    return <ErrorMessage error={error} />
  }

  console.log(fetchRandomQuestion.isSuccess)

  return (
    <div className={styles.container}>
      <ScoreDisplay />

      <PokemonImage
        imageUrl={fetchRandomQuestion.isFetching ? null : fetchRandomQuestion.data?.correctPokemonImageUrl}
        isRevealed={!verifyAnswer.isIdle}
      />

      <div>
        {fetchRandomQuestion.isFetching && Array.from({ length: 4 }).map((_, i) => <Button disabled key={i} />)}
        {(!fetchRandomQuestion.isFetching && fetchRandomQuestion.isSuccess) && fetchRandomQuestion.data.pokemonNameOptions.map((pokemonName, index) => (
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
          ? <Button onClick={() => setView('victory')}>Finish</Button>
          : <Button onClick={generateNextQuestion}>Next question</Button>}
      </>}
    </div>
  )
}

export default GameView