import { LoginResponse } from '../../pages/Login/types';
import {
  GetUserResponse,
  RegisterResponse,
  UpdateUserDetailsResponse,
} from '../../pages/Register/types';
import { rootApi } from '../rootApi';
import { ApiResponse } from '../types';

export const authApi = rootApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: payload => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: LoginResponse) => response,
    }),
    register: build.mutation({
      query: payload => ({
        method: 'POST',
        url: '/register',
        body: payload,
      }),
      transformResponse: (response: RegisterResponse) => response,
    }),

    updateUserDetails: build.mutation({
      query: payload => ({
        url: '/user/details',
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: UpdateUserDetailsResponse) => response,
    }),

    changePassword: build.mutation({
      query: (payload: { oldPassword: string; newPassword: string }) => ({
        url: '/user/change-password',
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    getUser: build.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      transformResponse: (response: GetUserResponse) => response,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserDetailsMutation,
  useChangePasswordMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authApi;
