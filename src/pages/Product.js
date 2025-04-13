// pages/Product.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import '../assets/styles/Product.css'; // Import file CSS bên ngoài

function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Lấy id sản phẩm từ URL

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
      });
  }, [id]);

  if (!product)
    return <div className="product-detail-loading">Đang tải...</div>;

  // Hàm render các thông tin chi tiết bổ sung của sản phẩm
  const renderProductDetails = () => {
    const excludeKeys = [
      'img',
      'productName',
      'description',
      'price',
      'weight'
    ];
    return Object.entries(product).map(([key, value]) => {
      if (excludeKeys.includes(key) || value === null || value === undefined) {
        return null;
      }
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      let displayValue = value;
      if (typeof value === 'boolean') {
        displayValue = value ? 'Có' : 'Không';
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        displayValue = JSON.stringify(value);
      } else if (Array.isArray(value)) {
        displayValue = value.join(', ');
      }
      return (
        <p key={key} className="product-detail-detail-text">
          <span className="product-detail-detail-label">{formattedKey}: </span>
          {displayValue}
        </p>
      );
    });
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        {product.img && (
          <img
            src={`data:image/jpeg;base64,${btoa(
              new Uint8Array(product.img).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )}`}
            alt={product.productName}
            className="product-detail-image"
          />
        )}
        <h2 className="product-detail-title">{product.productName}</h2>
        <div className="product-detail-info-container">
          <p className="product-detail-info">
            <strong>Mô tả:</strong> {product.description}
          </p>
          <p className="product-detail-info">
            <strong>Giá:</strong> {product.price.toLocaleString('vi-VN')} VND
          </p>
          <p className="product-detail-info">
            <strong>Khối lượng:</strong> {product.weight} kg
          </p>
          {renderProductDetails()}
        </div>
      </div>
    </div>
  );
}

export default Product;
