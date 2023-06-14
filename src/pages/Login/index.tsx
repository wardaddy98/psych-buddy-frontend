import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useLoginMutation } from '../../redux/auth/auth.service';
import styles from './login.module.scss';
import { ILoginFormValues } from './types';

const Login = () => {
  const navigate = useNavigate();
  const { errorToast, successToast } = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: ILoginFormValues) => {
    try {
      const res = await login(values).unwrap();
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
        disabled={isLoading}
        name='login'
        layout='vertical'
        className={styles.form}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
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

export default Login;
