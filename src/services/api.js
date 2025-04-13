// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Interceptor sẽ được gọi trước mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Lấy token mới nhất
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;