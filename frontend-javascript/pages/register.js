import { Form, Input, InputNumber, Button } from 'antd';
import {useRouter} from 'next/router';
import useUser from '../lib/useUser';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

export default function RegisterPage(){

  useUser({ redirectTo: '/myFiles',redirectIfFound= true })
  const router = useRouter();
  const handleSubmit = async (values) => {
    const {name,email, password} =values.user;

    const url = 'http://localhost:3000/register'

    const requestBody={
      email: email,
      password: password,
      name: name,
    };

    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
    });

    const data = await response.json();
    console.log(data);

    await router.push('/login');
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[{type: 'email',}, ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name={['user', 'password']}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};



