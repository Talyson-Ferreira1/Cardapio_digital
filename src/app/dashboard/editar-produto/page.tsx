'use client'
import { useEffect, useState } from 'react'

import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'

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

  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value)
  }

  useEffect(() => {
    FetchData()

    //Salvar os dados no local storage
  }, [])

  useEffect(() => {
    let filteredProducts: AllProductsProps = {}

    if (filterCategory === '') {
      setProducts(allProducts)
      return
    }

    Object.keys(allProducts).map((productId) => {
      if (allProducts[productId].category === filterCategory) {
        filteredProducts[productId] = allProducts[productId]
      }
    })
    setProducts(filteredProducts)
  }, [filterCategory])

  return (
    <main className={styles.main}>
      <select
        name="category"
        className={styles.filter_input}
        onChange={filterChange}
      >
        <option value="" selected>
          Todos os produtos
        </option>
        <option value="portions">Porções</option>
        <option value="recommendation">Recomendações</option>
        <option value="meals">Refeições Prontas</option>
        <option value="drinks">Bebidas</option>
        <option value="desserts">Sobremesas</option>
      </select>

      <DashboardProductCard
        products={products}
        path="/editar-produto/"
        deleteProduct={false}
      />
    </main>
  )
}
