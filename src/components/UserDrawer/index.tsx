import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDrawerContent,
  setShowUserDrawer,
  setUserDrawerContent,
} from '../../redux/mainLayout/mainLayout.slice';
import ChangePassword from '../ChangePassword';
import MyProfile from '../MyProfile';
import { IUserDrawer } from './types';

const UserDrawer = (props: IUserDrawer) => {
  const { isOpen } = props;
  const dispatch = useDispatch();
  const userDrawerContent = useSelector(selectUserDrawerContent);

  const onClose = () => {
    dispatch(setShowUserDrawer(false));
    dispatch(setUserDrawerContent(undefined));
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      extra={
        <Button type='primary' onClick={onClose}>
          Close
        </Button>
      }
      closable={false}
      title={
        userDrawerContent
          ? userDrawerContent === 'changePassword'
            ? 'Change Password'
            : 'My Profile'
          : ''
      }
      placement='right'
    >
      {userDrawerContent ? (
        userDrawerContent === 'myProfile' ? (
          <MyProfile />
        ) : (
          <ChangePassword />
        )
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default UserDrawer;
