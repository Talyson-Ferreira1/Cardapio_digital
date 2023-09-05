import { useRouter } from 'next/navigation'
import Image from 'next/image'

import styles from '@/styles/dashboard.module.scss'

export default function GoToDashboard() {
  const route = useRouter()

  function handleClick() {
    route.push('/dashboard')
  }

  return (
    <button className={styles.button_go_to_dashboard} onClick={handleClick}>
      <Image
        src="/icons/dashboard.svg"
        alt="dashboard icon"
        width="25"
        height="25"
      />
      Dashboard
    </button>
  )
}
