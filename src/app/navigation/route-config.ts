import AllCats from '../screens/all-cats/AllCats'
import Favorites from '../screens/favorites/Favorites'
import { ROUTES } from './routes'
import type { AppRoute } from './navigation.types'

export const appRoutes: AppRoute[] = [
  {
    path: ROUTES.cats,
    title: 'Все котики',
    component: AllCats,
    showInMenu: true,
  },
  {
    path: ROUTES.favorites,
    title: 'Избранные котики',
    component: Favorites,
    showInMenu: true,
  },
]
