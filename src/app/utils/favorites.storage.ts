import type { ICatImage } from "../types/cat.types";

const FAVORITE_CATS_KEY = "favorite-cats";

export const getFavoriteCats = (): ICatImage[] => {
  try {
    const raw = localStorage.getItem(FAVORITE_CATS_KEY);
    return raw ? (JSON.parse(raw) as ICatImage[]) : [];
  } catch {
    return [];
  }
};

const setFavoriteCats = (cats: ICatImage[]): void => {
  localStorage.setItem(FAVORITE_CATS_KEY, JSON.stringify(cats));
};

export const toggleFavoriteCat = (cat: ICatImage): ICatImage[] => {
  const current = getFavoriteCats();
  const exists = current.some((favoriteCat) => favoriteCat.id === cat.id);

  const next = exists
    ? current.filter((favoriteCat) => favoriteCat.id !== cat.id)
    : [...current, cat];

  setFavoriteCats(next);
  return next;
};
