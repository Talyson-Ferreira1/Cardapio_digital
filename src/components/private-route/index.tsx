'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { APP_ROUTES } from '@/constants/app-routes'
import LoadingNullPage from '../Loading'
import checkIsUserAuthenticated from '@/services/firebase/auth'

type PrivateRouteProps = {
  children: ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter()

  const isUserAuthenticated = checkIsUserAuthenticated()

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.home)
    }
  }, [isUserAuthenticated, push])

  return (
    <>
      {!isUserAuthenticated && <LoadingNullPage />}
      {isUserAuthenticated && children}
    </>
  )
}

export default PrivateRoute
