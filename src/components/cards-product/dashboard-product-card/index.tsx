'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FormatCoin } from '@/functions/format-coin'
import { Translate } from '@/functions/translate-category'

import styles from '@/styles/dashboard.module.scss'
import LoaderDashboardProductCard from '@/components/Loading/loading-dashboard-product-card'

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

interface CurrentProductInfoProps {
  productId: string
  includedInMenuDaily?: boolean
}

export default function DashboardProductCard({
  path,
  products,
  menuDaily,
  deleteProduct,
  editProduct,
  openModal,
}: {
  path?: string
  menuDaily?: boolean
  products: ProductProps
  deleteProduct?: boolean
  editProduct?: boolean
  openModal?: (id: string) => void
}) {
  const route = useRouter()

  let cardHandleClick = (id: string) => {
    if (path) {
      route.push(`${path}${id}`)
    }
  }

  let buttonHandleClick = (id: string) => {
    if (!!openModal) {
      openModal(id)
    }
  }

  return (
    <>
      {Object.values(products).length > 0 ? (
        <>
          {Object.keys(products).map((productId) => {
            let currentProduct = products[productId]
            let includedInDailyMenu = products[productId].daily_menu

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

                <>
                  {editProduct && (
                    <button
                      onClick={() => buttonHandleClick(currentProduct.id)}
                      className={styles.edit_product_button}
                    >
                      Editar produto
                    </button>
                  )}
                </>

                <>
                  {menuDaily && (
                    <button
                      style={{
                        background: `${
                          includedInDailyMenu ? '#de3030ff' : '#10b310'
                        }`,
                      }}
                      onClick={() => buttonHandleClick(currentProduct.id)}
                      className={styles.daily_menu_product_button}
                    >
                      {includedInDailyMenu ? 'Remover' : 'Incluir'}
                    </button>
                  )}
                </>

                <div className={styles.image}>
                  <Image
                    src={currentProduct.image}
                    alt="product image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
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
      ) : (
        <>
          <LoaderDashboardProductCard />
        </>
      )}
    </>
  )
}
