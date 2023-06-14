import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { selectSelectedNavigationMenu } from '../../redux/mainLayout/mainLayout.slice';
import styles from './sidebar.module.scss';
import { ISidebar } from './types';

const Sidebar = (props: ISidebar) => {
  const { handleNavigationMenuClick, navigationMenuItems } = props;
  const selectedNavigationMenu = useSelector(selectSelectedNavigationMenu);

  return (
    <div className={styles.side_bar}>
      <Menu
        defaultSelectedKeys={selectedNavigationMenu ? [selectedNavigationMenu] : []}
        selectedKeys={selectedNavigationMenu ? [selectedNavigationMenu] : []}
        className={styles.menu}
        items={navigationMenuItems}
        style={{ background: 'inherit', border: 'none' }}
        selectable
        onClick={handleNavigationMenuClick}
      />
    </div>
  );
};

export default Sidebar;
