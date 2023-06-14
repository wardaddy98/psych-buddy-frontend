import { IUser } from '../../commonTypes';
import { ApiResponse } from '../../redux/types';

export interface IRegisterValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  userType: string;
  bio: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterResponse extends ApiResponse {
  body: {
    authToken: string;
    user: IUser;
  };
}

export interface UpdateUserDetailsResponse extends ApiResponse {
  body: {
    user: IUser;
  };
}

export interface GetUserResponse extends ApiResponse {
  body: {
    user: IUser;
  };
}
