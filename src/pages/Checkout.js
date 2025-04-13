// src/pages/Checkout.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createPayment } from '../services/paymentService';
import '../assets/styles/Checkout.css';

function Checkout() {
  const location = useLocation();
  const { totalAmount } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (totalAmount) {
      createPayment(totalAmount)
        .then(res => setPaymentDetails(res.data))
        .catch(err => {
          console.error('❌ Lỗi khi thanh toán:', err);
          setError('Có lỗi xảy ra khi tạo đơn thanh toán.');
        });
    }
  }, [totalAmount]);

  if (!totalAmount) {
    return <div className="checkout-container">Không có thông tin thanh toán.</div>;
  }

  return (
    <div className="checkout-container">
      <h2>🔐 Thanh toán đơn hàng</h2>

      <p><strong>Tổng tiền:</strong> {totalAmount.toLocaleString()} VND</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {paymentDetails ? (
        <div className="payment-result">
          <p><strong>Mã đơn hàng:</strong> {paymentDetails.orderId || 'Không có'}</p>
          <p><strong>Trạng thái:</strong> Thành công</p>
          {/* Tuỳ bạn muốn redirect hoặc reset giỏ hàng tại đây */}
        </div>
      ) : (
        <p>Đang xử lý thanh toán...</p>
      )}
    </div>
  );
}

export default Checkout;
