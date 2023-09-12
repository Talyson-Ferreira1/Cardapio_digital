import Image from 'next/image'

import styles from '@/styles/Food-ilustration.module.scss'

export default function FoodIlustration() {
  return (
    <div className={styles.container_All}>
      <div className={styles.container_1}>
        <Image
          src="/ilustracoes/watermeloow.png"
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.container_2}>
        <Image
          src="/ilustracoes/burger.png"
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.container_3}>
        <Image
          src="/ilustracoes/tomato.png"
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}
