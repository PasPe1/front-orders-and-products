import i18n from '../locales/i18n'

export function getTranslatedRoutes() {
  const t = i18n.global.t as (key: string) => string

  return [
    {
      link: '/orders',
      title: t('route.orders')
    },
    {
      link: '/products',
      title: t('route.products')
    },
    {
      link: '/users',
      title: t('route.users')
    },
    {
      link: '/settings',
      title: t('route.settings')
    }
  ]
}

interface IRoutesList {
  link: string
  title: string
}

export const routesList: IRoutesList[] = getTranslatedRoutes()
