import { Drawer, Menu, MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/auth/auth.slice';
import {
  selectSelectedNavigationMenu,
  setShowMobileSideDrawer,
} from '../../redux/mainLayout/mainLayout.slice';
import styles from './mobileSideDrawer.module.scss';
import { IMobileSideDrawer } from './types';

const MobileSideDrawer = (props: IMobileSideDrawer) => {
  const { isOpen, handleNavigationMenuClick, navigationMenuItems } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const selectedNavigationMenu = useSelector(selectSelectedNavigationMenu);

  const onClose = () => {
    dispatch(setShowMobileSideDrawer(false));
  };

  const unauthenticatedMenuItems: MenuProps['items'] = [
    {
      key: 'login',
      label: <span>Login</span>,
    },
    {
      key: 'register',
      label: <span>Register</span>,
    },
  ];

  const handleClick = (data: any) => {
    if (isAuthenticated) {
      handleNavigationMenuClick(data);
    } else {
      navigate(`/${data.key}`);
    }
    dispatch(setShowMobileSideDrawer(false));
  };

  return (
    <Drawer
      width={215}
      placement='left'
      open={isOpen}
      closable={false}
      className={styles.drawer}
      onClose={onClose}
      bodyStyle={{ padding: '0.5rem' }}
    >
      <Menu
        items={isAuthenticated ? navigationMenuItems : unauthenticatedMenuItems}
        style={{ border: 'none' }}
        selectable={isAuthenticated}
        defaultSelectedKeys={
          isAuthenticated && selectedNavigationMenu ? [selectedNavigationMenu] : []
        }
        selectedKeys={isAuthenticated && selectedNavigationMenu ? [selectedNavigationMenu] : []}
        onClick={handleClick}
      />
    </Drawer>
  );
};

export default MobileSideDrawer;
