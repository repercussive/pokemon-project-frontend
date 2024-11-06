import styles from '@components/styles/PokemonImage.module.scss'
import { useEffect, useState } from 'react'

type PokemonImageProps = {
  imageUrl: string | null | undefined,
  isRevealed: boolean
}

function PokemonImage({ imageUrl, isRevealed }: PokemonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
  }, [imageUrl])

  return (
    <div className={styles.container}>
      <img
        src={imageUrl ?? ''}
        data-is-revealed={isRevealed}
        data-is-loaded={isLoaded}
        onLoad={() => setIsLoaded(true) }
        alt="an unknown Pokémon"
      />
      <div role="presentation" />
    </div>
  )
}

export default PokemonImage