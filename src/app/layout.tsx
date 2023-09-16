'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { Providers } from '@/context'
import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import { acceptsButton, acceptsButtonDashboard } from '@/functions/check-routes'
import { bag_button_routes } from '@/constants/app-routes-bag-button'
import { return_button_routes } from '@/constants/app-routes-return-button'
import { home_button_routes } from '@/constants/app-router-home-button'
import { tags_button_routes } from '@/constants/app-router-tags-button'
import { footer_routes } from '@/constants/app-router-footer'

import checkIsUserAuthenticated from '@/services/firebase/auth'
import PrivateRoute from '@/components/private-route'
import Header from '@/components/header'
import TagsHeader from '@/components/nav'
import Footer from '@/components/footer/index'
import ButtonGeneric from '@/components/generic-button/button'

import { bar_search_routes } from '@/constants/app-router-bar-search'
import { header_routes } from '@/constants/app-router-header'

import './globals.scss'
import TimeTablesNeon from '@/components/horario-de-funcionamento'

require('dotenv').config()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const isPublicPage = checkIsPublicRoute(pathName)
  const isDashboardPage = pathName === '/dashboard' ? true : false
  const isHomePage = pathName === '/' ? true : false
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

  const acceptsSearch = acceptsButton({
    asPath: pathName,
    routes: bar_search_routes,
  })

  const acceptsHeader = acceptsButton({
    asPath: pathName,
    routes: header_routes,
  })

  return (
    <Providers>
      <html lang="en" className="reset-html">
        <head>
          <title>Cardápio digital</title>
          <meta
            name="description"
            content="Explore nosso cardápio digital e desfrute de uma variedade de pratos deliciosos. Personalize seu pedido e experimente uma experiência culinária única. Faça seu pedido agora e saboreie o melhor da nossa gastronomia."
          />
        </head>
        <body className="reset-styles">
          {acceptsHeader && (
            <header className="header-layout">
              <Header hideBar={acceptsSearch} />

              {isHomePage && <TimeTablesNeon />}

              {acceptsReturnButton && (
                <ButtonGeneric
                  src_image={'/icons/arrow-left.svg'}
                  className={'button_return_style'}
                  pathName={pathName}
                  ReturnToLastPage={true}
                />
              )}
              {acceptsBagButton && (
                <ButtonGeneric
                  src_image={'/icons/bag.svg'}
                  pathName={'/sacola'}
                  className={'button_open_bag_shopping'}
                />
              )}

              {userAuthenticated && !isDashboardPage && (
                <ButtonGeneric
                  src_image={'/icons/dashboard.svg'}
                  pathName={'/dashboard'}
                  nameButton={'Dashboard'}
                  className={'button_go_to_dashboard'}
                />
              )}
            </header>
          )}

          {acceptsHomeButton && (
            <ButtonGeneric
              src_image={'/icons/home.svg'}
              pathName={'/'}
              className={'button_home_style'}
            />
          )}

          {acceptsTagsButton && <TagsHeader />}

          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
          {acceptsFooter && <Footer />}
        </body>
      </html>
    </Providers>
  )
}
