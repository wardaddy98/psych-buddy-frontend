import { IUser } from '../../commonTypes';
import { ApiResponse } from '../types';
import { ICategory } from './../common/types';

export interface IThread {
  _id: string;
  title: string;
  description: string;
  postAnonymously: boolean;
  postedBy: IUser;
  category: ICategory;
  createdAt: number;
  interactionsCount: number;
  interactedBy: string[];
}

export interface IThreadInitialState {
  homeThreads: IThread[];
  exploreThreads: IThread[];
  myThreads: IThread[];
  savedThreads: IThread[];
  selectedThread: IThread | undefined;
}

export interface CreateThreadFormValues {
  title: string;
  description: string;
  postAnonymously: boolean;
  category: string;
  otherCategory?: string;
}

export interface GetThreadsResponse extends ApiResponse {
  body: {
    threads: IThread[];
  };
}

export interface GetSingleThreadResponse extends ApiResponse {
  body: {
    thread: IThread;
  };
}

export interface CreateThreadResponse extends ApiResponse {
  body?: {
    categories?: ICategory[];
  };
}
