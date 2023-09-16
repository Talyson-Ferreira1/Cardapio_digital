'use client'
import RenderProducts from '@/components/render-products'
import FoodIlustration from '@/components/ilustrations'

import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import TimeTablesNeon from '@/components/horario-de-funcionamento'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathName = usePathname()
  const isHomePage = pathName === '/' ? true : false
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return (
    <>
      {isHomePage && pageLoaded && <TimeTablesNeon />}
      <main className={styles.main}>
        <h2>Cardápio do dia</h2>
        <RenderProducts dailyMenu={true} category="portions" />
        <FoodIlustration />
      </main>
    </>
  )
}
