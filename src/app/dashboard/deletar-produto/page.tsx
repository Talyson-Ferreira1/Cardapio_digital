'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { FetchAllProducts } from '@/functions/Fetch-all-products-in-db'
import DashboardProductCard from '@/components/cards-product/dashboard-product-card'

import styles from '@/styles/dashboard.module.scss'
import Modal from '@/app/modal'

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

export default function DeleteProduct() {
  const [products, setProducts] = useState<AllProductsProps>({})
  const [allProducts, setAllProducts] = useState<AllProductsProps>({})
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const [currentId, setCurrentId] = useState<string>('')

  const pathName = usePathname()

  const FetchData = async () => {
    let result = await FetchAllProducts()
    setAllProducts(result)
  }

  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value)
  }

  const openModal = (id: string) => {
    setIsOpenModal(true)
    setCurrentId(id)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    FetchData()
    console.log(pathName)
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

      {isOpenModal && <Modal close={closeModal} productId={currentId} />}

      <DashboardProductCard
        products={products}
        deleteProduct={true}
        openModal={openModal}
      />
    </main>
  )
}
