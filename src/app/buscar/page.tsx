'use client'
import HorizontalProduct from '@/components/cards-product/horizontal-product-card'
import { SearchContext } from '@/context/user'
import { FormatCoin } from '@/functions/format-coin'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import styles from '@/styles/buscar.module.scss'

interface ProductProps {
  available: boolean
  category: string
  daily_menu: boolean
  description: string
  id: string
  name: string
  order_only: boolean
  price: number
  stars: number
  weight: number
  image: string
}

interface AllProductsProps {
  [product: string]: ProductProps
}

export default function Search() {
  const [name, setName] = useState('')
  const { productName } = useContext(SearchContext)
  const [products, setProducts] = useState<AllProductsProps>({})

  const hasAllLetter = (value1: string, value2: string) => {
    let array1 = value1.toLowerCase().split('')
    let array2 = value2.toLowerCase().split('')

    let result = true
    let index = 0

    for (let value of array2) {
      if (array1.length === index) break

      if (!array1.includes(value)) {
        result = false
      }

      index++
    }

    return result
  }

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('All products')
    alreadyExistData && setProducts(JSON.parse(alreadyExistData))
  }, [])

  useEffect(() => {
    setName(productName)
  }, [productName])
  return (
    <main className={styles.container}>
      <h1> Procurar produto</h1>
      <>
        {products ? (
          <>
            {Object.keys(products).map((productId) => {
              let currentProduct = products[productId]
              let result = hasAllLetter(name, currentProduct.name)

              return (
                result && (
                  <Link
                    className="link"
                    key={productId}
                    href={`/produto/${currentProduct.id}`}
                    as={`/produto/${encodeURIComponent(currentProduct.id)}`}
                  >
                    <HorizontalProduct
                      productImage={currentProduct.image}
                      productName={currentProduct.name}
                      productDescription={currentProduct.description}
                      productPrice={FormatCoin(currentProduct.price)}
                    />
                  </Link>
                )
              )
            })}
          </>
        ) : (
          <h1>Nada</h1>
        )}
      </>
    </main>
  )
}
