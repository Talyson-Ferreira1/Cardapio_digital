'use client'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/modal'
import { FilterProducts } from '@/functions/filter-products'
import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import SelectCategory from '@/components/filter-products'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'

import styles from '@/styles/dashboard.module.scss'
import { updatesProductDataInTheFirestore } from '@/services/firebase/firestore'
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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
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
  }

  const reloadComponent = () => {
    window.location.reload()
  }

  const handleChangeFilterproducts = () => {
    let productsFiltered = FilterProducts({
      products: allProducts,
      category: filterCategory,
    })

    setProducts(productsFiltered)
  }

  const includeProductInMenuDaily = async () => {
    /*     let includeProduct = await EditDailyMenuInDb(currentId, true)
     */

    let includeProduct = await updatesProductDataInTheFirestore({
      id: currentId,
      daily_menu: true,
    })

    if (includeProduct) {
      closeModal()
      reloadComponent()
    }
  }

  const excludeProductInMenuDaily = async () => {
    /*     let removedProduct = await EditDailyMenuInDb(currentId, false)
     */

    let removedProduct = await updatesProductDataInTheFirestore({
      id: currentId,
      daily_menu: false,
    })

    if (removedProduct) {
      closeModal()
      reloadComponent()
    }
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

      <Modal.Root isOpen={isOpenModal} isClose={closeModal}>
        <Modal.DailyMenu
          actionIncludeProduct={includeProductInMenuDaily}
          actionExcludeProduct={excludeProductInMenuDaily}
          product={allProducts[currentId]}
        ></Modal.DailyMenu>
      </Modal.Root>
    </main>
  )
}
