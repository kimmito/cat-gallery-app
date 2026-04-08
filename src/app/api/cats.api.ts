import type { ICatImage, IGetCatsParams } from "../types/cat.types";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";
export const MAX_LIMIT_WITHOUT_KEY = 10;
export const CATS_INITIAL_LIMIT = 15;

const fetchCatsBatch = async ({
  limit,
  page,
  apiKey,
}: {
  limit: number;
  page: number;
  apiKey?: string;
}): Promise<ICatImage[]> => {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  const response = await fetch(`${CAT_API_URL}?${searchParams.toString()}`, {
    headers: apiKey ? { "x-api-key": apiKey } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cats: ${response.status}`);
  }

  return response.json() as Promise<ICatImage[]>;
};

export const getCats = async ({ limit, page }: IGetCatsParams = {}): Promise<ICatImage[]> => {
  const requestedLimit = limit ?? CATS_INITIAL_LIMIT;
  const requestedPage = page ?? 0;
  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  if (apiKey || requestedLimit <= MAX_LIMIT_WITHOUT_KEY) {
    return fetchCatsBatch({ limit: requestedLimit, page: requestedPage, apiKey });
  }

  const batchCount = Math.ceil(requestedLimit / MAX_LIMIT_WITHOUT_KEY);
  const batches = await Promise.all(
    Array.from({ length: batchCount }, (_, batchIndex) => {
      const batchLimit = Math.min(MAX_LIMIT_WITHOUT_KEY, requestedLimit - batchIndex * MAX_LIMIT_WITHOUT_KEY);
      return fetchCatsBatch({
        limit: batchLimit,
        page: requestedPage + batchIndex,
      });
    })
  );

  return batches.flat().slice(0, requestedLimit);
};
