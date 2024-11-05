import { API_RANDOM_QUESTION, API_VERIFY_ANSWER } from './_constants'
import { AnswerResult, MultipleChoiceQuestion } from './_types'

export const api = {
  fetchRandomQuestion: async (): Promise<MultipleChoiceQuestion> => {
    const response = await fetch(API_RANDOM_QUESTION)
    return await response.json()
  },

  verifyAnswer: async (correctPokemonId: number, guessedPokemonName: string): Promise<AnswerResult> => {
    const urlParams = new URLSearchParams({
      'correct_pokemon_id': correctPokemonId.toString(),
      'guessed_pokemon_name': guessedPokemonName
    }).toString()
    
    const response = await await fetch(`${API_VERIFY_ANSWER}?${urlParams}`)
    return await response.json()
  }
}