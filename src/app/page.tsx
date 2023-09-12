'use client'
import RenderProducts from '@/components/render-products'

import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h2>Cardápio do dia</h2>
        <RenderProducts dailyMenu={true} category="portions" />
      </main>
    </>
  )
}
