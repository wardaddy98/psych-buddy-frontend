import { DropdownProps, MenuProps } from 'antd';

export interface IDropdownMenu {
  children: any;
  menuItems: MenuProps['items'];
  menuProps?: Omit<MenuProps, 'items'>;
  dropdownProps?: Omit<DropdownProps, 'menu'>;
}
