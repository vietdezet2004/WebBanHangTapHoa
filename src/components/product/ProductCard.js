// src/components/product/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductCard.css';
import { addProductToCart } from '../../services/cartService';

function ProductCard({ product }) {
  const imageSrc = product.imgUrl ? product.imgUrl : null;

  // Hàm xử lý khi bấm nút "Thêm vào giỏ hàng"
  const handleAddToCart = (e) => {
    // Ngăn không cho sự kiện bấm dẫn đến chuyển trang do Link
    e.stopPropagation();
    e.preventDefault();

    const cartHelp = {
      productId: product.productid,  // Lấy product id từ sản phẩm hiện tại
      quantity: 1                    // Số lượng mặc định là 1, có thể cho người dùng tùy chọn sau
    };

    // Gọi API thêm sản phẩm vào giỏ hàng
    addProductToCart(cartHelp)
      .then((res) => {
        alert('✅ Sản phẩm đã được thêm vào giỏ hàng!');
        // Nếu bạn có global state hoặc context để lưu giỏ hàng, có thể cập nhật tại đây
      })
      .catch((err) => {
        console.error('❌ Lỗi khi thêm sản phẩm vào giỏ:', err);
        alert('⚠️ Có lỗi xảy ra, vui lòng thử lại!');
      });
  };

  // Nếu cần, bạn có thể xử lý nút "Mua ngay" riêng
  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Ví dụ: chuyển hướng đến trang chi tiết sản phẩm hoặc thẳng tới trang thanh toán
  };

  return (
    <div className="product-card">
      {/* Bao bọc phần thông tin chính trong Link */}
      <Link to={`/products/${product.productid}`} className="product-card-main">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={product.productName}
            className="product-card-image"
          />
        )}
        <h3 className="product-card-title">{product.productName}</h3>
        <p className="product-card-price">Giá: {product.price.toLocaleString()} VND</p>
      </Link>
      {/* Phần hành động */}
      <div className="product-card-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
        <button className="buy-now-btn" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>
      <Link to={`/products/${product.productid}`} className="product-card-link">
        Xem chi tiết
      </Link>
    </div>
  );
}

export default ProductCard;
