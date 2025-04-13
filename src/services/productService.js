import api from './api';

export function getAllProducts() {
  return api.get('/product/');
}

export function getProductById(productId) {
  return api.get(`/product/${productId}`);
}

export function getFeaturedProducts() {
  return api.get('/product/featured');
}

export function getProductsByCategory(category) {
  return api.get(`/product/category/${category}`);
}
