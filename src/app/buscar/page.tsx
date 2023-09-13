'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SearchContext } from '@/context/user'
import { FormatCoin } from '@/functions/format-coin'
import HorizontalProduct from '@/components/cards-product/horizontal-product-card'

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
  const [counter, setCounter] = useState(false)
  const { productName } = useContext(SearchContext)
  const [products, setProducts] = useState<AllProductsProps>({})
  const container = useRef<HTMLButtonElement | null>(null)

  const hasAllLetter = (value1: string, value2: string) => {
    const removeAccents = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    let inputValue = removeAccents(value1).toLowerCase()
    let ProductName = removeAccents(value2).toLowerCase()

    let result = ProductName.includes(inputValue)

    return result
  }

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('All products')
    alreadyExistData && setProducts(JSON.parse(alreadyExistData))
  }, [])

  useEffect(() => {
    setName(productName)
  }, [productName])

  useEffect(() => {
    if (container.current != null) {
      let element = container.current
      element.childElementCount === 1 ? setCounter(true) : setCounter(false)
    }
  }, [name, products])

  return (
    <main ref={container} className={styles.container}>
      {!counter && <h1> Procurar produto</h1>}
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
          <h2>Sem Produtos</h2>
        )}
      </>
      {counter && (
        <div className={styles.no_products}>
          <div>
            <Image
              src="/ilustracoes/empty-bag.png"
              alt="no product ilustration"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <h2>Infelizmente, não temos esse produto</h2>
        </div>
      )}
    </main>
  )
}
