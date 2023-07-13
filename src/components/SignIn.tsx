import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@store/authSlice';
import { signInAsync } from '@store/authSlice';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const SignIn: React.FC = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const thunkDispatch: ThunkDispatch<any, undefined, AnyAction> = useDispatch();
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values: any) => {
    const email: string = values.email;
    const password: string = values.password;
    thunkDispatch(signInAsync({email, password}));
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ width: 600, maxWidth: 600, backgroundColor: '#f4f5f8', padding: '3em 3em 2em 3em', borderRadius: '1em', position: 'absolute', left: '50%', transform: 'translate(-44%, 0%)', justifyContent: 'center' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: 'email', required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="btn-op-primary"
          type="primary"
          htmlType="submit"
          >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default SignIn;