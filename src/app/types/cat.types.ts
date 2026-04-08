export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface GetCatsParams {
  limit?: number;
  page?: number;
}
