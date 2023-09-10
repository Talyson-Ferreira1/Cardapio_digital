import React from 'react'

import styles from '@/styles/dashboard.module.scss'

type ModalRootProps = {
  isOpen: boolean
  isClose: () => void
  children: React.ReactNode
}

export const ModalRoot = ({ isOpen, isClose, children }: ModalRootProps) => {
  return (
    <>
      {isOpen && (
        <div className={styles.container_modal}>
          <div className={styles.modal}>
            <button className={styles.close_modal} onClick={isClose}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
