// src/pages/MyOrders.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../assets/styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my');
      setOrders(response.data);
    } catch (err) {
      console.error('Lỗi khi tải đơn hàng:', err);
      setError('Có lỗi xảy ra khi tải đơn hàng của bạn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="myorders-container">Đang tải đơn hàng của bạn...</div>
    );
  if (error) return <div className="myorders-container error">{error}</div>;

  return (
    <div className="myorders-container">
      <h2>Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="myorders-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Phương thức thanh toán</th>
              <th>Địa chỉ giao hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.totalAmount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.deliveryAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
