import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { commonApi } from './common.service';
import { ICategory, IGetCategoriesResponse, IInitialCommonState } from './types';
export const COMMON_SLICE_KEY = 'common';

const initialCommonState: IInitialCommonState = {
  categories: [],
  selectedCategory: undefined,
  searchText: '',
};
const commonSlice = createSlice({
  name: COMMON_SLICE_KEY,
  initialState: initialCommonState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.categories = payload;
    },
    setSelectedCategory: (state, { payload }: PayloadAction<string | undefined>) => {
      state.selectedCategory = payload;
    },
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      commonApi.endpoints.getCategories.matchFulfilled,
      (state, { payload }: PayloadAction<IGetCategoriesResponse>) => {
        state.categories = payload.body.categories;
      },
    );
  },
});

export const commonStateReducer = commonSlice.reducer;

export const { setCategories, setSelectedCategory, setSearchText } = commonSlice.actions;

export const getCommonState = (rootState: RootState): IInitialCommonState =>
  rootState[COMMON_SLICE_KEY];
export const selectCategories = (rootState: RootState) => getCommonState(rootState).categories;
export const selectSelectedCategory = (rootState: RootState) =>
  getCommonState(rootState).selectedCategory;
export const selectSearchText = (rootState: RootState) => getCommonState(rootState).searchText;
