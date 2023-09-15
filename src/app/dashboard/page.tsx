'use client'
import { useEffect, useState } from 'react'

import ButtonDashBoard from './button'

import styles from '../../styles/dashboard.module.scss'

export default function Dashboard() {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      {domLoaded && (
        <main className={styles.container}>
          <ButtonDashBoard href="cadastrar-produto" name="Cadastrar produtos" />
          <ButtonDashBoard href="editar-produto" name="Editar produtos" />
          <ButtonDashBoard href="deletar-produto" name="Deletar produtos" />
          <ButtonDashBoard href="cardapio-do-dia" name="Cardápio do dia" />
          <ButtonDashBoard href="horarios" name="Horário de funcionamento" />
        </main>
      )}
    </>
  )
}
