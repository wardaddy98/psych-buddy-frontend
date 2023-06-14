export type NavigationMenuOptions = 'lobby' | 'myThreads' | 'explore' | 'savedThreads';
export type UserDrawerContentOptions = undefined | 'changePassword' | 'myProfile';
export interface IMainLayoutInitialState {
  selectedNavigationMenu: NavigationMenuOptions | undefined;
  showMobileSideDrawer: boolean;
  showUserDrawer: boolean;
  userDrawerContent: UserDrawerContentOptions;
  showThreadCreator: boolean;
}
