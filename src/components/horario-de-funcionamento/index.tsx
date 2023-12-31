import { CheckisOpenStore } from '@/functions/check-is-open'
import { useEffect, useState } from 'react'

import styles from '@/styles/buttons-header.module.scss'

export default function TimeTablesNeon() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const verifyIfIsOpen = async () => {
    let verifyTimetable = await CheckisOpenStore()
    setIsOpen(verifyTimetable)
  }

  useEffect(() => {
    verifyIfIsOpen()
  }),
    []
  return (
    <>
      {isOpen ? (
        <div className={styles.buttonOpen}>
          <div></div>
          <span> Aberto</span>
        </div>
      ) : (
        <div className={styles.buttonClosed}>
          <div></div>
          <span> Fechado</span>
        </div>
      )}
    </>
  )
}
