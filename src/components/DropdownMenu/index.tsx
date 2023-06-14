import { Dropdown } from 'antd';
import { IDropdownMenu } from './types';

const DropDownMenu = (props: IDropdownMenu) => {
  const { menuItems, dropdownProps, menuProps, children } = props;
  return (
    <Dropdown {...dropdownProps} menu={{ items: menuItems, ...menuProps }}>
      {children}
    </Dropdown>
  );
};

export default DropDownMenu;
