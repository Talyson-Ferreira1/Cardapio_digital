import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from '../../styles/buttons-header.module.scss'

export default function ReturnToLastPage() {
  const route = useRouter()

  const handleClick = () => {
    route.back()
  }

  return (
    <button className={styles.button_return_style} onClick={handleClick}>
      <Image
        src="/icons/arrow-left.svg"
        alt="return"
        layout="intrinsic"
        width="15"
        height="15"
      />
    </button>
  )
}
