import Image from 'next/image';

import styles from '../../styles/vertical-card.module.scss';

interface ProductProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}

export default function VerticalProduct({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <div className={styles.container_product}>
      <div>
        <Image
          src={productImage}
          alt="Product image"
          width="300"
          height="300"
          priority
        />
      </div>

      <h2>{productName}</h2>
      <p>{productDescription}</p>
      <h3>{productPrice}</h3>
    </div>
  );
}
