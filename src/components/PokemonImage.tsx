import styles from '@components/styles/PokemonImage.module.scss'

type PokemonImageProps = {
  imageUrl: string,
  visible: boolean
}

function PokemonImage({ imageUrl, visible }: PokemonImageProps) {
  return (
    <img
      src={imageUrl}
      data-visible={visible}
      alt="an unknown Pokémon"
      className={styles.image}
    />
  )
}

export default PokemonImage