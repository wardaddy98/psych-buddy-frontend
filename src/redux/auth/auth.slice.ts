import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetUserResponse,
  RegisterResponse,
  UpdateUserDetailsResponse,
} from '../../pages/Register/types';
import { localStorageUtil } from '../../utils/commonUtils';
import { IAuthInitialState, RootState } from '../types';
import { IUser } from './../../commonTypes';
import { LoginResponse } from './../../pages/Login/types';
import { authApi } from './auth.service';

export const AUTH_SLICE_KEY = 'auth';

const authInitialState: IAuthInitialState = {
  authToken: '',
  user: {},
};
const authSlice = createSlice({
  name: AUTH_SLICE_KEY,
  initialState: authInitialState,
  reducers: {
    setAuthToken: (state, { payload }: PayloadAction<string>) => {
      state.authToken = payload;
    },
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },

    setAuthData: (state, { payload }: PayloadAction<IAuthInitialState>) => {
      state.authToken = payload.authToken;
      state.user = payload.user;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        localStorageUtil.setItem('auth', { authToken: payload.body.authToken });
        state.authToken = payload.body.authToken;
        state.user = payload.body.user;
      },
    );

    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }: PayloadAction<RegisterResponse>) => {
        localStorageUtil.setItem('auth', { authToken: payload.body.authToken });
        state.authToken = payload.body.authToken;
        state.user = payload.body.user;
      },
    );

    builder.addMatcher(
      authApi.endpoints.updateUserDetails.matchFulfilled,
      (state, { payload }: PayloadAction<UpdateUserDetailsResponse>) => {
        state.user = payload.body.user;
      },
    );

    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, { payload }: PayloadAction<GetUserResponse>) => {
        state.user = payload.body.user;
      },
    );
  },
});

export const authReducer = authSlice.reducer;

export const { setAuthToken, setUser, setAuthData } = authSlice.actions;

export const getAuthState = (rootState: RootState): IAuthInitialState => rootState[AUTH_SLICE_KEY];
export const selectAuthToken = (rootState: RootState) => getAuthState(rootState).authToken;
export const selectIsAuthenticated = (rootState: RootState) => !!getAuthState(rootState).authToken;
export const selectAuthUser = (rootState: RootState) => getAuthState(rootState).user;
