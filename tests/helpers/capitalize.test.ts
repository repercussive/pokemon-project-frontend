import { capitalize } from '@src/helpers/capitalize'
import { test, expect } from 'vitest'

test('Works for normal strings', () => {
  const result = capitalize('hello')
  expect(result).toBe('Hello')
})