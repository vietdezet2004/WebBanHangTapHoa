import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../assets/styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Nếu bị chuyển hướng từ PrivateRoute thì trở về trang gốc
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/signin', {
        email,
        password
      });

      console.log('✅ Phản hồi đăng nhập:', response.data);

      // Tùy backend, bạn đổi tên biến tương ứng (jwt / token)
      const { jwt, email: userEmail, name, role } = response.data;

      if (!jwt || !userEmail) {
        setMessage('Phản hồi từ server không hợp lệ!');
        return;
      }

      const user = {
        Email: userEmail,
        Name: name || userEmail,
        Role: role || 'USER'
      };

      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('Đăng nhập thành công!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('❌ Lỗi đăng nhập:', error);
      setMessage('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      {message && <p className="login-message">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Nhập email của bạn"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            placeholder="Nhập mật khẩu của bạn"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <div className="links">
        {/* Link chuyển hướng đến trang quên mật khẩu */}
        <p className="forgot-password-link">
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </p>
        <p className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
