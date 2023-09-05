'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  FetchProductsCategory,
  VerifyIfExistDataInStorage,
} from '@/functions/dataInStorage'
import { FetchProductsinDB } from '@/functions/fetch-products'
import { FormatCoin } from '@/functions/format-coin'
import HorizontalProduct from '../horizontal-product-card'
import VerticalProduct from '../vertical-product-card'
import LoadingHorizontalCard from '../Loading/loading-Horizontal'
import LoadingVerticalCard from '../Loading/loading-vertical'

import styles from '../../styles/render-products.module.scss'
import containerStyle from '../../styles/pages-styles.module.scss'

interface ProductProps {
  [product: string]: {
    name: string
    description: string
    price: number
    image: string
    category: string
    id: string
    available: boolean
    stars: number
  }
}

interface props {
  category: 'portions' | 'recommendation' | 'meals' | 'drinks' | 'desserts'
  direction: 'horizontal' | 'vertical'
}

export default function RenderProducts({ category, direction }: props) {
  const [products, setProducts] = useState<ProductProps>({})
  const [directionFlex, setDirectionFlex] = useState('')

  const Format = (num: number) => {
    return FormatCoin(num)
  }

  const renderedProducts = () => {
    if (Object.values(products).length > 0) {
      return Object.keys(products).map((productId) => {
        const currentProduct = products[productId]

        return (
          <Link
            className="link"
            key={productId}
            href={`/produto/${currentProduct.id}`}
            as={`/produto/${encodeURIComponent(currentProduct.id)}`}
          >
            {directionFlex === 'horizontal' && (
              <HorizontalProduct
                productImage={currentProduct.image}
                productName={currentProduct.name}
                productDescription={currentProduct.description}
                productPrice={Format(currentProduct.price)}
              />
            )}
            {directionFlex === 'vertical' && (
              <VerticalProduct
                productImage={currentProduct.image}
                productName={currentProduct.name}
                productDescription={currentProduct.description}
                productPrice={Format(currentProduct.price)}
              />
            )}
          </Link>
        )
      })
    } else {
      return (
        <>
          {directionFlex === 'horizontal' && <LoadingHorizontalCard />}
          {directionFlex === 'vertical' && <LoadingVerticalCard />}
        </>
      )
    }
  }

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth > 715
        ? setDirectionFlex('horizontal')
        : setDirectionFlex('vertical')
    }

    handleResize()

    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log(directionFlex)
  }, [directionFlex])

  useEffect(() => {
    const fetchData = async () => {
      let verify = VerifyIfExistDataInStorage()
      let getProducts

      if (verify) {
        getProducts = FetchProductsCategory({ category: `${category}` })
      } else {
        const productsFromDB = await FetchProductsinDB()
        getProducts = FetchProductsCategory({
          data: productsFromDB,
          category: `${category}`,
        })
      }

      setProducts(getProducts)
    }

    fetchData()
  }, [category])

  return (
    <section
      className={
        directionFlex === 'vertical'
          ? styles.container_vertical
          : styles.container_horizontal
      }
    >
      {renderedProducts()}
    </section>
  )
}
