import { rootApi } from '../rootApi';
import { IGetCategoriesResponse } from './types';

export const commonApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: () => ({
        method: 'GET',
        url: 'category',
      }),
      transformResponse: (response: IGetCategoriesResponse) => response,
    }),
  }),
});

export const { useGetCategoriesQuery } = commonApi;
