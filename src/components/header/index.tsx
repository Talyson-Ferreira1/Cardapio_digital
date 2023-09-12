'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'
import { SearchContext } from '@/context/user'

import styles from '@/styles/header.module.scss'
import SpinnerButton from '../Loading/spinner'

interface Props {
  hideBar: boolean
}

export default function Header({ hideBar }: Props) {
  const [spinnerLoading, setSpinnerLoading] = useState<boolean>(false)
  const { setProductName } = useContext(SearchContext)
  const router = useRouter()
  const pathName = usePathname()

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push('/buscar')
    setProductName(e.target.value)
    setSpinnerLoading(true)
  }

  useEffect(() => {
    if (!!spinnerLoading) {
      setTimeout(() => {
        setSpinnerLoading(false)
      }, 2000)
    }
  })

  return (
    <div className={styles.container}>
      <Image
        height="150"
        width="150"
        src="/images/Delicias_da_cenir.png"
        alt="Logotipo"
        priority
      />

      {hideBar && (
        <div className={styles.container_input}>
          <label className={styles.search} htmlFor="search">
            {spinnerLoading ? (
              <SpinnerButton />
            ) : (
              <Image
                src="/icons/lupa.svg"
                alt="icon search"
                width="20"
                height="15"
              />
            )}

            <input
              type="text"
              name="search"
              title="Pesquisar prato"
              alt="input search product"
              placeholder="Pesquise aqui"
              onChange={inputChange}
            />
          </label>
        </div>
      )}
    </div>
  )
}
