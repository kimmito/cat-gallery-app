import type { FC } from "react"
import { type ICatImage } from "../../types/cat.types"
import { CatCard } from "./CatCard"

interface ICatGridProps {
  cats: ICatImage[]
}

export const CatGrid: FC<ICatGridProps> = ({ cats }) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(5,14.0625rem)] lg:gap-x-12 lg:gap-y-13">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  )
}
