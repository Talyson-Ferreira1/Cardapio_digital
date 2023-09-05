'use client'
import styles from '../../styles/Loaders.module.scss'

export default function LoadingNullPage() {
  return (
    <main className={styles.container}>
      <div className={styles.spinner_null_page}></div>
    </main>
  )
}
