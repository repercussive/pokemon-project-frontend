import type { AnswerResult, MultipleChoiceQuestion } from '@src/_types'
import { describe, test, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { render } from '@tests-root/test-utils'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { API_RANDOM_QUESTION, API_VERIFY_ANSWER } from '@src/_constants'
import Game from '@components/Game'

// Intercept & mock /random-question API endpoint
const server = setupServer(
  http.get(API_RANDOM_QUESTION, () => HttpResponse.json({
    correctPokemonId: 1,
    correctPokemonImageUrl: '',
    pokemonNameOptions: ['bulbasaur', 'ivysaur', 'venusaur', 'charmander']
  } as MultipleChoiceQuestion))
)

// Setup & teardown
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

// Helpers
const startGame = async () => {
  render(<Game />)
  userEvent.click(screen.getByRole('button', { name: /start/i }))
  await screen.findByRole('img')
}

// Tests
describe('Starting the game', () => {
  test('Displays start button before game begins', () => {
    render(<Game />)
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  test('When the game starts, displays an image', async () => {
    await startGame()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('When the game starts, displays 4 buttons with the 4 Pokémon names', async () => {
    await startGame()
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('Bulbasaur')
    expect(buttons[1]).toHaveTextContent('Ivysaur')
    expect(buttons[2]).toHaveTextContent('Venusaur')
    expect(buttons[3]).toHaveTextContent('Charmander')
  })
})

describe('Answering correctly', () => {
  beforeEach(() => {
    server.use(http.get(API_VERIFY_ANSWER, () => HttpResponse.json({
      correctPokemonImageUrl: '', correctPokemonName: 'bulbasaur', isCorrect: true
    } as AnswerResult)))
  })

  test('When the user answers correctly, displays "Correct"', async () => {
    await startGame()
    userEvent.click(screen.getByText("Bulbasaur"))
    const correctText = await screen.findByText(/correct/i)
    expect(correctText).toBeInTheDocument()
  })

  test('When the user answers correctly, displays a message with the name of the correct Pokémon', async () => {
    await startGame()
    userEvent.click(screen.getByText("Bulbasaur"))
    const pokemonNameText = await screen.findByText(/bulbasaur/i, { selector: ':not(button)' })
    expect(pokemonNameText).toBeInTheDocument()
  })
})

describe('Answering incorrectly', () => {
  beforeEach(() => {
    server.use(http.get(API_VERIFY_ANSWER, () => HttpResponse.json({
      correctPokemonImageUrl: '', correctPokemonName: 'bulbasaur', isCorrect: false
    } as AnswerResult)))
  })

  test('When the user answers correctly, displays "Not quite"', async () => {
    await startGame()
    userEvent.click(screen.getByText("Charmander"))
    const incorrectText = await screen.findByText(/not quite/i)
    expect(incorrectText).toBeInTheDocument()
  })

  test('When the user answers incorrectly, displays a message with the name of the correct Pokémon', async () => {
    await startGame()
    userEvent.click(screen.getByText("Bulbasaur"))
    const pokemonNameText = await screen.findByText(/bulbasaur/i, { selector: ':not(button)' })
    expect(pokemonNameText).toBeInTheDocument()
  })
})
