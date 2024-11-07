import { test, expect } from 'vitest'
import { useScoreStore } from '@stores/useScoreStore'
import { act, renderHook } from '@testing-library/react'

// Helpers
const renderUseScoreStore = () => {
  const { result: scoreStore } = renderHook(() => useScoreStore())
  return scoreStore
}

// Tests
test('Score defaults to 0', () => {
  const scoreStore = renderUseScoreStore()
  expect(scoreStore.current.score).toBe(0)
})

test('Mistakes defaults to 0', () => {
  const scoreStore = renderUseScoreStore()
  expect(scoreStore.current.mistakes).toBe(0)
})

test('Target score defaults to 5', () => {
  const scoreStore = renderUseScoreStore()
  expect(scoreStore.current.targetScore).toBe(5)
})

test('Score increments correctly', () => {
  const scoreStore = renderUseScoreStore()

  act(() => scoreStore.current.incrementScore())
  act(() => scoreStore.current.incrementScore())
  act(() => scoreStore.current.incrementScore())

  expect(scoreStore.current.score).toBe(3)
})

test('Mistakes increment correctly', () => {
  const scoreStore = renderUseScoreStore()

  act(() => scoreStore.current.incrementMistakes())
  act(() => scoreStore.current.incrementMistakes())
  act(() => scoreStore.current.incrementMistakes())

  expect(scoreStore.current.mistakes).toBe(3)
})

test('Resetting store store works', () => {
  const scoreStore = renderUseScoreStore()

  // Diverge from default state
  act(() => scoreStore.current.incrementScore())
  act(() => scoreStore.current.incrementMistakes())

  // Reset
  act(() => scoreStore.current.resetScore())

  expect(scoreStore.current.score).toBe(0)
  expect(scoreStore.current.mistakes).toBe(0)
})