import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/buttons-header.module.scss'

export default function ReturnToHome() {
  const route = useRouter()

  const handleClick = () => {
    route.push('/')
  }

  return (
    <Link href={'/'} scroll={true}>
      <button
        title="Ir para página principal"
        onClick={handleClick}
        className={styles.button_home_style}
      >
        <Image src="/icons/home.svg" alt="Home Page" width="15" height="15" />
      </button>
    </Link>
  )
}
