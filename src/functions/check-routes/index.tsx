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

  let lettersOfPath = asPath.split('')
  let counter = 0
  let newPath: Array<string> = []

  lettersOfPath.map((letter) => {
    if (counter > 1) return
    newPath.push(letter)
    if (letter === '/') counter++
  })

  let path = newPath.join('')

  return appPublicRoute.includes(path)
}

export const acceptsButtonDashboard = ({ asPath, routes }: props) => {
  const appPublicRoute = Object.values(routes.hasButton)

  return appPublicRoute.includes(asPath)
}
