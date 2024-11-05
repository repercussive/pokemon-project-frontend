import { useFetchRandomQuestion as useFetchRandomQuestion } from '@src/hooks/useFetchRandomQuestion'
import { useVerifyAnswer } from '@src/hooks/useVerifyAnswer'
import { formatPokemonName } from '@src/helpers/formatPokemonName'
import PokemonImage from '@src/components/PokemonImage'

function Game() {
  const fetchRandomQuestion = useFetchRandomQuestion()
  const verifyAnswer = useVerifyAnswer()

  const generateNextQuestion = () => {
    fetchRandomQuestion.mutate()
    verifyAnswer.reset()
  }

  if (fetchRandomQuestion.isIdle) {
    return <button onClick={generateNextQuestion}>Start!</button>
  }

  if (fetchRandomQuestion.isPending) return 'Loading question...'
  if (fetchRandomQuestion.error) return `Error generating question: ${fetchRandomQuestion.error.message}`
  if (verifyAnswer.error) return `Error verifying answer: ${verifyAnswer.error.message}`

  return (
    <div>
      <PokemonImage
        imageUrl={fetchRandomQuestion.data.correctPokemonImageUrl}
        visible={!verifyAnswer.isIdle}
      />

      {fetchRandomQuestion.data.pokemonNameOptions.map((pokemonName, index) => (
        <button
          key={index}
          onClick={() => verifyAnswer.mutate({
            guessedPokemonName: pokemonName,
            correctPokemonId: fetchRandomQuestion.data.correctPokemonId
          })}
          disabled={!verifyAnswer.isIdle}
        >
          {formatPokemonName(pokemonName)}
        </button>
      ))}

      {verifyAnswer.isSuccess && <>
        <p>
          {verifyAnswer.data.isCorrect ? 'Correct!' : 'Not quite!'}
          {' '}<br />It's <b>{formatPokemonName(verifyAnswer.data.correctPokemonName)}</b>.
        </p>
        <button onClick={generateNextQuestion}>Next question</button>
      </>}
    </div>
  )
}

export default Game