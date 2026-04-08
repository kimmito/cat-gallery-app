import type { FC } from "react";
import { type ICatImage } from "../../types/cat.types";

interface ICatCardProps {
  cat: ICatImage;
}

export const CatCard: FC<ICatCardProps> = ({ cat }) => {
  const { id, url, width, height } = cat;

  return (
    <article className="h-56.25 w-56.25 overflow-hidden bg-white transition duration-200 ease-out hover:scale-[1.14] hover:shadow-[0px_9px_18px_0px_rgba(0,0,0,0.18),0px_6px_5px_0px_rgba(0,0,0,0.24)]">
      <img src={url} alt={`Кот ${id}`} width={width} height={height} loading="lazy" className="h-full w-full object-cover" />
    </article>
  )
}