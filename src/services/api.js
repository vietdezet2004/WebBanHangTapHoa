import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Interceptor gửi token cho mỗi request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Hàm gọi API lấy danh sách đơn hàng cho admin (endpoint: /admin/orders)
export const getAdminOrders = () => {
  return api.get('/admin/orders');
};

export default api;
