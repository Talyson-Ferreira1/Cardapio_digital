import { RETURN_BUTTON_ROUTES } from '@/constants/app-routes-return-button'

export const hasButtonReturn = (asPath: string) => {
  const appPublicRoute = Object.values(RETURN_BUTTON_ROUTES.hasButton)
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
