import { useFetchRandomQuestion as useFetchRandomQuestion } from '@src/hooks/useFetchRandomQuestion'
import { useVerifyAnswer } from '@src/hooks/useVerifyAnswer'
import { formatPokemonName } from '@src/helpers/formatPokemonName'
import PokemonImage from '@src/components/PokemonImage'
import Button from '@src/components/Button'
import styles from '@src/components/styles/Game.module.scss'
import AnswerResultMessage from '@src/components/AnswerResultMessage'

function Game() {
  const fetchRandomQuestion = useFetchRandomQuestion()
  const verifyAnswer = useVerifyAnswer()

  const generateNextQuestion = () => {
    fetchRandomQuestion.mutate()
    verifyAnswer.reset()
  }

  if (fetchRandomQuestion.isIdle) {
    return <Button onClick={generateNextQuestion}>Start!</Button>
  }

  if (fetchRandomQuestion.isPending) return <p className={styles.loading}>. . .</p>
  if (fetchRandomQuestion.error) return `Error generating question: ${fetchRandomQuestion.error.message}`
  if (verifyAnswer.error) return `Error verifying answer: ${verifyAnswer.error.message}`

  return (
    <div className={styles.container}>
      <PokemonImage
        imageUrl={fetchRandomQuestion.data.correctPokemonImageUrl}
        visible={!verifyAnswer.isIdle}
      />

      <div>
        {fetchRandomQuestion.data.pokemonNameOptions.map((pokemonName, index) => (
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
        <Button onClick={generateNextQuestion}>Next question</Button>
      </>}
    </div>
  )
}

export default Game