import { capitalize } from '@src/helpers/capitalize'

const exceptions: Record<string, string> = {
  'nidoran-f': 'Nidoran (Female)',
  'nidoran-m': 'Nidoran (Male)',
  'farfetchd': 'Farfetch\'d',
  'mr-mime': 'Mr. Mime'
}

export function formatPokemonName(pokemonName: string) {
  return exceptions[pokemonName] ?? capitalize(pokemonName)
}