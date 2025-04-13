// src/services/paymentService.js
import api from './api';

export const createPayment = amount => {
  return api.get(`/payment/${amount}`);
};
