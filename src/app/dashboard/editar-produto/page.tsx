'use client'
import { useEffect, useState } from 'react'

import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import { FilterProducts } from '@/functions/filter-products'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'
import SelectCategory from '@/components/filter-products'

import styles from '@/styles/dashboard.module.scss'

interface Product {
  name: string
  description: string
  price: number
  image: string
  category: string
  id: string
  available: boolean
  stars: number
  order_only: boolean
  daily_menu: boolean
  weight: number
}
interface AllProductsProps {
  [product: string]: Product
}

export default function EditProduct() {
  const [products, setProducts] = useState<AllProductsProps>({})
  const [allProducts, setAllProducts] = useState<AllProductsProps>({})
  const [filterCategory, setFilterCategory] = useState<string>('')

  const FetchData = async () => {
    let result = await FetchAllProducts()
    setAllProducts(result)
  }

  const getCategorySelected = (category: string) => {
    setFilterCategory(category)
  }

  const handleChangeFilterproducts = () => {
    let productsFiltered = FilterProducts({
      products: allProducts,
      category: filterCategory,
    })

    setProducts(productsFiltered)
  }

  useEffect(() => {
    FetchData()
  }, [])

  useEffect(() => {
    handleChangeFilterproducts()
  }, [allProducts])

  useEffect(() => {
    handleChangeFilterproducts()
  }, [filterCategory])

  return (
    <main className={styles.main}>
      <SelectCategory selectedCategory={getCategorySelected} />

      <DashboardProductCard
        products={products}
        path="/dashboard/editar-produto/"
        deleteProduct={false}
      />
    </main>
  )
}
