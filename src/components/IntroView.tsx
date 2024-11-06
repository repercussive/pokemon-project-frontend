import { useViewStore } from '@stores/useViewStore'
import Button from '@components/Button'
import styles from '@components/styles/IntroView.module.scss'

function IntroView() {
  const setView = useViewStore((state) => state.setView)

  return (
    <div className={styles.container}>
      <section>
        <h2>Get ready to play!</h2>
        <ul>
          <li>You will see the silhouette of a mystery Pokémon appear on screen.</li>
          <li>Select the name of the correct Pokémon.</li>
          <li>Guess correctly 5 times to win.</li>
        </ul>
      </section>
      <Button onClick={() => setView('game')}>Start</Button>
    </div>
  )
}

export default IntroView