import { test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@tests-root/test-utils'
import IntroView from '@components/IntroView'

test('Intro view contains "Start" button', () => {
  render(<IntroView />)
  expect(screen.getByRole('button')).toHaveTextContent(/start/i)
})