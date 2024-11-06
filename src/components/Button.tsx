import { ComponentPropsWithoutRef, forwardRef, PropsWithChildren } from 'react'
import styles from '@components/styles/Button.module.scss'

export type ButtonProps = PropsWithChildren<ComponentPropsWithoutRef<'button'>>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return (
    <button ref={ref} {...props} className={styles.button}>
      <span className={styles.front}>
        {props.children}
      </span>
    </button>
  )
})

export default Button