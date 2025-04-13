import React, { useEffect, useState } from 'react';
import api, { getAdminOrders } from '../services/api';
import '../assets/styles/AdminOrderList.css';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      // Gọi endpoint /admin/orders để lấy danh sách đơn hàng
      const response = await getAdminOrders();
      setOrders(response.data);
    } catch (err) {
      console.error('Lỗi tải danh sách đơn hàng:', err);
      setError('Lỗi tải danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      // Giả sử BE định nghĩa endpoint PUT để cập nhật trạng thái đơn hàng ở /orders/update-status/{orderId}
      // Nếu BE có endpoint khác, hãy thay đổi URL cho phù hợp.
      await api.put(`/orders/update-status/${orderId}?status=${encodeURIComponent(status)}`);
      // Làm mới danh sách sau khi cập nhật
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Cập nhật trạng thái đơn hàng thất bại!');
    }
  };

  if (loading) return <div className="loader">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-order-list">
      <h2>Danh sách đơn hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>ID khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Địa chỉ giao hàng</th>
            <th>Chứng từ thanh toán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.totalAmount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  {order.proofImageUrl ? (
                    <img
                      src={order.proofImageUrl}
                      alt="Chứng từ thanh toán"
                      style={{ width: '100px' }}
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <button onClick={() => updateOrderStatus(order.orderId, 'Đang giao')}>
                    Duyệt đơn hàng
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
