'use client'

import LoadingHorizontalCard from '@/components/Loading/loading-Horizontal'
import LoadingVerticalCard from '@/components/Loading/loading-vertical'
import { useEffect, useState } from 'react'

import styles from '@/styles/pages-styles.module.scss'

export default function LoadingPortions() {
  const [directionFlex, setDirectionFlex] = useState('')

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth > 715
        ? setDirectionFlex('horizontal')
        : setDirectionFlex('vertical')
    }

    handleResize()

    window.addEventListener('resize', handleResize)
  }, [])
  return (
    <main className={styles.main}>
      {directionFlex === 'horizontal' && <LoadingHorizontalCard />}
      {directionFlex === 'vertical' && <LoadingVerticalCard />}
    </main>
  )
}
