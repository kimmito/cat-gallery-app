import type { CatImage, GetCatsParams } from "../types/cat.types";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

export const getCats = async ({ limit = 15, page = 0 }: GetCatsParams = {}): Promise<CatImage[]> => {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  const apiKey = import.meta.env.VITE_CAT_API_KEY;
  const response = await fetch(`${CAT_API_URL}?${searchParams.toString()}`, {
    headers: apiKey ? { "x-api-key": apiKey } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cats: ${response.status}`);
  }

  return response.json() as Promise<CatImage[]>;
};
