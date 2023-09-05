'use client'
import { FetchProductsinDB } from '@/functions/fetch-products'

import { useEffect, useState } from 'react'
import {
  FetchProductsCategory,
  VerifyIfExistDataInStorage,
} from '@/functions/dataInStorage'
import RenderProducts from '@/components/render-products'

import styles from './page.module.scss'
interface ProductProps {
  [product: string]: {
    name: string
    description: string
    price: number
    category: string
    image: string
    id: string
    available: boolean
    stars: number
  }
}

export default function Home() {
  const [data, setData] = useState<ProductProps>()

  useEffect(() => {
    const fetchData = async () => {
      let verify = VerifyIfExistDataInStorage()
      let getProducts

      if (verify) {
        getProducts = FetchProductsCategory({ category: `drinks` })
      } else {
        const productsFromDB = await FetchProductsinDB()
        getProducts = FetchProductsCategory({
          data: productsFromDB,
          category: `dinks`,
        })
      }

      setData(getProducts)
    }

    fetchData()
  }, [])

  return (
    <>
      <main className={styles.main}>
        <h2>Início</h2>
        <RenderProducts direction="vertical" category="portions" />
      </main>
    </>
  )
}

// Descobrir porque ele não esta pegando 100 da viewport
