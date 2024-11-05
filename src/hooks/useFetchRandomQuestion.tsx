import { useMutation } from '@tanstack/react-query'
import { api } from '@src/api'

export function useFetchRandomQuestion() {
  return useMutation({
    mutationKey: ['randomQuestion'],
    mutationFn: api.fetchRandomQuestion
  })
}