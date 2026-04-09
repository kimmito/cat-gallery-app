import type { FC } from "react";
import { type ICatImage } from "../../types/cat.types";
import cn  from "clsx";

const HEART_OUTLINE_PATH = "M29 0C25.52 0 22.18 1.62 20 4.18C17.82 1.62 14.48 0 11 0C4.84 0 0 4.84 0 11C0 18.56 6.8 24.72 17.1 34.08L20 36.7L22.9 34.06C33.2 24.72 40 18.56 40 11C40 4.84 35.16 0 29 0ZM20.2 31.1L20 31.3L19.8 31.1C10.28 22.48 4 16.78 4 11C4 7 7 4 11 4C14.08 4 17.08 5.98 18.14 8.72H21.88C22.92 5.98 25.92 4 29 4C33 4 36 7 36 11C36 16.78 29.72 22.48 20.2 31.1Z";
const HEART_FILLED_PATH = "M20 36.7L17.1 34.08C6.8 24.72 0 18.56 0 11C0 4.84 4.84 0 11 0C14.48 0 17.82 1.62 20 4.18C22.18 1.62 25.52 0 29 0C35.16 0 40 4.84 40 11C40 18.56 33.2 24.72 22.9 34.06L20 36.7Z";

interface ICatCardProps {
  cat: ICatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: ICatImage) => void;
}

export const CatCard: FC<ICatCardProps> = ({ cat, isFavorite, onToggleFavorite }) => {
  const { id, url, width, height } = cat;
  const isFilled = isFavorite;

  return (
    <article className="group relative h-56.25 w-56.25 overflow-hidden bg-white transition duration-200 ease-out hover:scale-[1.14] hover:shadow-[0px_9px_18px_0px_rgba(0,0,0,0.18),0px_6px_5px_0px_rgba(0,0,0,0.24)]">
      <img src={url} alt={`Кот ${id}`} width={width} height={height} loading="lazy" className="h-full w-full object-cover" />

      <button
        type="button"
        aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(cat)}
        className={cn(
          "group/heart absolute right-6 bottom-6 cursor-pointer opacity-0 transition-opacity",
          "hover:opacity-100 focus-visible:opacity-100",
          "group-hover:opacity-100",
          isFavorite && "opacity-100"
        )}
      >
        <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d={HEART_OUTLINE_PATH}
            className={cn(
              "fill-[#F24E1E] transition-opacity",
              isFilled ? "opacity-0" : "opacity-100 group-hover/heart:opacity-0"
            )}
          />
          <path
            d={HEART_FILLED_PATH}
            className={cn(
              "fill-[#F24E1E] transition-opacity",
              isFilled ? "opacity-100" : "opacity-0 group-hover/heart:opacity-100"
            )}
          />
        </svg>
      </button>
    </article>
  )
}