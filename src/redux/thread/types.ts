import { IUser } from '../../commonTypes';
import { ICategory } from '../common/types';
import { ApiResponse } from '../types';

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
