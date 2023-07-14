import React from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@store/authSlice';
import { setSignUpOpen } from '@store/formOpenSlice';

import { signUpAsync } from '@store/authSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const { Option } = Select;

const SignUp: React.FC = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const thunkDispatch: ThunkDispatch<any, undefined, AnyAction> = useDispatch();

  const onFinish = async (values: any) => {
    thunkDispatch(signUpAsync(values));
    console.log('Success:', values);
    // await axios
    //   .post('/api/auth/signup', values)
    //   .then((res) => {
    //     if (res.status === 201) {
    //       localStorage.setItem('access_token', res.data.payload.access_token);
    //       localStorage.setItem('refresh_token', res.data.payload.refresh_token);
    //       dispatch(setAuthState(true));
    //       dispatch(setSignUpOpen(false));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      style={{ width: 600, maxWidth: 600, backgroundColor: '#f4f5f8', padding: '3em 0.5em 2em 0.5em', borderRadius: '1em', position: 'absolute', left: '50%', transform: 'translate(-44%, 0%)', justifyContent: 'center' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: 'email', required: true }]}
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

      <Form.Item
        label="FistName"
        name="firstName"
        rules={[{ type: 'string', required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="LastName"
        name="lastName"
        rules={[{ type: 'string', required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select
          placeholder="Select a role"
          allowClear
        >
          <Option value="REQUESTER">Requester</Option>
          <Option value="APPROVER">Approver</Option>
          <Option value="PURCHASER">Purchaser</Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
      >
        {({ getFieldValue }) =>
          getFieldValue('role') == 'APPROVER' ? (
            <Form.Item name="spendinglimit" label="Spending Limit" rules={[{ required: true }]}>
              <Select
                placeholder="Select a role"
                allowClear
              >
                <Option value='LEVEL1'>50,000</Option>
                <Option value='LEVEL2'>200,000</Option>
                <Option value='LEVEL3'>{`> 200,000`}</Option>
              </Select>
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="btn-op-primary"
          type="primary"
          htmlType="submit"
          //onClick={() => dispatch(setAuthState(true))}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default SignUp;