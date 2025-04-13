// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Các trang chung
import Home from './pages/Home';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminProductList from './pages/AdminProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Trang sản phẩm
import ProductPage from './pages/ProductPage';
import ProductDetail from './components/product/ProductDetail';

// Trang giỏ hàng & thanh toán (THÊM MỚI)
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Layout và PrivateRoute
import MainLayout from './layout/MainLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Danh sách sản phẩm */}
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />

        {/* Chi tiết sản phẩm */}
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />

        {/* Login, Register, Quên mật khẩu */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Trang giỏ hàng */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        {/* Trang thanh toán */}
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        {/* Admin - Thêm sản phẩm */}
        <Route
          path="/admin/add-product"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <MainLayout>
                <AdminAddProduct />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Admin - Danh sách sản phẩm */}
        <Route
          path="/admin/products"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <MainLayout>
                <AdminProductList />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Admin - Sửa sản phẩm */}
        <Route
          path="/admin/edit-product/:id"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <MainLayout>
                <AdminEditProduct />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
