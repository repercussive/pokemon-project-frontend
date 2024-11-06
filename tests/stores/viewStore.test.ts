import { test, expect } from 'vitest'
import { useViewStore } from '@stores/useViewStore'
import { act, renderHook } from '@testing-library/react'
import { View } from '@src/_types'

// Helpers
const renderUseViewStore = () => {
  const { result: scoreStore } = renderHook(() => useViewStore())
  return scoreStore
}

// Tests
test('Defaults to intro view', () => {
  const viewStore = renderUseViewStore()
  expect(viewStore.current.currentView).toBe('intro')
})

test.each(['game', 'victory'] as View[])('Switching views works (switching to %s view)', (newView) => {
  const viewStore = renderUseViewStore()
  act(() => viewStore.current.setView(newView))
  expect(viewStore.current.currentView).toBe(newView)
})