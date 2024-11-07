import { API_RANDOM_QUESTION, API_VERIFY_ANSWER } from './_constants'
import { AnswerResult, MultipleChoiceQuestion } from './_types'

export const api = {
  fetchRandomQuestion: async (): Promise<MultipleChoiceQuestion> => {
    const response = await fetch(API_RANDOM_QUESTION)

    if (!response.ok) {
      const errorData = (await response.json()) as Record<string, string>
      throw new Error(errorData.message || "Failed to fetch question data")
    }

    return (await response.json()) as MultipleChoiceQuestion
  },

  verifyAnswer: async (correctPokemonId: number, guessedPokemonName: string): Promise<AnswerResult> => {
    const urlParams = new URLSearchParams({
      'correct_pokemon_id': correctPokemonId.toString(),
      'guessed_pokemon_name': guessedPokemonName
    }).toString()

    const response = await fetch(`${API_VERIFY_ANSWER}?${urlParams}`)
    
    if (!response.ok) {
      const errorData = (await response.json()) as Record<string, string>
      throw new Error(errorData.message || "Failed to verify answer")
    }

    return (await response.json()) as AnswerResult
  }
}