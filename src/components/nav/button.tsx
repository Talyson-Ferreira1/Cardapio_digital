'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

import styles from '../../styles/navTags.module.scss'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const button = useRef<HTMLButtonElement | null>(null)

  const route = useRouter()
  const pathNamePage = usePathname()

  const handleClick = () => {
    setIsLoading(true)
    route.push(pathName)
  }

  useEffect(() => {
    if (pathNamePage === pathName) {
      setIsLoading(false)
    }

    if (button.current != null) {
      let tag: any = button.current

      if (pathNamePage === pathName) {
        tag.style.border = ' 1px solid #96969685'
        tag.style.transform = ' scale(1.1)'
        tag.style.background = '#f8da5f'
        tag.style.boxShadow = ' 4px 4px 9px 1px rgba(0, 0, 0, 0.39)'
      } else {
        tag.style.border = ' none'
        tag.style.transform = ' scale(1)'
        tag.style.background = '#eabf16'
        tag.style.boxShadow = ' 4px 4px 9px 1px rgba(0, 0, 0, 0.20)'
      }
    }
  }, [pathNamePage])

  return (
    <button ref={button} onClick={handleClick} className={styles.tag_button}>
      {isLoading ? (
        <div className={styles.container_loader_tags}>
          <div>
            <Image
              src="/ilustracoes/loader.png"
              alt="ilustration"
              width="20"
              height="20"
              priority={true}
            />
          </div>
        </div>
      ) : (
        <Image
          src={ilustration}
          alt="ilustration"
          width="20"
          height="20"
          priority={true}
        />
      )}

      <>{name}</>
    </button>
  )
}
