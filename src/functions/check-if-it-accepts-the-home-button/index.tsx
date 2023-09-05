import { HOME_BUTTON_ROUTES } from '../../constants/app-router-home-button'

export const hasButtonHome = (asPath: string) => {
  const appPublicRoute = Object.values(HOME_BUTTON_ROUTES.hasButton)

  return appPublicRoute.includes(asPath)
}
