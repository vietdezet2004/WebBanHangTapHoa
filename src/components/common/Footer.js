import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
// Nếu bạn đang sử dụng Font Awesome, hãy import như sau:
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section" style={{ '--animation-order': 1 }}>
          <h3>Về Organica</h3>
          <div className="about-content">
            <p>
              Chúng tôi cung cấp các sản phẩm hữu cơ chất lượng cao, thân thiện
              với môi trường và tốt cho sức khỏe.
            </p>
            <div className="social-links">
              {/* Thay thế URL giả bằng URL thực khi có */}
              <a
                href="https://facebook.com/organica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com/organica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com/organica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://youtube.com/organica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section" style={{ '--animation-order': 2 }}>
          <h3>Liên kết nhanh</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/about">Về chúng tôi</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/privacy">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section" style={{ '--animation-order': 3 }}>
          <h3>Liên hệ</h3>
          <div className="contact-info">
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Đường Xanh, TP.HCM
            </p>
            <p>
              <i className="fas fa-phone"></i> (028) 1234 5678
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@organica.com
            </p>
          </div>
        </div>

        <div className="footer-section" style={{ '--animation-order': 4 }}>
          <h3>Đăng ký nhận tin</h3>
          <p>Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email của bạn" />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Organica. Tất cả các quyền được bảo
          lưu.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
