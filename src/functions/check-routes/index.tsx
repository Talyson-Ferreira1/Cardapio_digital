interface ButtonRoutes {
  [key: string]: string | { name: string }
}

interface HomeButtonRoutes {
  hasButton: ButtonRoutes
  noButton: ButtonRoutes
}

interface props {
  asPath: string
  routes: HomeButtonRoutes
}

export const acceptsButton = ({ asPath, routes }: props) => {
  const appPublicRoute = Object.values(routes.hasButton)

  return appPublicRoute.includes(asPath)
}
