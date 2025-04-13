// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { getCartByUser, removeItemFromCart, updateCartQuantity } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lấy giỏ hàng khi component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    getCartByUser()
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải giỏ hàng:', err);
        setLoading(false);
      });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (productId) => {
    removeItemFromCart(productId)
      .then(() => fetchCart())
      .catch(err => console.error('Lỗi khi xóa sản phẩm:', err));
  };

  // Cập nhật số lượng sản phẩm
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho số lượng < 1
    updateCartQuantity(productId, newQuantity)
      .then(res => {
        // Cập nhật lại giỏ hàng từ response mới
        setCart(res.data);
      })
      .catch(err => {
        console.error('Lỗi khi cập nhật số lượng:', err);
        alert('Có lỗi xảy ra khi cập nhật số lượng.');
      });
  };

  // Chuyển sang trang thanh toán, truyền tổng tiền qua state
  const handleCheckout = () => {
    navigate('/checkout', { state: { totalAmount: cart.totalAmount } });
  };

  if (loading) return <div>Đang tải giỏ hàng...</div>;
  if (!cart || cart.cartDetalis.length === 0) {
    return <div className="cart-container">🛒 Giỏ hàng của bạn đang trống.</div>;
  }

  return (
    <div className="cart-container">
      <h2>🛒 Giỏ hàng của bạn</h2>
      <ul>
        {cart.cartDetalis.map((item) => (
          <li key={item.cartDetalisId} className="cart-item">
            <div className="item-info">
              <strong>{item.products.productName}</strong>
              <p>Giá: {item.products.price.toLocaleString()} VND</p>
            </div>
            <div className="item-quantity">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.products.productid, item.quantity - 1)}
              >
                -
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.products.productid, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="item-amount">
              <p>{item.amount.toLocaleString()} VND</p>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item.products.productid)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <h3>Tổng tiền: {cart.totalAmount.toLocaleString()} VND</h3>
      <button className="checkout-btn" onClick={handleCheckout}>
        Thanh toán
      </button>
    </div>
  );
}

export default Cart;
