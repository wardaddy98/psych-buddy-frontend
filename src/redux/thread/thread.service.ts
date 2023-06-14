import { rootApi } from '../rootApi';
import { ApiResponse } from '../types';
import { GetSingleThreadResponse, GetThreadsResponse } from './types';

export const threadAPi = rootApi.injectEndpoints({
  endpoints: build => ({
    createThread: build.mutation({
      query: payload => ({
        url: '/thread',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    getHomeThreads: build.query({
      query: () => ({
        url: '/thread/home',
        method: 'GET',
      }),
      transformResponse: (response: GetThreadsResponse) => response,
    }),

    getMyThreads: build.query({
      query: () => ({
        url: '/thread/my',
        method: 'GET',
      }),
      transformResponse: (response: GetThreadsResponse) => response,
    }),

    getExploreThreads: build.query({
      query: () => ({
        url: '/thread/explore',
        method: 'GET',
      }),
      transformResponse: (response: GetThreadsResponse) => response,
    }),
    getSavedThreads: build.query({
      query: () => ({
        url: '/thread/saved',
        method: 'GET',
      }),
      transformResponse: (response: GetThreadsResponse) => response,
    }),
    saveThread: build.mutation({
      query: threadId => ({
        url: `/thread/save/${threadId}`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    unSaveThread: build.mutation({
      query: threadId => ({
        url: `/thread/unsave/${threadId}`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    deleteThread: build.mutation({
      query: threadId => ({
        url: `/thread/${threadId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    getSingleThread: build.query({
      query: threadId => ({
        url: `/thread/${threadId}`,
        method: 'GET',
      }),
      transformResponse: (response: GetSingleThreadResponse) => response,
    }),

    updateInteractionsCount: build.mutation({
      query: ({ threadId, action }: { threadId: string; action: 'INCREMENT' | 'DECREMENT' }) => ({
        url: `/thread/interactions/${threadId}`,
        method: 'PATCH',
        body: { action },
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    updateInteractedBy: build.mutation({
      query: threadId => ({
        url: `/thread/interacted-by/${threadId}`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse) => response,
    }),
  }),
});

export const {
  useCreateThreadMutation,
  useGetHomeThreadsQuery,
  useGetMyThreadsQuery,
  useGetExploreThreadsQuery,
  useGetSavedThreadsQuery,
  useSaveThreadMutation,
  useUnSaveThreadMutation,
  useDeleteThreadMutation,
  useGetSingleThreadQuery,
  useUpdateInteractionsCountMutation,
  useUpdateInteractedByMutation,
} = threadAPi;
