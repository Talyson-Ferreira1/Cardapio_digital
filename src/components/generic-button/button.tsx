'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import SpinnerButton from '../Loading/spinner'

import styles from '@/styles/buttons-header.module.scss'

interface props {
  pathName?: string
  src_image: string
  className: string
  ReturnToLastPage?: boolean
  nameButton?: string
}

export default function ButtonGeneric({
  pathName,
  src_image,
  className,
  ReturnToLastPage,
  nameButton,
}: props) {
  const [spinner, setSpinner] = useState<boolean>(false)
  const router = useRouter()
  const pathNamePage = usePathname()

  function handleClick() {
    setSpinner(true)

    if (pathName) {
      router.push(`${pathName}`)
    }

    if (ReturnToLastPage) {
      router.back()
    }
  }

  useEffect(() => {
    if (pathNamePage === pathName) {
      setSpinner(false)
    }
  }, [pathNamePage, pathName])

  return (
    <button onClick={handleClick} className={styles[className]}>
      {!spinner ? (
        <Image
          src={`${src_image}`}
          alt="svg ilustration"
          width="20"
          height="20"
        />
      ) : (
        <SpinnerButton />
      )}
      {nameButton}
    </button>
  )
}
