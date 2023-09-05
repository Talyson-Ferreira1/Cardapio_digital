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
import ReturnToHome from '@/components/buton-return-to-home'
import { hasButtonHome } from '@/functions/check-if-it-accepts-the-home-button'
import { hasButtonReturn } from '@/functions/check-if-it-accepts-the-return-button'
import ReturnToLastPage from '@/components/button-return'

require('dotenv').config()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const isPublicPage = checkIsPublicRoute(pathName)
  const acceptsButtonHome = hasButtonHome(pathName)
  const acceptsButtonReturn = hasButtonReturn(pathName)
  const isLoginPage = pathName === '/login' ? true : false

  return (
    <Providers>
      <html lang="en" className="reset-html">
        <body className="reset-styles">
          <header className="header-layout">
            <Header />
            {acceptsButtonHome && <ReturnToHome />}
            {acceptsButtonReturn && <ReturnToLastPage />}
          </header>
          {isPublicPage && !isLoginPage && <TagsHeader />}

          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
