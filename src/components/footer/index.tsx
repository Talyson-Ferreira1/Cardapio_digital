'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { LogOut } from '@/services/authServices'
import checkIsUserAuthenticated from '@/functions/check-is-user-authenticated'

import styles from '../../styles/footter.module.scss'

export default function Footer() {
  const [showLogin, setShowLogin] = useState(true)
  const route = useRouter()
  const pathName = usePathname()

  async function UserLogOut() {
    await LogOut()
    Reload()
  }

  function UserLogin() {
    route.push('/login')
  }

  function CheckAuth() {
    let UserAuthenticated = checkIsUserAuthenticated()

    if (UserAuthenticated) {
      setShowLogin(false)
    } else {
      setShowLogin(true)
    }
  }

  function Reload() {
    window.location.reload()
  }

  useEffect(() => {
    CheckAuth()
  }, [])

  useEffect(() => {
    CheckAuth()
  }, [pathName])

  return (
    <footer className={styles.footer}>
      <div></div>
      <div>Link do desenvolvedor</div>
      <div>copyright</div>
      {showLogin ? (
        <button onClick={UserLogin}>LogIn</button>
      ) : (
        <button onClick={UserLogOut}>LogOut</button>
      )}
    </footer>
  )
}
