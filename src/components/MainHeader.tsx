import styles from '@components/styles/MainHeader.module.scss'

function MainHeader() {
  return (
    <header className={styles.header}>
      <h1><span>Who's</span>{' '}<span>That</span>{' '}<span>Pokémon?</span></h1>
    </header>
  )
}

export default MainHeader