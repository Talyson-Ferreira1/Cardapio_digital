'use client'

import { useEffect, useState } from 'react'

import styles from '@/styles/dashboard.module.scss'
import { usePathname } from 'next/navigation'

interface props {
  selectedCategory: (category: string) => void
}

export default function SelectCategory({ selectedCategory }: props) {
  const pathName = usePathname()
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [showDailyMenu, setShowDailyMenu] = useState<boolean>(false)

  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value)
  }

  useEffect(() => {
    selectedCategory(filterCategory)

    if (pathName === '/dashboard/cardapio-do-dia') {
      setShowDailyMenu(true)
    }
  }, [filterCategory])

  return (
    <>
      <select
        name="category"
        className={styles.filter_input}
        onChange={filterChange}
      >
        <option value="" selected>
          Todos os produtos
        </option>
        {showDailyMenu && <option value="daily_menu">Cardápio do dia</option>}
        <option value="portions">Porções</option>
        <option value="recommendation">Recomendações</option>
        <option value="meals">Refeições Prontas</option>
        <option value="drinks">Bebidas</option>
        <option value="desserts">Sobremesas</option>
      </select>
    </>
  )
}
