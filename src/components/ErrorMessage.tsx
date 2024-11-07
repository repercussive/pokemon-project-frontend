import { useViewStore } from '@src/stores/useViewStore'
import styles from '@components/styles/ErrorMessage.module.scss'
import Button from '@src/components/Button'

const messageTranslations: Record<string, string> = {
  'Failed to fetch': 'The server could not be reached. Please contact support at pikachu@whosthatpokemon.com'
}

function ErrorMessage({ error }: { error: Error }) {
  const setView = useViewStore((state) => state.setView)

  const errorMessage = messageTranslations[error.message] ?? error.message

  return (
    <div className={styles.container}>
      <div>
        <p>
          Error
        </p>
        <p>
          Details: <span>{errorMessage}</span>
        </p>
      </div>

      <Button onClick={() => setView('intro')}>Home</Button>
    </div>
  )
}

export default ErrorMessage