import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';
import { localStorageUtil } from '../utils/commonUtils';
import { RootState } from './types';

const getBaseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const authToken = (getState() as RootState)?.auth?.authToken;
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
      headers.set('Accept', 'application/json');
    }
    return headers;
  },
});

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await getBaseQuery(args, api, extraOptions);

  //To logout if token is expired
  if (result?.error?.status === 403) {
    localStorageUtil.removeItem('auth');
    api.dispatch({ type: 'RESET_STORE' });
  }
  return result;
};

// baseQuery in createApi expects a data fetching method returned by fetchBaseQuery() function
// we pass a custom function dynamicBaseQuery to baseQuery method, and pass all arguments to dynamicBaseQuery that are provided by baseQuery method
// this is done so that we can access the result provided from fetchBaseQuery()
// we pass all the arguments provided by baseQuery method to getBaseQuery() (in dynamicBaseQuery function)
// now we can access the result of fetchBaseQuery and logout if the access token is invalid (i.e status === FORBIDDEN 403)

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});
