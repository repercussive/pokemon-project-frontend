import type { UserAnswer } from '@src/_types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@src/api'

export function useVerifyAnswer({ onCorrectAnswer, onIncorrectAnswer }: {
  onCorrectAnswer: () => void,
  onIncorrectAnswer: () => void
}) {
  return useMutation({
    mutationKey: ['verifyAnswer'],
    mutationFn: (answer: UserAnswer) => api.verifyAnswer(answer.correctPokemonId, answer.guessedPokemonName),
    onSuccess: (data) => {
      data.isCorrect ? onCorrectAnswer() : onIncorrectAnswer()
    }
  })
}