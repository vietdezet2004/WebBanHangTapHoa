import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProductById,
  getProductsByCategory
} from '../../services/productService';
import '../../assets/styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Lấy thông tin sản phẩm hiện tại
    getProductById(id)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.error('Lỗi khi lấy sản phẩm:', err));
  }, [id]);

  useEffect(() => {
    // Khi đã có thông tin sản phẩm và có thuộc tính "category"
    if (product && product.category) {
      getProductsByCategory(product.category)
        .then(res => {
          // Loại bỏ sản phẩm hiện tại khỏi danh sách sản phẩm liên quan (nếu cần)
          const related = res.data.filter(
            p => p.productid !== product.productid
          );
          setRelatedProducts(related);
        })
        .catch(err => console.error('Lỗi khi lấy sản phẩm liên quan:', err));
    }
  }, [product]);

  if (!product) {
    return <div className="product-detail-loading">Đang tải...</div>;
  }

  const imageSrc = product.imgUrl ? product.imgUrl : null;

  const handleAddToCart = () => {
    console.log('Thêm sản phẩm vào giỏ hàng:', product.productName);
    // Bổ sung logic xử lý giỏ hàng tại đây
  };

  const handleBuyNow = () => {
    console.log('Mua ngay sản phẩm:', product.productName);
    // Bổ sung logic chuyển sang thanh toán tại đây
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-left">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={product.productName}
              className="product-detail-image"
            />
          )}
        </div>
        <div className="product-detail-right">
          <h2 className="product-detail-title">{product.productName}</h2>
          <p className="product-detail-description">
            Mô tả: {product.description}
          </p>
          <p className="product-detail-price">
            Giá: {product.price.toLocaleString()} VND
          </p>
          <p className="product-detail-weight">
            Khối lượng: {product.weight} kg
          </p>
          <div className="product-detail-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Phần sản phẩm liên quan */}
      <div className="related-products-section">
        <h3 className="related-products-title">Sản phẩm liên quan</h3>
        <div className="related-products-list">
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map(item => (
              <Link
                key={item.productid}
                to={`/products/${item.productid}`}
                className="related-product-item"
              >
                <img
                  src={item.imgUrl}
                  alt={item.productName}
                  className="related-product-image"
                />
                <p className="related-product-name">{item.productName}</p>
                <p className="related-product-price">
                  {item.price.toLocaleString()} VND
                </p>
              </Link>
            ))
          ) : (
            <p className="no-related-text">Không có sản phẩm liên quan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
