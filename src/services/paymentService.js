// src/services/paymentService.js
import api from './api';

/**
 * Tạo đơn thanh toán qua endpoint /payment/{amount}.
 * BE sẽ sử dụng token gửi kèm để lấy thông tin người dùng.
 *
 * @param {number} amount - Số tiền cần thanh toán.
 * @returns {Promise} - Promise chứa đối tượng PaymentDetails trả về từ BE.
 */
/**
 * Tạo đơn thanh toán với phương thức được chọn:
 *  - paymentMethod = "QR_PAYMENT" cho thanh toán online.
 *  - paymentMethod = "COD" cho thanh toán khi nhận hàng.
 */
export const createPayment = (amount, paymentMethod) => {
  return api.get(`/payment/${amount}?method=${paymentMethod}`);
}; // src/services/paymentService.js
