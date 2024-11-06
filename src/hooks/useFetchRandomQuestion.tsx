import { useQuery } from '@tanstack/react-query'
import { api } from '@src/api'

export function useFetchRandomQuestion() {
  return useQuery({
    queryKey: ['randomQuestion'],
    queryFn: api.fetchRandomQuestion,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  })
}