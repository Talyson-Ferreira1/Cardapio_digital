'use client'
import { useEffect, useState } from 'react'

import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import { FilterProducts } from '@/functions/filter-products'
import SelectCategory from '@/components/filter-products'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'

import styles from '@/styles/dashboard.module.scss'
import Modal from '@/components/modal'
interface AllProductsProps {
  [product: string]: {
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
}

export default function DailyMenu() {
  const [allProducts, setAllProducts] = useState<AllProductsProps>({})
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [products, setProducts] = useState<AllProductsProps>({})
  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const [currentId, setCurrentId] = useState<string>('')

  const FetchData = async () => {
    let result = await FetchAllProducts()
    setAllProducts(result)
  }

  const getCategorySelected = (category: string) => {
    setFilterCategory(category)
  }

  const openModal = (productId: string) => {
    setIsOpenModal(true)
    setCurrentId(productId)
  }

  const closeModal = () => {
    setIsOpenModal(false)
    window.location.reload()
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
        openModal={openModal}
        menuDaily={true}
      />

      {isOpenModal && (
        <Modal
          close={closeModal}
          productId={currentId}
          menuDailyModal={true}
          currentProduct={allProducts[currentId]}
        />
      )}
    </main>
  )
}
