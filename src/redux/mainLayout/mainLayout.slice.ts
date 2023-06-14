import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { IMainLayoutInitialState, NavigationMenuOptions, UserDrawerContentOptions } from './types';

export const MAIN_LAYOUT_SLICE_KEY = 'mainLayout';

const mainLayoutInitialState: IMainLayoutInitialState = {
  selectedNavigationMenu: undefined,
  showMobileSideDrawer: false,
  showUserDrawer: false,
  userDrawerContent: undefined,
  showThreadCreator: false,
};

export const mainLayoutSlice = createSlice({
  name: MAIN_LAYOUT_SLICE_KEY,
  initialState: mainLayoutInitialState,
  reducers: {
    setSelectedNavigationMenu: (
      state,
      { payload }: PayloadAction<NavigationMenuOptions | undefined>,
    ) => {
      state.selectedNavigationMenu = payload;
    },
    setShowMobileSideDrawer: (state, { payload }: PayloadAction<boolean>) => {
      state.showMobileSideDrawer = payload;
    },

    setShowUserDrawer: (state, { payload }: PayloadAction<boolean>) => {
      state.showUserDrawer = payload;
    },

    setUserDrawerContent: (state, { payload }: PayloadAction<UserDrawerContentOptions>) => {
      state.userDrawerContent = payload;
    },

    setShowThreadCreator: (state, { payload }: PayloadAction<boolean>) => {
      state.showThreadCreator = payload;
    },
  },
});

export const mainLayoutReducer = mainLayoutSlice.reducer;

export const {
  setSelectedNavigationMenu,
  setShowMobileSideDrawer,
  setShowUserDrawer,
  setUserDrawerContent,
  setShowThreadCreator,
} = mainLayoutSlice.actions;

export const getMainLayoutState = (rootState: RootState): IMainLayoutInitialState =>
  rootState[MAIN_LAYOUT_SLICE_KEY];

export const selectSelectedNavigationMenu = (rootState: RootState) =>
  getMainLayoutState(rootState).selectedNavigationMenu;
export const selectShowMobileSIdeDrawer = (rootState: RootState) =>
  getMainLayoutState(rootState).showMobileSideDrawer;
export const selectShowUserDrawer = (rootState: RootState) =>
  getMainLayoutState(rootState).showUserDrawer;
export const selectUserDrawerContent = (rootState: RootState) =>
  getMainLayoutState(rootState).userDrawerContent;
export const selectShowThreadCreator = (rootState: RootState) =>
  getMainLayoutState(rootState).showThreadCreator;
