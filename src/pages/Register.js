// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // Tạo đối tượng người dùng, với role mặc định là "USER"
    const userData = {
      name: name,
      email: email,
      password: password,
      contact: contact,
      role: 'USER'
    };

    try {
      await axios.post('http://localhost:8000/auth/signup', userData);
      setMessage('Đăng ký thành công! Vui lòng đăng nhập.');
      // Chuyển hướng sau vài giây về trang đăng nhập
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ backend:', error.response.data);
        setMessage(
          `Đăng ký thất bại: ${
            error.response.data.message || 'Đã có lỗi xảy ra'
          }`
        );
      } else {
        console.error('Lỗi không xác định:', error);
        setMessage('Đăng ký thất bại! Không thể kết nối đến máy chủ.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      {message && <p className="register-message">{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={contact}
            onChange={e => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
