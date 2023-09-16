'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  FetchProductsCategory,
  GetAllproductsOfDailyMenu,
  SaveDataInLocalStorage,
  VerifyIfExistDataInStorage,
} from '@/functions/dataInStorage'
import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import { FormatCoin } from '@/functions/format-coin'
import HorizontalProduct from '../cards-product/horizontal-product-card'
import VerticalProduct from '../cards-product/vertical-product-card'
import LoadingHorizontalCard from '../Loading/loading-Horizontal'
import LoadingVerticalCard from '../Loading/loading-vertical'

import styles from '../../styles/render-products.module.scss'
import { fetchProductsAndUpdateIfNotExistsImage } from '@/services/firebase/firestore'

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
  category?: 'portions' | 'recommendation' | 'meals' | 'drinks' | 'desserts'
  direction?: 'horizontal' | 'vertical'
  dailyMenu?: boolean
}

export default function RenderProducts({ category, dailyMenu }: props) {
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

  const fetchData = async () => {
    let verify = VerifyIfExistDataInStorage()
    let getProducts

    if (verify) {
      getProducts = FetchProductsCategory({ category: `${category}` })
    } else {
      const productsFromDB = await fetchProductsAndUpdateIfNotExistsImage()
      getProducts = FetchProductsCategory({
        data: productsFromDB,
        category: `${category}`,
      })
    }

    setProducts(getProducts)
  }

  const fetchDailyMenu = async () => {
    let verify = VerifyIfExistDataInStorage()

    if (verify) {
      const productsFromStorage = GetAllproductsOfDailyMenu()
      setProducts(productsFromStorage)
    } else {
      const productsFromDB = await fetchProductsAndUpdateIfNotExistsImage()
      let DailyMenu = GetAllproductsOfDailyMenu(productsFromDB)
      setProducts(DailyMenu)

      SaveDataInLocalStorage(productsFromDB)
    }
  }

  const ReloadProducts = () => {
    if (dailyMenu) {
      fetchDailyMenu()
    } else {
      fetchData()
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
    ReloadProducts()
  }, [])

  useEffect(() => {
    ReloadProducts()
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
