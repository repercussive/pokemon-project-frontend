export type View = 'intro' | 'game' | 'victory'

export type MultipleChoiceQuestion = {
  correctPokemonId: number,
  correctPokemonImageUrl: string,
  pokemonNameOptions: string[]
}

export type UserAnswer = {
  correctPokemonId: number,
  guessedPokemonName: string
}

export type AnswerResult = {
  correctPokemonName: string,
  correctPokemonImageUrl: string,
  isCorrect: boolean
}