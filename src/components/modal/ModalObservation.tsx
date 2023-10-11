import { FormEvent, useEffect, useState } from 'react'

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
  isClose,
}: {
  product: ProductProps
  isClose: () => void
}) {
  const [observation, setObservatio] = useState('')
  const [showButtonClear, setShowButtonClear] = useState(false)
  const [initialObservation, setInitialObservation] = useState('')
  const [hasInitialObs, setHasInitialObs] = useState(false)

  const sendObservation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let propsSaveData = {
      keyName: 'Product Description',
      productId: product.id,
      data: observation,
    }

    saveDataInCache(propsSaveData)
    isClose()
  }

  const checkIfTheProductHasComments = () => {
    const dataInStorage = localStorage.getItem('Product Description')

    if (dataInStorage != null) {
      let observations = JSON.parse(dataInStorage)
      let productObservation = observations[product.id]

      if (productObservation != undefined && productObservation != '') {
        setHasInitialObs(true)
        setInitialObservation(productObservation)
      } else {
        setHasInitialObs(false)
      }
    }
  }

  const deleteProductObservation = () => {
    let propsSaveData = {
      keyName: 'Product Description',
      productId: product.id,
      data: '',
    }

    saveDataInCache(propsSaveData)
    isClose()
  }

  useEffect(() => {
    checkIfTheProductHasComments()
  }, [])

  useEffect(() => {
    if (observation != '' || hasInitialObs === true) {
      setShowButtonClear(true)
    } else {
      setShowButtonClear(false)
    }

    checkIfTheProductHasComments()
  }, [hasInitialObs, observation])

  return (
    <form onSubmit={sendObservation} className={styles.container_modal}>
      <textarea
        placeholder={
          hasInitialObs ? initialObservation : 'Escreva sua observação aqui'
        }
        maxLength={300}
        onChange={(e) => setObservatio(e.target.value)}
      ></textarea>

      {showButtonClear && (
        <button
          className={styles.clearButton}
          onClick={deleteProductObservation}
        >
          Excluir observações
        </button>
      )}
      <button type="submit">Concluir</button>
    </form>
  )
}
