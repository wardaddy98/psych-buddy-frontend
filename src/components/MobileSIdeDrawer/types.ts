import { MenuProps } from 'antd';

export interface IMobileSideDrawer {
  isOpen: boolean;
  navigationMenuItems: MenuProps['items'];
  handleNavigationMenuClick: (data: any) => void;
}
