import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rootApi } from './rootApi';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware),
  devTools: process.env['NODE_ENV'] !== 'production',
});

setupListeners(store.dispatch);
