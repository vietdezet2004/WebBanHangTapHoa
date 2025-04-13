import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const location = useLocation();

  // ✅ Chưa đăng nhập
  if (!token || !userStr || userStr === 'undefined') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // ✅ Nếu là ADMIN → cho vào
    if (user.Role === 'ADMIN') {
      return children;
    }

    // ❌ Nếu KHÔNG phải admin → cảnh báo rồi về trang chủ
    alert('⚠️ Bạn không phải admin!');
    return <Navigate to="/" replace />;
  } catch (err) {
    // Nếu lỗi khi đọc dữ liệu user → yêu cầu đăng nhập lại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
