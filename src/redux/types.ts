import { IUser } from '../commonTypes';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export interface IAuthInitialState {
  authToken: string;
  user: IUser;
}

export interface ApiResponse {
  status: number;
  message: string;
  body?: unknown;
}
