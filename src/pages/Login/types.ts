import { IUser } from '../../commonTypes';
import { ApiResponse } from '../../redux/types';

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  body: {
    authToken: string;
    user: IUser;
  };
}
