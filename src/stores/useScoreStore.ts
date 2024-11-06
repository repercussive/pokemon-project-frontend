import { create } from 'zustand'

type ScoreState = {
  score: number,
  targetScore: number,
  mistakes: number,
  incrementScore: () => void,
  incrementMistakes: () => void
}

export const useScoreStore = create<ScoreState>((set) => ({
  score: 0,
  targetScore: 5,
  mistakes: 0,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementMistakes: () => set((state) => ({ mistakes: state.mistakes + 1 }))
}))