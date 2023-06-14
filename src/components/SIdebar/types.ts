import { MenuProps } from 'antd';

export interface ISidebar {
  navigationMenuItems: MenuProps['items'];
  handleNavigationMenuClick: (data: any) => void;
}
