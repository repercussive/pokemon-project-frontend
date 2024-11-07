import { formatAccuracyRate } from '@helpers/formatAccuracyRate'
import { test, expect } from 'vitest'

test('Works for 100% accuracy', () => {
  const result = formatAccuracyRate({ targetScore: 5, mistakes: 0 })
  expect(result).toBe('100.0%')
})

test('Works for 50% accuracy', () => {
  const result = formatAccuracyRate({ targetScore: 5, mistakes: 5 })
  expect(result).toBe('50.0%')
})

test('83.333...% accuracy rounds to 83.3%', () => {
  const result = formatAccuracyRate({ targetScore: 5, mistakes: 1 })
  expect(result).toBe('83.3%')
})

test('55.555...% accuracy rounds to 55.6%', () => {
  const result = formatAccuracyRate({ targetScore: 5, mistakes: 4 })
  expect(result).toBe('55.6%')
})