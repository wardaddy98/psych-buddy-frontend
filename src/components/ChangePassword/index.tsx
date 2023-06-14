import { Button, Form, Input } from 'antd';
import { useToast } from '../../hooks/useToast';
import { useChangePasswordMutation } from '../../redux/auth/auth.service';
import styles from './changePassword.module.scss';
import { IChangePasswordFormValues } from './types';

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { errorToast, successToast } = useToast();

  const handleSubmit = async (values: IChangePasswordFormValues) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        errorToast('New and Confirm passwords do not match');
        return;
      }

      delete values.confirmPassword;
      const result = await changePassword(values).unwrap();
      if (result?.status === 200) {
        successToast(result?.message);
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };
  return (
    <Form
      className={styles.wrapper}
      disabled={false}
      name='changePassword'
      layout='vertical'
      onFinish={handleSubmit}
      autoComplete='off'
    >
      <Form.Item
        name='oldPassword'
        label='Old Password'
        rules={[{ required: true, message: 'Please input your old password!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='newPassword'
        label='New Password'
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        label='Confirm Password'
        rules={[{ required: true, message: 'Please input your confirm password!' }]}
      >
        <Input type='' />
      </Form.Item>

      <Form.Item className={styles.submit_wrapper}>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
