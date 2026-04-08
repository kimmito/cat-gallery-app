import type { FC } from "react"
import Layout from "../../components/ui/layout/Layout"
import { CatGrid } from "../../components/ui/CatGrid"
import { useFavorites } from "../../hooks/useFavorites"

const Favorites: FC = () => {
  const { favoriteCats, favoriteIds, toggleFavorite } = useFavorites()

  return(
    <Layout>
      {favoriteCats.length === 0 ? (
        <p className="text-sm text-gray-500">Пока нет любимых котиков</p>
      ) : (
        <CatGrid cats={favoriteCats} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      )}
    </Layout>
  )
}

export default Favorites