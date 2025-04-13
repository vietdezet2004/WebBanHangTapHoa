// src/services/cartService.js
import api from './api';

// Thêm sản phẩm vào giỏ hàng
export const addProductToCart = (cartHelp) => {
  return api.post('/cart/addproduct', cartHelp);
};

// Lấy giỏ hàng của người dùng (backend dùng Principal nên tham số userid không được quan trọng)
export const getCartByUser = () => {
  return api.get('/cart/0');
};

// Xóa sản phẩm khỏi giỏ hàng theo product id
export const removeItemFromCart = (productId) => {
  return api.delete(`/cart/product/${productId}`);
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartQuantity = (productId, quantity) => {
  // Sử dụng PUT với query parameters
  return api.put('/cart/updatequantity', null, {
    params: { productId, quantity }
  });
};
