import { create } from 'zustand'

type ScoreState = {
  score: number,
  targetScore: number,
  mistakes: number,
  incrementScore: () => void,
  incrementMistakes: () => void,
  resetScore: () => void
}

export const useScoreStore = create<ScoreState>((set) => ({
  score: 0,
  targetScore: 5,
  mistakes: 0,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementMistakes: () => set((state) => ({ mistakes: state.mistakes + 1 })),
  resetScore: () => set(() => ({ score: 0, mistakes: 0 }))
}))