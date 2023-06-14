import { Action, Reducer, combineReducers } from '@reduxjs/toolkit';
import { AUTH_SLICE_KEY, authReducer } from './auth/auth.slice';
import { COMMON_SLICE_KEY, commonStateReducer } from './common/common.slice';
import { MAIN_LAYOUT_SLICE_KEY, mainLayoutReducer } from './mainLayout/mainLayout.slice';
import { rootApi } from './rootApi';
import { THREAD_SLICE_KEY, threadReducer } from './thread/thread.slice';
import { RootState } from './types';

export const rootReducer: Reducer = (state: RootState, action: Action) => {
  //root reducer is defined separately to implement RESET_STORE functionality
  if (action.type === 'RESET_STORE') {
    state = {};
  }
  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  [AUTH_SLICE_KEY]: authReducer,
  [MAIN_LAYOUT_SLICE_KEY]: mainLayoutReducer,
  [COMMON_SLICE_KEY]: commonStateReducer,
  [THREAD_SLICE_KEY]: threadReducer,
});
