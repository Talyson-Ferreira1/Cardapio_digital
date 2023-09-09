import Image from 'next/image'

import styles from '@/styles/dashboard.module.scss'
import { useState } from 'react'

interface productProps {
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

type props = {
  actionIncludeProduct: () => void
  actionExcludeProduct: () => void
  product: productProps
}

export default function ModalMenuDailyProduct({
  actionIncludeProduct,
  actionExcludeProduct,
  product,
}: props) {
  const [alreadyIncluded] = useState<boolean>(product.daily_menu)

  return (
    <>
      {alreadyIncluded ? (
        <>
          <div className={styles.ilustration_modal_daily_menu_exclude}>
            <Image
              src="/icons/list-delete.svg"
              alt="warning ilustration"
              width="30"
              height="30"
            />
          </div>

          <h2>Remover produto do cardápio diário</h2>
          <p>Você irá remover o produto do cardápio do dia </p>

          <button
            onClick={actionExcludeProduct}
            className={styles.daily_menu_exclude}
          >
            Remover produto
          </button>
        </>
      ) : (
        <>
          <div className={styles.ilustration_modal_daily_menu_include}>
            <Image
              src="/icons/list-check.svg"
              alt="warning ilustration"
              width="30"
              height="30"
            />
          </div>
          <h2>Adicionar produto do cardápio diário</h2>
          <p>Você irá Adicionar o produto do cardápio do dia </p>
          <button
            onClick={actionIncludeProduct}
            className={styles.daily_menu_include}
          >
            Incluir produto
          </button>
        </>
      )}
    </>
  )
}
