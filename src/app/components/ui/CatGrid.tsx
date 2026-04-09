import type { FC } from "react"
import { type ICatImage } from "../../types/cat.types"
import { CatCard } from "./CatCard"

interface ICatGridProps {
  cats: ICatImage[]
  favoriteIds: Set<string>
  onToggleFavorite: (cat: ICatImage) => void
}

export const CatGrid: FC<ICatGridProps> = ({ cats, favoriteIds, onToggleFavorite }) => {
  return (
    <div className="grid justify-center gap-x-6 gap-y-8 grid-cols-[14.0625rem] sm:grid-cols-[repeat(2,14.0625rem)] md:grid-cols-[repeat(3,14.0625rem)] lg:max-[1440px]:grid-cols-[repeat(4,14.0625rem)] lg:grid-cols-[repeat(5,14.0625rem)] lg:gap-x-12 lg:gap-y-13">
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={favoriteIds.has(cat.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
