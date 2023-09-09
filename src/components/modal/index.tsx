import { useRouter } from 'next/navigation'

import { DeleteProductInDb } from '@/functions/functions-with-db/delete-product'
import ModalDeleteProduct from './ModalDeleteProduct'

import styles from '@/styles/dashboard.module.scss'
import ModalMenuDailyProduct from './ModalMenuDailyProduct'
import { EditDailyMenuInDb } from '@/functions/functions-with-db/edit-product-daily-menu'
import { Value } from 'sass'
import { deleteToken } from 'firebase/messaging'

interface product {
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
  productId: string
  close: () => void
  deleteModal?: boolean
  editModal?: boolean
  menuDailyModal?: boolean
  currentProduct?: product
}

export default function Modal({
  close,
  deleteModal,
  editModal,
  menuDailyModal,
  productId,
  currentProduct,
}: props) {
  const route = useRouter()

  const deleteProduct = async () => {
    let deleteProduct = await DeleteProductInDb({ id: productId })

    if (deleteProduct) {
      close()
    }
  }

  const includeProductInMenuDaily = async () => {
    let includeProduct = await EditDailyMenuInDb(productId, true)

    if (includeProduct) {
      close()
    }
  }

  const excludeProductInMenuDaily = async () => {
    let removedProduct = await EditDailyMenuInDb(productId, false)

    if (removedProduct) {
      close()
    }
  }

  return (
    <div className={styles.container_modal}>
      <div className={styles.modal}>
        <button className={styles.close_modal} onClick={close}>
          X
        </button>

        {deleteModal && (
          <ModalDeleteProduct
            actionDeleteButton={deleteProduct}
            actionCancelButton={close}
          />
        )}

        {menuDailyModal && currentProduct && (
          <>
            <ModalMenuDailyProduct
              product={currentProduct}
              actionIncludeProduct={includeProductInMenuDaily}
              actionExcludeProduct={excludeProductInMenuDaily}
            />
          </>
        )}
      </div>
    </div>
  )
}
