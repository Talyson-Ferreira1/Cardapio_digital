import Image from 'next/image'

import styles from '@/styles/buttons-header.module.scss'
import { useRouter } from 'next/navigation'

export default function ButtonOpenBagShopping() {
  const router = useRouter()

  function handleClick() {
    router.push('/sacola')
  }
  return (
    <button onClick={handleClick} className={styles.button_open_bag_shopping}>
      <Image src="/icons/bag.svg" alt="bag shopping" width="20" height="20" />
    </button>
  )
}
