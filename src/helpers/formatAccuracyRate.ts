export function formatAccuracyRate({ targetScore, mistakes }: { targetScore: number, mistakes: number }) {
  const totalGuesses = targetScore + mistakes
  const accuracy = targetScore / totalGuesses * 100
  return `${accuracy.toFixed(1)}%`
}