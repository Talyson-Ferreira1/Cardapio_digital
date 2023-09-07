'use client'
import { FormatCoin } from '@/functions/format-coin'
import { useState, useEffect } from 'react'

import styles from '@/styles/sacola.module.scss'

interface PropsOfComponent {
  totalPrice: number
  fineshedRequest: () => void
}

export default function TotalPrices({
  totalPrice,
  fineshedRequest,
}: PropsOfComponent) {
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    setPrice(totalPrice)
  }, [totalPrice])

  return (
    <section className={styles.container_total_prices}>
      <h3 className={styles.text_total_prices}>Valor total:</h3>
      <h3 className={styles.value_total_price}>{FormatCoin(price)}</h3>
      <button className={styles.button_total_price} onClick={fineshedRequest}>
        Finalizar Pedido
      </button>
    </section>
  )
}
