import React, { useEffect, useState } from 'react';
import { Card, Spin, message } from 'antd';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(res.data);
      } catch (err) {
        message.error('获取用户信息失败');
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <Spin tip="加载中..." />;
  }

  return (
    <Card title="个人主页" style={{ width: 400, margin: '100px auto' }}>
      <p><strong>用户名：</strong> {user.username}</p>
      <p><strong>注册时间：</strong> {user.created_at}</p>
    </Card>
  );
}

export default Profile;


