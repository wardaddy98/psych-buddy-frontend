export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  userType?: 'normal' | 'professional';
  createdAt?: number;
  bio?: string;
  savedThreads?: Array<string>;
}

export interface IInteraction {
  message: string;
  threadId: string;
  timeStamp: number;
  user: IUser;
}
