import { test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@tests-root/test-utils'
import App from '@src/App'

test('Main header displays "Who\'s That Pokémon?"', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Who\'s That Pokémon?")
})