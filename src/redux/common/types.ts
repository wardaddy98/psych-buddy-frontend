import { ApiResponse } from '../types';

export interface ICategory {
  _id: string;
  label: string;
  value: string;
}

export interface IInitialCommonState {
  categories: ICategory[];
  selectedCategory: string | undefined;
  searchText: string;
}

export interface IGetCategoriesResponse extends ApiResponse {
  body: {
    categories: ICategory[];
  };
}
