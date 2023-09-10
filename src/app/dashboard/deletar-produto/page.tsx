'use client'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/modal/index'
import { DeleteProductInDb } from '@/functions/functions-with-db/delete-product'
import { FilterProducts } from '@/functions/filter-products'
import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import SelectCategory from '@/components/filter-products'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'

import styles from '@/styles/dashboard.module.scss'

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

export default function DeleteProduct() {
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

  const openModal = (id: string) => {
    setIsOpenModal(true)
    setCurrentId(id)
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

  const deleteProduct = async () => {
    let deleteProduct = await DeleteProductInDb({ id: currentId })

    if (deleteProduct) {
      closeModal()
      reloadComponent()
    } else {
      //tratar erro.
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
        deleteProduct={true}
      />

      <Modal.Root isOpen={isOpenModal} isClose={closeModal}>
        <Modal.DeleteProduct
          actionDeleteButton={deleteProduct}
          actionCancelButton={close}
        ></Modal.DeleteProduct>
      </Modal.Root>
    </main>
  )
}
