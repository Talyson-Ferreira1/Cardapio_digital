'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FormatCoin } from '@/functions/format-coin'
import { Translate } from '@/functions/translate-category'
import { DeleteProductInDb } from '@/functions/functions-with-db/delete-product'

import styles from '@/styles/dashboard.module.scss'

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
    order_only: boolean
    daily_menu: boolean
    weight: number
  }
}

export default function DashboardProductCard({
  deleteProduct,
  products,
  path,
  openModal,
}: {
  products: ProductProps
  path?: string
  deleteProduct?: boolean
  openModal: (_e: string) => void
}) {
  const route = useRouter()

  let cardHandleClick = (id: string) => {
    if (path) {
      route.push(`${path}${id}`)
    }
  }

  let buttonHandleClick = (id: string) => {
    openModal(id)
    /* DeleteProductInDb({ id: id }) */
    /* route.refresh() */
  }

  return (
    <>
      {Object.keys(products).map((productId) => {
        let currentProduct = products[productId]

        return (
          <div
            className={styles.card_product}
            onClick={() => cardHandleClick(currentProduct.id)}
          >
            <>
              {deleteProduct && (
                <button
                  onClick={() => buttonHandleClick(currentProduct.id)}
                  className={styles.delete_product_button}
                >
                  Deletar produto
                </button>
              )}
            </>
            <div className={styles.image}>
              <Image
                src={currentProduct.image}
                alt="product image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className={styles.name}>Nome: {currentProduct.name}</h2>
            <p className={styles.description}>
              Descrição: {currentProduct.description}
            </p>
            <h3 className={styles.price}>
              Preço: {FormatCoin(currentProduct.price)}
            </h3>
            <h4 className={styles.weight}>Peso: {currentProduct.weight}</h4>
            <h5 className={styles.category}>
              Categoria: {Translate(currentProduct.category)}
            </h5>
            <h6 className={styles.available}>
              {/* Criar um checkbox ou sinalizador para um boolean */}
              Disponível: {Translate(currentProduct.available)}
            </h6>
            <h6 className={styles.order_only}>
              {/* Criar um checkbox ou sinalizador para um boolean */}
              Somente encomenda: {Translate(currentProduct.order_only)}
            </h6>
          </div>
        )
      })}
    </>
  )
}
