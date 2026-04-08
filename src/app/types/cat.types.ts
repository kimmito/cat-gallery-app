export interface ICatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface IGetCatsParams {
  limit?: number;
  page?: number;
}
