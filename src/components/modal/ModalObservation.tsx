import { FormEvent, useState } from 'react'

import { saveDataInCache } from '@/functions/saveDataInCache/index'

import styles from '@/styles/product-details.module.scss'

type ProductProps = {
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

export default function ModalObservations({
  product,
}: {
  product: ProductProps
}) {
  const [observation, setObservatio] = useState('')

  const sendObservation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let propsSaveData = {
      keyName: 'Product Description',
      productId: product.id,
      data: observation,
    }

    saveDataInCache(propsSaveData)
  }

  return (
    <form onSubmit={sendObservation} className={styles.container_modal}>
      <textarea
        placeholder="Escreva sua observação aqui"
        maxLength={300}
        onChange={(e) => setObservatio(e.target.value)}
      ></textarea>

      <button type="submit">Concluir</button>
    </form>
  )
}
