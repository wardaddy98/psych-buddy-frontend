import { Avatar, Button, MenuProps } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { selectAuthUser, selectIsAuthenticated } from '../../redux/auth/auth.slice';
import { useGetCategoriesQuery } from '../../redux/common/common.service';
import {
  selectSelectedNavigationMenu,
  selectShowMobileSIdeDrawer,
  selectShowUserDrawer,
  setSelectedNavigationMenu,
  setShowMobileSideDrawer,
  setShowUserDrawer,
  setUserDrawerContent,
} from '../../redux/mainLayout/mainLayout.slice';
import { NavigationMenuOptions } from '../../redux/mainLayout/types';
import { getInitials, localStorageUtil } from '../../utils/commonUtils';
import DropDownMenu from '../DropdownMenu';
import Footer from '../Footer';
import MobileSideDrawer from '../MobileSIdeDrawer';
import Sidebar from '../SIdebar';
import UserDrawer from '../UserDrawer';
import styles from './mainLayout.module.scss';
import { IMainLayout } from './types';

const MainLayout = (props: IMainLayout) => {
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const showMobileSideDrawer = useSelector(selectShowMobileSIdeDrawer);
  const selectedNavigationMenu = useSelector(selectSelectedNavigationMenu);
  const showUserDrawer = useSelector(selectShowUserDrawer);
  useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true, skip: !isAuthenticated });

  const navigationMenuOptionsArr = ['lobby', 'myThreads', 'explore', 'savedThreads'];

  useEffect(() => {
    //To close mobilesidedrawer if screen width changes to web
    if (!isMobile && showMobileSideDrawer) {
      dispatch(setShowMobileSideDrawer(false));
    }

    //To close userDrawer if screen width changes to mobile
    if (isMobile && showUserDrawer) {
      dispatch(setShowUserDrawer(false));
    }
  }, [isMobile]);

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];

    if (navigationMenuOptionsArr?.includes(path)) {
      dispatch(setSelectedNavigationMenu(path as NavigationMenuOptions));
    } else {
      dispatch(setSelectedNavigationMenu(undefined));
    }
  }, [window.location.pathname]);

  const logout = async () => {
    localStorageUtil.removeItem('auth');
    dispatch({ type: 'RESET_STORE' });
  };

  const handleMyProfileClick = () => {
    dispatch(setUserDrawerContent('myProfile'));
    dispatch(setShowUserDrawer(true));
  };

  const handleChangePasswordClick = () => {
    dispatch(setUserDrawerContent('changePassword'));
    dispatch(setShowUserDrawer(true));
  };

  const handleNavigationMenuClick = (data: any) => {
    if (selectedNavigationMenu === data.key) return;

    dispatch(setSelectedNavigationMenu(data.key));
    navigate(`/${data.key}`);
  };

  const handleLogoClick = () => {
    dispatch(setSelectedNavigationMenu('lobby'));
    navigate('/');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <i style={{ color: 'red' }} className='ri-logout-box-line'></i>,
      label: <span>Logout</span>,
      onClick: logout,
    },
    {
      key: '2',
      icon: <i className='ri-profile-line'></i>,
      label: <span>My Profile</span>,
      onClick: handleMyProfileClick,
    },
    {
      key: '3',
      icon: <i className='ri-lock-line'></i>,
      label: <span>Change Password</span>,
      onClick: handleChangePasswordClick,
    },
  ];

  const navigationMenuItems: MenuProps['items'] = [
    {
      key: 'lobby',
      icon: <i className='ri-home-line'></i>,
      label: <span>Home</span>,
    },

    {
      key: 'explore',
      icon: <i className='ri-apps-line'></i>,
      label: <span>Explore</span>,
    },

    {
      key: 'myThreads',
      icon: <i className='ri-question-answer-fill'></i>,
      label: <span>My Threads</span>,
    },
    {
      key: 'savedThreads',
      icon: <i className='ri-save-line'></i>,
      label: <span>Saved Threads</span>,
    },
  ];

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.menu_wrapper}>
            {isMobile && (
              <Button
                type='ghost'
                icon={<i className='ri-menu-line'></i>}
                onClick={() => dispatch(setShowMobileSideDrawer(true))}
              />
            )}
          </div>

          <span className={styles.heading} onClick={handleLogoClick}>
            Psych-Buddy
          </span>

          <div className={styles.action_wrapper}>
            {isAuthenticated && (
              <DropDownMenu menuItems={userMenuItems}>
                <Avatar className={styles.avatar} size='large' gap={1}>
                  {authUser?.firstName &&
                    authUser?.lastName &&
                    getInitials(authUser?.firstName, authUser.lastName)}
                </Avatar>
              </DropDownMenu>
            )}
            {!isAuthenticated && !isMobile && (
              <div className={styles.log_actions}>
                {!window.location.pathname.includes('login') && (
                  <Button size='large' type='primary' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                )}

                {!window.location.pathname.includes('register') && (
                  <Button size='large' type='default' onClick={() => navigate('/register')}>
                    Register
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {isMobile || !isAuthenticated ? (
          <>
            <div className={styles.body}>{props.children}</div>
            <Footer />
          </>
        ) : (
          <div className={styles.split_body}>
            <Sidebar
              navigationMenuItems={navigationMenuItems}
              handleNavigationMenuClick={handleNavigationMenuClick}
            />

            <div className={styles.content_wrapper}>
              <div className={styles.content}>{props.children} </div>
              <Footer />
            </div>
          </div>
        )}
      </div>
      {showMobileSideDrawer && (
        <MobileSideDrawer
          isOpen={showMobileSideDrawer}
          navigationMenuItems={navigationMenuItems}
          handleNavigationMenuClick={handleNavigationMenuClick}
        />
      )}

      {showUserDrawer && <UserDrawer isOpen={showUserDrawer} />}
    </>
  );
};

export default MainLayout;
