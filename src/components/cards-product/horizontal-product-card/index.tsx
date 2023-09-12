import Image from 'next/image'

import styles from '@/styles/horizontal-card.module.scss'

interface ProductProps {
  productImage: string
  productName: string
  productDescription: string
  productPrice: string
}

export default function HorizontalProduct({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <div className={styles.container_product}>
      <div className="image-recommendation-product">
        <Image
          src={productImage}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2>{productName}</h2>
      <p>{productDescription}</p>
      <h3>{productPrice}</h3>
    </div>
  )
}
