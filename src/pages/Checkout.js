import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createPayment } from '../services/paymentService';
import '../assets/styles/Checkout.css';
import qrImage from '../assets/images/qr_code.png';

function Checkout() {
  const location = useLocation();
  const { totalAmount } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QR_PAYMENT"); // Mặc định là thanh toán online

  useEffect(() => {
    if (totalAmount) {
      // Gọi API tạo đơn thanh toán, truyền paymentMethod
      createPayment(totalAmount, paymentMethod)
        .then(res => {
          setPaymentDetails(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('❌ Lỗi khi tạo đơn thanh toán:', err);
          setError('Có lỗi xảy ra khi tạo đơn thanh toán.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [totalAmount, paymentMethod]);

  const handleFileChange = e => {
    setUploadFile(e.target.files[0]);
  };

  const handleSubmitProof = async () => {
    // Nếu người dùng chọn thanh toán online thì bắt buộc phải upload ảnh
    if (paymentMethod === "QR_PAYMENT" && !uploadFile) {
      setError('Vui lòng chọn ảnh làm bằng chứng thanh toán.');
      return;
    }
    if (!deliveryAddress || deliveryAddress.trim() === "") {
      setError('Vui lòng nhập địa chỉ giao hàng.');
      return;
    }

    const formData = new FormData();
    formData.append('orderId', paymentDetails.orderId);
    formData.append('deliveryAddress', deliveryAddress);
    // Nếu phương thức online, mới gửi file
    if (paymentMethod === "QR_PAYMENT") {
      formData.append('proofImage', uploadFile);
    }
    try {
      const response = await fetch('http://localhost:8000/payment/proof', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (response.ok) {
        alert('Đã nộp thông tin thanh toán thành công, hãy chờ admin xác nhận.');
      } else {
        setError('Không thể nộp thông tin thanh toán, vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Lỗi khi nộp thông tin thanh toán:', err);
      setError('Có lỗi xảy ra khi nộp thông tin thanh toán.');
    }
  };

  if (loading) {
    return <div className="checkout-container">Đang xử lý...</div>;
  }
  if (!totalAmount) {
    return <div className="checkout-container">Không có thông tin thanh toán.</div>;
  }
  return (
    <div className="checkout-container">
      <h2>🔐 Thanh toán đơn hàng</h2>
      <p><strong>Tổng tiền:</strong> {totalAmount.toLocaleString()} VND</p>
      
      <div className="payment-method">
        <label>
          <input
            type="radio"
            value="QR_PAYMENT"
            checked={paymentMethod === "QR_PAYMENT"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Thanh toán Online
        </label>
        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Thanh toán khi nhận hàng (COD)
        </label>
      </div>

      <div className="delivery-address">
        <p><strong>Địa chỉ giao hàng:</strong></p>
        <input
          type="text"
          placeholder="Nhập địa chỉ giao hàng"
          value={deliveryAddress}
          onChange={e => setDeliveryAddress(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}
      
      {paymentDetails ? (
        <div className="payment-result">
          <p><strong>Mã đơn hàng:</strong> {paymentDetails.orderId || 'Không có'}</p>
          {paymentMethod === "QR_PAYMENT" ? (
            <div>
              <p><strong>Mã QR thanh toán:</strong></p>
              <img src={qrImage} alt="QR Code" style={{ maxWidth: '200px' }} />
              <div className="proof-upload">
                <p><strong>Nộp ảnh chứng từ thanh toán:</strong></p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
          ) : (
            <p>Đã chọn thanh toán khi nhận hàng (COD).</p>
          )}
          <button onClick={handleSubmitProof}>Gửi thông tin thanh toán</button>
        </div>
      ) : (
        <p>Không tìm thấy thông tin thanh toán.</p>
      )}
    </div>
  );
}

export default Checkout;
