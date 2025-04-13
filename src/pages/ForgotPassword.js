import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/ForgotPassword.css'; // Tùy chỉnh CSS nếu cần

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async e => {
    e.preventDefault();
    try {
      // Gọi API forgot-password, đảm bảo URL phù hợp với backend của bạn
      const response = await axios.post(
        'http://localhost:8000/auth/forgot-password',
        { email }
      );
      setMessage(response.data);
    } catch (error) {
      console.error('Lỗi gửi yêu cầu:', error);
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      {message && <p className="forgot-password-message">{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Gửi mật khẩu mới</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
