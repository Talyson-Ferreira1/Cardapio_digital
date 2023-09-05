'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { Providers } from '@/context'
import { checkIsPublicRoute } from '@/functions/check-is-public-route'

import PrivateRoute from '@/components/private-route'
import Header from '@/components/header'
import './globals.scss'
import TagsHeader from '@/components/nav'
import Footer from '@/components/footer/index'
import ReturnToHome from '@/components/buttons/buton-return-to-home'
import ReturnToLastPage from '@/components/buttons/button-return'
import checkIsUserAuthenticated from '@/functions/check-is-user-authenticated'
import GoToDashboard from '@/components/buttons/button-go-to-dashboard'
import ButtonOpenBagShopping from '@/components/buttons/button-open-bag-shopping'
import { acceptsButton } from '@/functions/check-routes'
import { bag_button_routes } from '@/constants/app-routes-bag-button'
import { return_button_routes } from '@/constants/app-routes-return-button'
import { home_button_routes } from '@/constants/app-router-home-button'
import { tags_button_routes } from '@/constants/app-router-tags-button'
import { footer_routes } from '@/constants/app-router-footer'

require('dotenv').config()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const isPublicPage = checkIsPublicRoute(pathName)
  const isDashboardPage = pathName === '/dashboard' ? true : false
  const userAuthenticated = checkIsUserAuthenticated()

  const acceptsBagButton = acceptsButton({
    asPath: pathName,
    routes: bag_button_routes,
  })

  const acceptsReturnButton = acceptsButton({
    asPath: pathName,
    routes: return_button_routes,
  })

  const acceptsHomeButton = acceptsButton({
    asPath: pathName,
    routes: home_button_routes,
  })

  const acceptsTagsButton = acceptsButton({
    asPath: pathName,
    routes: tags_button_routes,
  })

  const acceptsFooter = acceptsButton({
    asPath: pathName,
    routes: footer_routes,
  })

  return (
    <Providers>
      <html lang="en" className="reset-html">
        <body className="reset-styles">
          <header className="header-layout">
            <Header />

            {acceptsReturnButton && <ReturnToLastPage />}
            {acceptsBagButton && <ButtonOpenBagShopping />}
            {acceptsHomeButton && <ReturnToHome />}
            {userAuthenticated && !isDashboardPage && <GoToDashboard />}
          </header>
          {acceptsTagsButton && <TagsHeader />}

          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
          {acceptsFooter && <Footer />}
        </body>
      </html>
    </Providers>
  )
}
