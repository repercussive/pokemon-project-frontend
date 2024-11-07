import { PropsWithChildren } from 'react'
import styles from '@components/styles/InfoSection.module.scss'

function InfoSection({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default InfoSection