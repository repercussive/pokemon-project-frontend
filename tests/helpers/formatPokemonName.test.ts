import { test, expect } from 'vitest'
import { formatPokemonName } from '@helpers/formatPokemonName' 

test('Formats normal Pokémon names correctly', () => {
  const formattedName = formatPokemonName('pikachu')
  expect(formattedName).toBe('Pikachu')
})

test.each([
  ['nidoran-f', 'Nidoran (Female)'],
  ['nidoran-m', 'Nidoran (Male)'],
  ['farfetchd', 'Farfetch\'d'],
  ['mr-mime', 'Mr. Mime']
])('Formats exceptional Pokémon names correctly: "%s" -> "%s"', (unformattedName, expected) => {
  const formattedName = formatPokemonName(unformattedName)
  expect(formattedName).toBe(expected)
})