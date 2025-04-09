import React, { useState } from 'react';
import { Button, Form, Input, message, Tabs } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/register', values);
      message.success(res.data.msg);
    } catch (err) {
      message.error(err.response?.data?.msg || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/login', values);
      message.success('登录成功');
      localStorage.setItem('token', res.data.access_token);
      navigate('/profile');
    } catch (err) {
      message.error(err.response?.data?.msg || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 400 }}>
        <Tabs defaultActiveKey="login">
          <TabPane tab="登录" key="login">
            <Form onFinish={handleLogin}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="注册" key="register">
            <Form onFinish={handleRegister}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;




