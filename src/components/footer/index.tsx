'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { LogOut } from '@/services/firebase/auth'

import styles from '../../styles/footter.module.scss'
import SpinnerButton from '../Loading/spinner'
import checkIsUserAuthenticated from '@/services/firebase/auth'
import Link from 'next/link'

export default function Footer() {
  const [showLogin, setShowLogin] = useState<boolean>(true)
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const route = useRouter()
  const pathName = usePathname()
  const isLoginPage = pathName === '/login' ? false : true

  async function UserLogOut() {
    setShowSpinner(true)
    await LogOut()
    setShowSpinner(false)
    Reload()
  }

  function UserLogin() {
    setShowSpinner(true)
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

    setShowSpinner(false)
  }, [pathName])

  return (
    <footer className={styles.footer}>
      {isLoginPage && (
        <>
          {showLogin ? (
            <button onClick={UserLogin}>
              {showSpinner && <SpinnerButton />}
              LogIn
            </button>
          ) : (
            <button onClick={UserLogOut}>
              {showSpinner && <SpinnerButton />}
              LogOut
            </button>
          )}
          <div>
            © copyright @ 2023 by
            <Link
              href="https://www.linkedin.com/in/talyson-ferreira/"
              target="_blank"
            >
              <span> Talyson Ferreira</span>
            </Link>{' '}
            | all rights reserved!
          </div>
        </>
      )}
    </footer>
  )
}
