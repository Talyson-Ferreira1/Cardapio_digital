'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

import SpinnerBarButton from '../Loading/spinner-bar'

import styles from '@/styles/navTags.module.scss'

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
          <Image
            src={ilustration}
            alt="ilustration"
            fill
            sizes="(max-width: 20px) 100vw, (max-width: 768px) 20px, (max-width: 1200px) 10px, 6.6px"
            priority={true}
          />
        </div>
      )}

      <>{name}</>
    </button>
  )
}
