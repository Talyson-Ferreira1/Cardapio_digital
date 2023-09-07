import { FormatCoin } from '@/functions/format-coin'
import Image from 'next/image'

import styles from '@/styles/sacola.module.scss'

type Product = {
  name: string
  description: string
  price: number
  image: string
  id: string
  category: string
  available: boolean
  stars: number
  quantity: number
}

export default function ProductInBag({
  product,
  deleteProduct,
  quantityProduct,
}: {
  product: Product
  deleteProduct: (_a: string) => void
  quantityProduct: (_a: string, _b: string) => void
}) {
  return (
    <div className={styles.container_product}>
      <button
        className={styles.delete_product}
        onClick={() => deleteProduct(product.id)}
      >
        <Image
          src="/icons/delete.svg"
          alt="Product image"
          width={10}
          height={10}
        />
      </button>

      <div className={styles.product_image}>
        <Image
          src={product.image}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <h2 className={styles.product_name}>{product.name}</h2>
      <p className={styles.product_description}>{product.description}</p>
      <h2 className={styles.product_price}>{FormatCoin(product.price)}</h2>

      <div className={styles.product_quantity}>
        <button
          onClick={() => quantityProduct('increase', product.id)}
          title="Aumentar quantidade"
        >
          +
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => quantityProduct('decrease', product.id)}
          title="Diminuir quantidade"
        >
          -
        </button>
      </div>
    </div>
  )
}
