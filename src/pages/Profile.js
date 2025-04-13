import React, { useEffect, useState } from 'react';
import '../assets/styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả sử rằng thông tin user đã được lưu vào localStorage sau khi đăng nhập
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
      } catch (err) {
        console.error('Lỗi khi parse thông tin user:', err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="profile-container">Đang tải thông tin tài khoản...</div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        Không tìm thấy thông tin tài khoản.
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Thông tin tài khoản</h2>
      <div className="profile-details">
        <p>
          <strong>Tên:</strong> {user.Name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {user.Contact}
        </p>
        <p>
          <strong>Ngày sinh:</strong>{' '}
          {user.date ? new Date(user.date).toLocaleDateString() : 'N/A'}
        </p>
        <p>
          <strong>Vai trò:</strong> {user.Role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
