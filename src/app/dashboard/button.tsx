import { useState } from 'react'
import Link from 'next/link'

import SpinnerButton from '@/components/Loading/spinner'

import styles from '@/styles/dashboard.module.scss'

interface Props {
  href: string
  name: string
}

export default function ButtonDashBoard({ href, name }: Props) {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  return (
    <Link href={`/dashboard/${href}`}>
      <button className={styles.button} onClick={() => setShowSpinner(true)}>
        {showSpinner && <SpinnerButton />}
        {name}
      </button>
    </Link>
  )
}
