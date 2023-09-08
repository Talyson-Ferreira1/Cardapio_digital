import Link from 'next/link'

import styles from '../../styles/dashboard.module.scss'

interface Props {
  href: string
  name: string
}

export default function ButtonDashBoard({ href, name }: Props) {
  return (
    <Link href={`/dashboard/${href}`}>
      <button className={styles.button}>{name}</button>
    </Link>
  )
}
