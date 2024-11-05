import type { UserAnswer } from '@src/_types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@src/api'

export function useVerifyAnswer() {
  return useMutation({
    mutationKey: ['verifyAnswer'],
    mutationFn: (answer: UserAnswer) => api.verifyAnswer(answer.correctPokemonId, answer.guessedPokemonName),
  })
}