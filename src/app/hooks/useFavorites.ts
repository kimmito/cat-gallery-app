import { useMemo, useState } from "react";
import type { ICatImage } from "../types/cat.types";
import { getFavoriteCats, toggleFavoriteCat } from "../utils/favorites.storage";

export const useFavorites = () => {
  const [favoriteCats, setFavoriteCats] = useState<ICatImage[]>(() => getFavoriteCats());

  const favoriteIds = useMemo(
    () => new Set(favoriteCats.map((cat) => cat.id)),
    [favoriteCats]
  );

  const toggleFavorite = (cat: ICatImage) => {
    const next = toggleFavoriteCat(cat);
    setFavoriteCats(next);
  };

  return {
    favoriteCats,
    favoriteIds,
    toggleFavorite,
  };
};
