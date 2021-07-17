export interface ICategory {
  id: string;
  name: string;
  color: string;
}

export interface ICategoryState {
  categories: ICategory[] | null;
  status: number | null;
  errMessage: string | null;
  loading: boolean;
}
