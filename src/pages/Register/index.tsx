import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useRegisterMutation } from '../../redux/auth/auth.service';
import styles from './register.module.scss';
import { IRegisterValues } from './types';

const Register = () => {
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values: IRegisterValues) => {
    try {
      const { confirmPassword, password } = values;
      if (password !== confirmPassword) return;
      delete values.confirmPassword;

      const res = await register(values).unwrap();
      if (res.status === 200) {
        navigate('/lobby');
        successToast(res.message);
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name='register'
        layout='vertical'
        className={styles.form}
        onFinish={handleSubmit}
        autoComplete='off'
        disabled={isLoading}
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='User Name'
          name='userName'
          rules={[{ required: true, message: 'Please input your user name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='User Type'
          name='userType'
          rules={[{ required: true, message: 'Please select your user type!' }]}
        >
          <Select
            options={[
              { value: 'normal', label: 'Normal User' },
              { value: 'professional', label: 'Professional' },
            ]}
          />
        </Form.Item>

        <Form.Item label='Bio' name='bio'>
          <TextArea rows={3} style={{ resize: 'none' }} placeholder='Write About yourself here' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className={styles.submit_wrapper}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
