import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';

function Header() {
  const [userName, setUserName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined') {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.Name || user.Email || 'User');
      } catch (err) {
        console.error('❌ Lỗi khi parse user từ localStorage:', err);
      }
    }

    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/products?query=${encodeURIComponent(trimmedQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" />
          <span>PQV STORE</span>
        </Link>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Tìm</button>
      </div>

      <div className="header-links">
        <Link to="/" className="header-button">
          Trang chủ
        </Link>
        <Link to="/products" className="header-button">
          Sản phẩm
        </Link>
        <Link to="/cart" className="header-button">
          Giỏ hàng
        </Link>
        {userName ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <button
              className="header-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              👋 {userName} ▾
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="header-button">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
