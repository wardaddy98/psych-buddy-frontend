import { Avatar, Button, Card, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '../../commonTypes';
import { useToast } from '../../hooks/useToast';
import { useUpdateUserDetailsMutation } from '../../redux/auth/auth.service';
import { selectAuthUser } from '../../redux/auth/auth.slice';
import { getInitials } from '../../utils/commonUtils';
import styles from './myProfile.module.scss';

const MyProfile = () => {
  const authUser = useSelector(selectAuthUser);
  const [formValues, setFormValues] = useState<Pick<IUser, 'bio'>>({
    bio: authUser?.bio || '',
  });
  const [update, { isLoading }] = useUpdateUserDetailsMutation();
  const { errorToast, successToast } = useToast();

  const handleChange = (e: any) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await update(formValues).unwrap();
      if (res?.status === 200) {
        successToast(res.message);
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };
  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <Avatar gap={1} className={styles.avatar} size={80}>
          {authUser.firstName &&
            authUser.lastName &&
            getInitials(authUser?.firstName, authUser.lastName)}
        </Avatar>

        <span className={styles.name}>
          {authUser?.firstName && authUser?.lastName && authUser?.firstName + authUser?.lastName}
        </span>

        <Form.Item
          label='Bio'
          name='bio'
          style={{ width: '100%', fontWeight: 500, fontSize: '1rem' }}
        >
          <TextArea
            name='bio'
            onChange={handleChange}
            defaultValue={authUser?.bio}
            rows={3}
            style={{ resize: 'none' }}
            placeholder='Write About yourself here'
            value={formValues.bio}
          />
          <div className={styles.update_wrapper}>
            <Button loading={isLoading} onClick={handleUpdate} size='small'>
              Update
            </Button>
          </div>
        </Form.Item>
      </div>
      <div className={styles.details}>
        <div className={styles.info}>
          <span>User Name:</span>
          <span>{authUser?.userName}</span>
        </div>
        <div className={styles.info}>
          <span>Email:</span>
          <span>{authUser?.email}</span>
        </div>
        <div className={styles.info}>
          <span>User Type:</span>
          <span>{authUser?.userType === 'normal' ? 'Normal User' : 'Healthcare Professional'}</span>
        </div>
        <div className={styles.info}>
          <span>Member Since:</span>
          <span>
            {authUser?.createdAt
              ? DateTime.fromMillis(authUser.createdAt).toFormat('dd LLL yyyy')
              : ''}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MyProfile;
