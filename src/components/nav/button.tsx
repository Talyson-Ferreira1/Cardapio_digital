'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

import styles from '@/styles/navTags.module.scss'
import SpinnerBarButton from '../Loading/spinner-bar'

interface componentProps {
  ilustration: string
  name: string
  pathName: string
}

export default function ButtonTag({
  ilustration,
  name,
  pathName,
}: componentProps) {
  const route = useRouter()
  const pathNamePage = usePathname()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = () => {
    setIsLoading(true)
    route.push(pathName)
    hideSpinner()
  }

  const hideSpinner = () => {
    if (pathNamePage === pathName) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    hideSpinner()
  }, [pathNamePage])

  return (
    <button
      onClick={handleClick}
      className={`${styles.tag_button} ${
        pathNamePage === pathName ? styles.selected : styles.deselected
      } `}
    >
      {isLoading ? (
        <div>
          <SpinnerBarButton />
        </div>
      ) : (
        <div>
          <Image src={ilustration} alt="ilustration" fill priority={true} />
        </div>
      )}

      <>{name}</>
    </button>
  )
}
