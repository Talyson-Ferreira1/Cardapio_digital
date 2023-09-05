'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import checkIsUserAuthenticated from '@/functions/check-is-user-authenticated'
import { APP_ROUTES } from '@/constants/app-routes'
import LoadingNullPage from '../Loading'

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
