import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { threadAPi } from './thread.service';
import { GetSingleThreadResponse, GetThreadsResponse, IThread, IThreadInitialState } from './types';

export const THREAD_SLICE_KEY = 'thread';

const threadInitialState: IThreadInitialState = {
  exploreThreads: [],
  homeThreads: [],
  myThreads: [],
  savedThreads: [],
  selectedThread: undefined,
};

const threadSlice = createSlice({
  name: THREAD_SLICE_KEY,
  initialState: threadInitialState,
  reducers: {
    setHomeThreads: (state, { payload }: PayloadAction<IThread[]>) => {
      state.homeThreads = payload;
    },

    setSavedThreads: (state, { payload }: PayloadAction<IThread[]>) => {
      state.savedThreads = payload;
    },

    setMyThreads: (state, { payload }: PayloadAction<IThread[]>) => {
      state.myThreads = payload;
    },
    setSelectedThread: (state, { payload }: PayloadAction<IThread | undefined>) => {
      state.selectedThread = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      threadAPi.endpoints.getHomeThreads.matchFulfilled,
      (state, { payload }: PayloadAction<GetThreadsResponse>) => {
        state.homeThreads = payload.body.threads;
      },
    );

    builder.addMatcher(
      threadAPi.endpoints.getMyThreads.matchFulfilled,
      (state, { payload }: PayloadAction<GetThreadsResponse>) => {
        state.myThreads = payload.body.threads;
      },
    );

    builder.addMatcher(
      threadAPi.endpoints.getExploreThreads.matchFulfilled,
      (state, { payload }: PayloadAction<GetThreadsResponse>) => {
        state.exploreThreads = payload.body.threads;
      },
    );

    builder.addMatcher(
      threadAPi.endpoints.getSavedThreads.matchFulfilled,
      (state, { payload }: PayloadAction<GetThreadsResponse>) => {
        state.savedThreads = payload.body.threads;
      },
    );

    builder.addMatcher(threadAPi.endpoints.deleteThread.matchFulfilled, (state, action) => {
      const threadId = action.meta.arg.originalArgs;
      state.exploreThreads = state.exploreThreads.filter(e => e._id !== threadId);
      state.myThreads = state.myThreads.filter(e => e._id !== threadId);
      state.homeThreads = state.homeThreads.filter(e => e._id !== threadId);
      state.savedThreads = state.savedThreads.filter(e => e._id !== threadId);
    });

    builder.addMatcher(
      threadAPi.endpoints.getSingleThread.matchFulfilled,
      (state, { payload }: PayloadAction<GetSingleThreadResponse>) => {
        state.selectedThread = payload.body.thread;
      },
    );
  },
});

export const threadReducer = threadSlice.reducer;

export const { setHomeThreads, setSavedThreads, setMyThreads, setSelectedThread } =
  threadSlice.actions;

export const getThreadState = (rootState: RootState): IThreadInitialState =>
  rootState[THREAD_SLICE_KEY];
export const selectHomeThreads = (rootState: RootState) => getThreadState(rootState).homeThreads;
export const selectSavedThreads = (rootState: RootState) => getThreadState(rootState).savedThreads;
export const selectExploreThreads = (rootState: RootState) =>
  getThreadState(rootState).exploreThreads;
export const selectMyThreads = (rootState: RootState) => getThreadState(rootState).myThreads;
export const selectSelectedThread = (rootState: RootState) =>
  getThreadState(rootState).selectedThread;
